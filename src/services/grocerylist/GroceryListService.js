import { BaseService } from "../base";
import { logError } from "../../logger/Logger";
import { GroceryList } from "../../models/GroceryList";

export class GroceryListService extends BaseService{

    GROCERY_LIST_COLLECTION = 'GROCERY_LIST_COLLECTION'

    /**
     * Creates a new grocery list and returns the grocery list object with an id
     * @param {string} name name of the grocery list
     * @param {string} ownerId the household/person the container belongs to
     * @returns the groceryList object that was created
     * @throws error if grocery list was not able to be made in DB
     */
    async createGroceryList(name, ownerId){
        try{
            this.__UseCollection(this.GROCERY_LIST_COLLECTION)
            const groceryList = new GroceryList(name, ownerId, [])

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
     * @returns a grocery list object or null if not found
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

            const groceryList = new GroceryList(groceryListDoc.name, groceryListDoc.ownerId, groceryListDoc.foodItems)
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
     * @returns the grocery list obj that was deleted, or null if the grocery list was not found in the DB
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
     * @returns the container obj that was deleted, or null if the container was not found
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
     * Adds a food item to grocery list
     * @param {FoodItem} item
     * @param {string} amount
     */
    addItem(item, amount){
        throw new Error('Not Implemented')
    }

    /**
     * Updates an item in the grocery list if it exists
     * @param {FoodItem} item 
     * @param {string} amount 
     */
    updateItem(item, amount){
        throw new Error('Not Implemented')
    }

    /**
     * Remove an item from the grocery list if it exists
     * @param {FoodItem} item 
     */
    removeItem(item){
        throw new Error('Not Implemented')
    }

    /**
     * Gets an item from the grocery list if it exists
     * @param {FoodItem} item 
     * @returns a food item if found, otherwise null
     */
    getItem(item){
        throw new Error('Not Implemented')
    }

    /**
     * Finds and returns a list of food items who name
     *      matches the search
     * @param {String} itemName
     * @returns a list of food items 
     */
    searchItem(itemName){
        throw new Error('Not Implemented')
    }

}