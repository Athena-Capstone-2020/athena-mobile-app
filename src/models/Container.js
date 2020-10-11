import {Document} from './Document'
import { FoodItem } from './FoodItem'

export class Container extends Document{

    /**
     * @param {string} name 
     * @param {Set<FoodItem>} contents 
     * @param {string} householdId 
     */
    constructor(name, contents, householdId){
        this.name = name
        this.contents = contents
        this.householdId = householdId
    }

    toDocument(){
        return{
            name: this.name,
            contents: this.contents,
            householdId: this.householdId
        }
    }

}