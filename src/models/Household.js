import { Document } from './Document'

export class Household extends Document {
    constructor(name) {
        super()
        this.name = name
        this.members = []
    }

    toDocument() {
        return {
            name: this.name,
            members: this.members
        }
    }
}