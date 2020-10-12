import {Document} from './Document'

export class Container extends Document{

    /**
     * @param {string} name  
     * @param {string} householdId 
     */
    constructor(name, householdId){
        super()
        this.name = name
        this.householdId = householdId
    }

    toDocument(){
        return{
            name: this.name,
            householdId: this.householdId
        }
    }

}