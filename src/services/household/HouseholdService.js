import { BaseService } from "../base";
import { Household } from '../../models/Household'

export class HouseholdService extends BaseService {
    HOUSEHOLD_CONTAINER = 'HOUSEHOLD_CONTAINER'
    HOUSEHOLD_MEMBER_CONTAINER = 'HOUSEHOLD_MEMBER_CONTAINER'

    personService = null
    constructor(personService) {
        super()
        this.personService = personService
    }

    /**
     * @param {string} householdId
     * @param {string} personId
     */
    async addPerson(householdId, personId) {
        this.__UseCollection(this.HOUSEHOLD_MEMBER_CONTAINER)

        return await this.__CreateEntity({ householdId, personId })
    }

    /**
     * Removes a person from the household
     * @param {string} householdId
     * @param {string} personId 
     */
    async removePerson(householdId, personId) {
        this.__UseCollection(this.HOUSEHOLD_MEMBER_CONTAINER)

        const results = await this.db.where('householdId', '==', householdId).where('personId', '==', personId).get()
        for (const result of results.docs) {
            await result.ref.delete()
        }
    }

    /**
     * Finds and returns a list of households that the person belongs to
     * @param {string} personId 
     * @returns array of Household objects
     */
    async findHouseholdForPerson(personId) {
        this.__UseCollection(this.HOUSEHOLD_MEMBER_CONTAINER)
        const listOfHouseholds = []

        const results = await this.db.where('personId', '==', personId).get()

        this.__UseCollection(this.HOUSEHOLD_CONTAINER)

        for (const result of results.docs) {
            const id = result.data().householdId
            const household = await this.__GetById(id)
            listOfHouseholds.push({id, data: household})
        }

        return listOfHouseholds
    }

    /**
     * Creates a household and returns the id of that household
     * 
     * @param {string} nameOfHousehold
     * @returns {string} id of the household
     */
    async createHousehold(nameOfHousehold) {
        this.__UseCollection(this.HOUSEHOLD_CONTAINER)

        const household = new Household(nameOfHousehold)

        const newDocument = await this.__CreateEntity(household.toDocument())
        return newDocument.id
    }

    /**
     * List the people in the household
     * @param {string} householdId 
     * @returns {Array<Person>} people that are a part of the household
     */
    async listHousehold(householdId) {
        this.__UseCollection(this.HOUSEHOLD_MEMBER_CONTAINER)

        const listOfPeopleInHousehold = []

        const results = await this.db.where('householdId', '==', householdId).get()
        for (const result of results.docs) {
            const id = result.data().personId
            const person = this.personService.getPersonById(id)
            listOfPeopleInHousehold.push({ id, data: person })
        }

        return listOfPeopleInHousehold
    }
}