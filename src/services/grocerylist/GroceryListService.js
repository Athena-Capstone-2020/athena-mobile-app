import { BaseService } from "../base";
import { logError } from "../../logger/Logger";
import { GroceryList, FoodItem, Container } from "../../models";

export class GroceryListService extends BaseService{

    GROCERY_LIST_COLLECTION = 'GROCERY_LIST_COLLECTION'

    /**
     * Creates a new grocery list and returns the grocery list object with an id
     * @param {string} name name of the grocery list
     * @param {string} ownerId the household/person the container belongs to
     * @returns {GroceryList} the groceryList object that was created
     * @throws error if grocery list was not able to be made in DB
     */
    async createGroceryList(name, ownerId = null){
        try{
            this.__UseCollection(this.GROCERY_LIST_COLLECTION)
            const groceryList = new GroceryList(name, ownerId)

            const newDocId = await this.__CreateEntity( groceryList.toDocument() )
            groceryList.id = newDocId
            return groceryList
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Gets a grocery list that has been created. If the grocery list does not exist, a null will be returned
     * @param {string} id id of the grocery list trying to be retrieved
     * @returns {GroceryList} a grocery list object or null if not found
     * @throws error if id is null 
     */
    async getGroceryListById(id){
        try{
            this.__UseCollection(this.GROCERY_LIST_COLLECTION)
            if(id == null)
                throw new Error("id cannot be null")

            const groceryListDoc = await this.__GetById(id)

            if(groceryListDoc == undefined)
                return null

            const groceryList = new GroceryList(groceryListDoc.name, groceryListDoc.ownerId, groceryListDoc.foodItems, new Date(groceryListDoc.dateCreated), new Date(groceryListDoc.lastModified))
            groceryList.id = id

            return groceryList
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Attempts to delete a grocery list by using its object id
     * @param {GroceryList} groceryList the grocery list to be deleted
     * @returns {GroceryList} the grocery list obj that was deleted, or null if the grocery list was not found in the DB
     * @throws error if grocery list id is null 
     */
    async deleteGroceryListByObject(groceryList){
        try{
            this.__UseCollection(this.GROCERY_LIST_COLLECTION)

            const groceryListId = groceryList.id
            if( groceryListId == null )
                throw new Error('the grocery list does not have an id')

            return await this.deleteGroceryListById(groceryListId)
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Attemps to delete a grocery list by its id
     * @param {string} id the id of the grocery list to be deleted
     * @returns {GroceryList} the container obj that was deleted, or null if the container was not found
     */
    async deleteGroceryListById(id){
        try{
            this.__UseCollection(this.GROCERY_LIST_COLLECTION)

            const groceryListToDelete = await this.getGroceryListById(id)
            if( groceryListToDelete == null )
                return null
            
            await this.__DeleteEntityById(id)
            return groceryListToDelete
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Updates a grocery list object in the DB
     * @param {GroceryList} updatedGroceryList the updated grocery list obj
     * @returns {GroceryList} the updated grocery list object if successful
     * @throws error if grocery list id is null or grocery list is not in the DB
     */
    async updateGroceryList(updatedGroceryList){
        try{
            this.__UseCollection(this.GROCERY_LIST_COLLECTION)

            const groceryListId = updatedGroceryList.id
            if( groceryListId == null )
                throw new Error('the grocery list does not have an id')

            const oldGroceryList = await this.getGroceryListById(groceryListId)
            if(oldGroceryList == null)
                throw new Error('the grocery list is not in the database')

            updatedGroceryList.lastModified = new Date()
            await this.__UpdateById(groceryListId, updatedGroceryList.toDocument())
            return updatedGroceryList
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Adds a food item to grocery list
     * @param {GroceryList} groceryList the grocery list the item is being added to
     * @param {FoodItem} item the food item being added to the grocery list
     * @returns {GroceryList} updated grocery list if successful, otherwise null
     * @throws error if item is not FoodItem or if container is not in the DB
     */
    async addFoodItemToGroceryList(groceryList, item){
        try{
            this.__UseCollection(this.GROCERY_LIST_COLLECTION)

            if( !(item instanceof FoodItem) )
                throw new Error('item is not of type FoodItem')

            const groceryListToAddTo = await this.getGroceryListById(groceryList.id)
            if(groceryListToAddTo == null)
                throw new Error('the grocery list is not in the database')

            groceryList.foodItems.push(item.toDocument())
            return await this.updateGroceryList(groceryList)
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Updates an item in the grocery list at the specified index
     * @param {GroceryList} groceryList the grocery list the item is being updated in
     * @param {Number} index the location where the food item is located
     * @param {FoodItem} updatedItem the updated food item
     * @returns {GroceryList} updated grocery list if successful
     * @throws error if the item is not a food item, if the grocery list is not in the DB, or the index is out of bounds
     */
    async updateFoodItemInGroceryList(groceryList, index, updatedItem){
        try{
            this.__UseCollection(this.GROCERY_LIST_COLLECTION)

            if( !(updatedItem instanceof FoodItem) )
                throw new Error('updatedItem is not of type FoodItem')

            const groceryListToAddTo = await this.getGroceryListById(groceryList.id)
            if(groceryListToAddTo == null)
                throw new Error('the grocery list is not in the database')

            if(index < 0 || groceryList.foodItems.length <= index)
                throw new Error('the index is out of bounds')

            groceryList.foodItems.splice(index, 1, updatedItem.toDocument())
            return await this.updateGroceryList(groceryList)

        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Remove an item at the index in the specified grocery list
     * @param {GroceryList} groceryList the grocery list a food item is being removed from
     * @param {Number} index the index at which the food item is located
     * @returns {GroceryList} updated container if successful
     * @throws error if the grocery list is not in the DB or he index is out of bounds 
     */
    async removeFoodItemFromContainer(groceryList, index){
        try{
            this.__UseCollection(this.GROCERY_LIST_COLLECTION)

            const groceryListToRemoveFrom = await this.getGroceryListById(groceryList.id)
            if(groceryListToRemoveFrom == null)
                throw new Error('the grocery list is not in the database')

            if( index < 0 || groceryList.foodItems.length <= index)
                throw new Error('the index is out of bounds')

            groceryList.foodItems.splice(index, 1)
            return await this.updateGroceryList(groceryList)
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Gets all the food items from a grocery list
     * @param {string} id the id of the grocery list to get the food items from
     * @returns {FoodItem[]} an array of FoodItems that are currently in the grocery list
     */
    async getFoodItemArrayFromGroceryList(id){
        try{
            this.__UseCollection(this.GROCERY_LIST_COLLECTION)

            const groceryList = await this.getGroceryListById(id)
            if( groceryList == null)
                throw new Error('the grocery list is not in the database')

            const foodItemAry = [];

            groceryList.foodItems.forEach(obj => {
                const item = new FoodItem(obj.name, obj.photoURI, obj.quantity, obj.description, new Date(obj.expireDate), obj.nutritionData)
                foodItemAry.push(item)
            })            

            return foodItemAry
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Finds and returns a list of food items who name
     *      matches the search
     * @param {string} id the id of the grocery list being searched
     * @param {string} itemName the name of the item being search for
     * @returns a list of food items 
     */
    async searchItemInGroceryList(id, itemName){
        try{
            this.__UseCollection(this.GROCERY_LIST_COLLECTION)
            const foodItemAry = await this.getFoodItemArrayFromGroceryList(id)

            const regexString = "".concat('.*(',itemName.toLowerCase(), ').*')
            let regex = RegExp(regexString)

            const result = []
            foodItemAry.forEach(foodItem => {
                if(regex.test(foodItem.name.toLowerCase()))
                    result.push(foodItem)
            })
            return result
        }
        catch(err){
            logError(err)
            throw err
        }
    }

}