import {Document} from "./Document"

export class FoodItem extends Document{

    /**
     * @param {string} name the name of the food item
     * @param {string} photoURI the photo URI for the food item
     * @param {string} quantity the amount of this food item
     * @param {string} description description about the food item
     * @param {Date} expireDate 
     * @param {Object} nutritionData
     */
    constructor(name, photoURI, quantity, description, expireDate, nutritionData){
        super()
        this.name = name
        this.photoURI = photoURI
        this.quantity = quantity
        this.description = description
        this.expireDate = expireDate
        this.nutritionData = nutritionData
    }

    toDocument(){
        return {
            name: this.name,
            photoURI: this.photoURI,
            quantity: this.quantity,
            description: this.description,
            expireDate: this.expireDate.toISOString(),
            nutritionData: this.nutritionData
        }
    }

}