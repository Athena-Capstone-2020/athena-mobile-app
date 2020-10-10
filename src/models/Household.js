import { Document } from './Document'

export class Household extends Document {
    constructor(name) {
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