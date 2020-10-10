import {Document} from './Document'

export class Container extends Document{

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