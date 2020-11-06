import {Document} from './Document'
import { FoodItem } from './FoodItem'

export class GroceryList extends Document{

    /**
     * @param {string} name 
     * @param {string} ownerId 
     * @param {Array<Object>} foodItems 
     */
    constructor(name, ownerId, items){
        this.name = name
        this.ownerId = ownerId
        this.items = items
    }

    toDocument(){
        return {
            name: this.name,
            ownerId: this.ownerId,
            items: this.items
        }
    }

}