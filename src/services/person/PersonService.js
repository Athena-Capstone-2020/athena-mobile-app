import { BaseService } from "../base";

export class PersonService extends BaseService {
    PERSON_CONTAINER = 'PERSON_CONTAINER'

    async getPersonById(id) {
        this.__UseCollection(this.PERSON_CONTAINER)

        return await this.__GetById(id)
    }

    async createPerson(person) {
        this.__UseCollection(this.PERSON_CONTAINER)

        const newPerson = await this.db.add(person)
        return newPerson.id
    }

    async removePersonById(id) {
        this.__UseCollection(this.PERSON_CONTAINER)

        return await this.__DeleteEntityById(id)
    }
}