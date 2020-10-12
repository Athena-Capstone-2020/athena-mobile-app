import { BaseService } from "../base";
import { FoodItem } from "../../models/FoodItem";

export class FoodItemService extends BaseService {

    FOOD_ITEM_TABLE = 'FOOD_ITEM_TABLE'
    
    constructor(){
        super()
    }

    /**
     * Creates a food item to be stored in the database
     * @param {string} name 
     * @param {*} photoURI 
     * @param {string} quantity
     * @returns id of the food item created
     */
    async createFoodItem(name, photoURI, quantity){
        this.__UseCollection(this.FOOD_ITEM_TABLE)
        const foodItem = new FoodItem(name, photoURI, quantity)

        const newFoodItemId = await this.__CreateEntity( foodItem.toDocument() )
        return newFoodItemId
    }

    deleteFoodItem(){
        throw new Error('Not Implemented')
    }

    updateFoodQuantity(){
        throw new Error('Not Implemented')
    }

}