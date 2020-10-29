import {Document} from './Document'

export class Container extends Document{

    /**
     * @param {string} name  
     * @param {string} householdId 
     * @param { Array<Object> } foodItems
     * @param { Object } icon
     */
    constructor(name, householdId, foodItems, icon){
        super()
        this.name = name
        this.householdId = householdId
        this.foodItems = foodItems
        this.icon = {
            name: icon.name,
            color: icon.color,
            type: icon.type
        }
    }

    toDocument(){
        return{
            name: this.name,
            householdId: this.householdId,
            foodItems: this.foodItems,
            icon: this.icon
        }
    }

}