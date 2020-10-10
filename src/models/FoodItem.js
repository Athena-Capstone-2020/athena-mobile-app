import {Document} from "./Document"

export class FoodItem extends Document{

    constructor(name, photoURI){
        this.name = name
        this.photoURI = photoURI
    }

    toDocument(){
        return {
            name: this.name,
            photoURI: this.photoURI
        }
    }

}