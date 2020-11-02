import {Document} from './Document'

export class Container extends Document{

    /**
     * @param {string} name  
     * @param { Array<Object> } foodItems
     * @param { Object } icon
     */
    constructor(name, foodItems, icon){
        super()
        this.name = name
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
            foodItems: this.foodItems,
            icon: this.icon
        }
    }

}