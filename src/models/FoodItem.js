import {Document} from "./Document"

export class FoodItem extends Document{

    /**
     * @param {string} name 
     * @param {*} photoURI 
     * @param {string} quantity 
     */
    constructor(name, photoURI, quantity){
        this.name = name
        this.photoURI = photoURI
        this.quantity = quantity
    }

    toDocument(){
        return {
            name: this.name,
            photoURI: this.photoURI,
            quantity: this.quantity
        }
    }

}