import { BaseService } from "../base";

export class HouseholdService extends BaseService {
    /**
     * @param {string} householdId
     * @param {string} person 
     */
    addPerson(householdId, person) {
        throw new Error('Not Implemented')
    }

    /**
     * Removes a person from the household
     * @param {string} householdId
     * @param {string} personId 
     */
    removePerson(householdId, personId) {
        throw new Error('Not Implemented')
    }

    /**
     * Finds and returns a list of households that the person belongs to
     * @param {string} personId 
     * @returns array of Household objects
     */
    findHouseholdForPerson(personId) {
        throw new Error('Not Implemented')
    }

    /**
     * Creates a household and returns the id of that household
     * 
     * @param {string} nameOfHousehold
     * @returns {string} id of the household
     */
    createHousehold(nameOfHousehold) {
        throw new Error('Not Implemented')
    }

    /**
     * List the people in the household
     * @param {string} householdId 
     * @returns {Array<Person>} people that are a part of the household
     */
    listHousehold(householdId) {
        throw new Error('Not Implemented')
    }
}