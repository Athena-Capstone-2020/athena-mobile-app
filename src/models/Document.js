export class Document {
    /**
     * Makes sure that the id is declared
     * @param {string} id 
     */
    constructor(id) {
        this.id = id
    }

    /**
     * Turns the class into an object that you can save into Firebase directly
     */
    toDocument() {
        throw new Error('No implementation found')
    }
}