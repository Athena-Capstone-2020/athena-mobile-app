import {Document} from './Document'

export class Container extends Document{

    /**
     * @param {string} name  
     * @param {string} householdId 
     */
    constructor(name, householdId){
        this.name = name
        this.contents = new Set();
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