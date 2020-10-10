import { BaseService } from "../base";

export class HouseholdService extends BaseService {
    addPerson(person) {
        throw new Error('Not Implemented')
    }

    removePerson(personId) {
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

    listHousehold(householdId) {
        throw new Error('Not Implemented')
    }
}