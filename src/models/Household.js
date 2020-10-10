import { Document } from './Document'

export class Household extends Document {
    constructor() {
        super('some id')
    }

    toDocument() {
        return {
            id: this.id,
            name: this.name,
            members: this.members
        }
    }
}