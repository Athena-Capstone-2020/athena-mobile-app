import { BaseService } from "../base";
import { logError } from "../../logger/Logger";
import { GroceryList } from "../../models/GroceryList";

export class GroceryListService extends BaseService{

    GROCERY_LIST_COLLECTION = 'GROCERY_LIST_COLLECTION'

    /**
     * Creates a new grocery list
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
     * Deletes a specified grocery list
     * @param {string} id 
     */
    deleteGroceryListById(id){
        throw new Error('Not Implemented')
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