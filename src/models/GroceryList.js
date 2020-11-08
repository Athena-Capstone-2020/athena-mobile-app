import {Document} from './Document'
import { FoodItem } from './FoodItem'

export class GroceryList extends Document{

    /**
     * @param {string} name 
     * @param {string} ownerId 
     * @param {Array<Object>} foodItems 
     * @param {Date} dateCreated 
     * @param {Date} lastModified
     */
    constructor(name, ownerId, foodItems = [], dateCreated = new Date(), lastModified = new Date()){
        super()
        this.name = name
        this.ownerId = ownerId
        this.foodItems = foodItems
        this.dateCreated = dateCreated
        this.lastModified = lastModified
    }

    toDocument(){
        return {
            name: this.name,
            ownerId: this.ownerId,
            foodItems: this.foodItems,
            dateCreated: this.dateCreated.toISOString(),
            lastModified: this.lastModified.toISOString()
        }
    }

}