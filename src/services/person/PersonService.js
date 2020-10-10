import { BaseService } from "../base";

export class PersonService extends BaseService {
    PERSON_CONTAINER = 'PERSON_CONTAINER'

    getPersonById(id) {
        this.__UseCollection(this.PERSON_CONTAINER)

        return this.__GetById(id)
    }
}