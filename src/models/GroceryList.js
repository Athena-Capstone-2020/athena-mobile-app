import {Document} from './Document'

export class GroceryList extends Document{

    /**
     * @param {string} name 
     * @param {string} ownerId 
     * @param {List< Map<FoodItem, string> >} items 
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