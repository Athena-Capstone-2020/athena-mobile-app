import {Document} from './Document'
import { FoodItem } from './FoodItem'

export class Container extends Document{

    /**
     * @param {string} name 
     * @param {Set<FoodItem>} contents 
     * @param {string} ownerId 
     */
    constructor(name, contents, ownerId){
        this.name = name
        this.contents = contents
        this.ownerId = ownerId
    }

    toDocument(){
        return{
            name: this.name,
            contents: this.contents,
            ownerId: this.ownerId
        }
    }

}