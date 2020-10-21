import firebase from 'firebase'

export class BaseService {
    constructor() {
        this.db = null
    }

    /**
     * @protected
     * @param {string} id 
     */
    async __GetById(id) {
        const results = await this.db.doc(id).get()
        return results.data()
    }

    /**
     * @protected
     * @param {string} id 
     * @param {object} changes 
     */
    async __UpdateById(id, changes) {
        await this.db.doc(id).update(changes)
    }

    /**
     * @protected
     * @param {object} object
     */
    async __CreateEntity(object) { 
        const newDoc = await this.db.add(object)
        return newDoc.id
    }

    /**
     * @protected
     * @param {string} id 
     */
    async __DeleteEntityById(id) {
        await this.db.doc(id).delete()
    }

    /**
     * Searches for entities matching the object passed
     * @param {Object} query match query
     */
    async __SearchForEntity(query) {
        const formattedQuery = Object.entries(query)

        let databaseQuery = this.db

        for (const queryEntry of formattedQuery) {
            databaseQuery = databaseQuery.where(queryEntry[0], '==', queryEntry[1])
        }

        const results = await databaseQuery.get()
        return results.docs
    }

    /**
     * Allows you to check if everything is connected properly
     * @param {string} message 
     */
    __HealthCheck(message) {
        console.log(`Service connected: ${message}`)
    }

    __UseCollection(collectionName) {
        this.db = firebase.firestore().collection(collectionName)
    }
}