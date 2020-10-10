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
     * @param {string} id
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
     * Allows you to check if everything is connected properly
     * @param {string} message 
     */
    __HealthCheck(message) {
        console.log(`Service connected: ${message}`)
    }

    __UseCollection(collectionName) {
        this.db = firebase.firestore().collection(collectionName)
    }

    async __WARNING_CLEAR_COLLECTION() {
        if (!this.db) return
        const results = await this.db.get()
        for (const result of results.docs) {
            await result.ref.delete()
        }
    }
}