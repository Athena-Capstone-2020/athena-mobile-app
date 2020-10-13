import {Document} from './Document'
import { FoodItem } from './FoodItem'

export class Container extends Document{

    /**
     * @param {string} name  
     * @param {string} householdId 
     * @param { FoodItem[] } foodItems
     */
    constructor(name, householdId, foodItems){
        super()
        this.name = name
        this.householdId = householdId
        this.foodItems = foodItems
    }

    toDocument(){
        const foodItemObjArray = []

        for(const foodItem in this.foodItems){
            foodItemObjArray.push( foodItem.toDocument() )
        }

        return{
            name: this.name,
            householdId: this.householdId,
            foodItems: foodItemObjArray
        }
    }

}