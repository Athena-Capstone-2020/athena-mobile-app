import { BaseService } from "../base";

export class GroceryListService extends BaseService{

    /**
     * Creates a new grocery list
     * @param {string} name 
     * @param {string} ownerId 
     */
    createGroceryList(name, ownerId){
        throw new Error('Not Implemented')
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