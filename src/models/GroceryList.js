import {Document} from './Document'
import { FoodItem } from './FoodItem'

export class GroceryList extends Document{

    /**
     * @param {string} name 
     * @param {string} ownerId 
     * @param {Array<Object>} foodItems 
     */
    constructor(name, ownerId, foodItems){
        super()
        this.name = name
        this.ownerId = ownerId
        this.foodItems = foodItems
    }

    toDocument(){
        return {
            name: this.name,
            ownerId: this.ownerId,
            foodItems: this.foodItems
        }
    }

}