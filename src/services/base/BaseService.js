export class BaseService {
    constructor() {}

    /**
     * @protected
     * @param {string} id 
     */
    __GetById(id) {
        return new Error('Not implemented')
    }

    /**
     * @protected
     * @param {string} id 
     * @param {object} changes 
     */
    __UpdateById(id, changes) {
        return new Error('Not implemented')
    }

    /**
     * @protected
     * @param {string} id 
     */
    __CreateEntity(id) { 
        return new Error('Not implemented')
    }

    /**
     * @protected
     * @param {string} id 
     */
    __DeleteEntityById(id) {
        return new Error('Not implemented')
    }
}