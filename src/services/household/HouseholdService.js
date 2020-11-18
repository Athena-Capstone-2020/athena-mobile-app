import { BaseService } from "../base";
import { Household } from '../../models/Household'
import { ContainerService, PersonService, GroceryListService } from '../'
import { logError } from "../../logger/Logger";

export class HouseholdService extends BaseService {
    HOUSEHOLD_COLLECTION = 'HOUSEHOLD_COLLECTION'
    HOUSEHOLD_MEMBER_COLLECTION = 'HOUSEHOLD_MEMBER_COLLECTION'
    HOUSEHOLD_CONTAINER_COLLECTION = 'HOUSEHOLD_CONTAINER_COLLECTION'
    HOUSEHOLD_GROCERY_LIST_COLLECTION = 'HOUSEHOLD_GROCERY_LIST_COLLECTION'

    /**
     * @type PersonService
     */
    personService = null

    /**
     * @type ContainerService
     */
    containerService = null

    /**
     * @type GroceryListService 
     */
    groceryListService = null

    /**
     * @param {PersonService} personService 
     * @param {ContainerService} containerService
     * @param {GroceryListService} groceryListService 
     */
    constructor(personService, containerService, groceryListService) {
        super()
        this.personService = personService
        this.containerService = containerService
        this.groceryListService = groceryListService
    }

    /**
     * @param {string} householdId
     * @param {string} personId
     */
    async addPerson(householdId, personId) {
        this.__UseCollection(this.HOUSEHOLD_MEMBER_COLLECTION)

        return await this.__CreateEntity({ householdId, personId })
    }

    /**
     * Removes a person from the household
     * @param {string} householdId
     * @param {string} personId 
     */
    async removePerson(householdId, personId) {
        this.__UseCollection(this.HOUSEHOLD_MEMBER_COLLECTION)

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
        this.__UseCollection(this.HOUSEHOLD_MEMBER_COLLECTION)
        const listOfHouseholds = []

        const results = await this.db.where('personId', '==', personId).get()

        this.__UseCollection(this.HOUSEHOLD_COLLECTION)

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
     * @returns {Promise<string>} id of the household
     */
    async createHousehold(nameOfHousehold) {
        this.__UseCollection(this.HOUSEHOLD_COLLECTION)

        const household = new Household(nameOfHousehold)

        return await this.__CreateEntity(household.toDocument())
    }

    /**
     * List the people in the household
     * @param {string} householdId 
     * @returns {Promise<Array<Person>>} people that are a part of the household
     */
    async listHousehold(householdId) {
        this.__UseCollection(this.HOUSEHOLD_MEMBER_COLLECTION)

        const listOfPeopleInHousehold = []

        const results = await this.db.where('householdId', '==', householdId).get()
        for (const result of results.docs) {
            const id = result.data().personId
            const person = this.personService.getPersonById(id)
            listOfPeopleInHousehold.push({ id, data: person })
        }

        return listOfPeopleInHousehold
    }

    async getHouseholdById(householdId) {
        this.__UseCollection(this.HOUSEHOLD_COLLECTION)

        this.__GetById(householdId)
    }

    async addContainerToHousehold(containerId, householdId) {
        // Let's make sure that the container and household actually exists
        if (!(await this.containerService.getContainerById(containerId) || !(await this.getHouseholdById(householdId))))
            throw new Error(`Cannot create association between container: ${containerId} and household: ${householdId}`)

        this.__UseCollection(this.HOUSEHOLD_CONTAINER_COLLECTION)
        this.__CreateEntity({ containerId, householdId })
    }

    async getContainersForHousehold(householdId) {
        this.__UseCollection(this.HOUSEHOLD_CONTAINER_COLLECTION)
        const containerHouseholdRelations = await this.__SearchForEntity({ householdId })

        const containers = []

        for (const { containerId } of containerHouseholdRelations) {
            const containerObject = await this.containerService.getContainerById(containerId)
            if (!!containerObject) containers.push(containerObject)
        }

        return containers
    }

    async addGroceryListToHousehold(groceryListId, householdId){
        try{
            if( !(await this.groceryListService.getGroceryListById(groceryListId) || !(await this.getHouseholdById(householdId))) )
                throw new Error(`Cannont create association between groceryList: ${groceryListId} and household: ${householdId}`)

            this.__UseCollection(this.HOUSEHOLD_GROCERY_LIST_COLLECTION)
            this.__CreateEntity( {groceryListId, householdId} )
            
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    async removeGroceryListFromHousehold(groceryListId, householdId){
        try{
            this.__UseCollection(this.HOUSEHOLD_GROCERY_LIST_COLLECTION)

            const results = await this.db.where('householdId', '==', householdId).where('groceryListId', '==', groceryListId).get()
            for (const result of results.docs) {
                await result.ref.delete()
            }
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    async getGroceryListsForHousehold(householdId){
        try{
            this.__UseCollection(this.HOUSEHOLD_GROCERY_LIST_COLLECTION)
            const groceryListHouseholdRelations = await this.__SearchForEntity({ householdId })

            const groceryLists = []
            for(const { groceryListId } of groceryListHouseholdRelations){
                const groceryListObject = await this.groceryListService.getGroceryListById(groceryListId)
                groceryLists.push(groceryListObject)
            }

            return groceryLists
        }
        catch(err){
            logError(err)
            throw err
        }
    }
}