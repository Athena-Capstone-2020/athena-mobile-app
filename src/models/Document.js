export class Document {
    constructor() {
        this.id = null
    }

    /**
     * Turns the class into an object that you can save into Firebase directly
     */
    toDocument() {
        throw new Error('No implementation found')
    }
}