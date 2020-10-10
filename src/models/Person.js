import { Document } from "./Document";

export class Person extends Document {
    constructor(name) {
        super()
        this.name = name
    }

    toDocument() {
        return ({
            name: this.name
        })
    }
}