import firebase from 'firebase'

export class BaseService {
    constructor(collectionName) {
        this.db = firebase.firestore().collection(collectionName)
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
     * @param {object} object to save
     */
    async __CreateEntity(id, object) { 
        await this.db.doc(id).set(object)
    }

    /**
     * @protected
     * @param {string} id 
     */
    async __DeleteEntityById(id) {
        await this.db.doc(id).delete()
    }

    __HealthCheck() {
        console.log(`Service connected: ${this}`)
    }
}