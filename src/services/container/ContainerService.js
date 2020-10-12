import { BaseService } from "../base";
import { Container } from "../../models/Container";

export class ContainerService extends BaseService{

    CONTAINER_TABLE = 'CONTAINER_TABLE'
    CONTAINER_FOOD_ITEM_TABLE = 'CONTAINER_FOOD_ITEM_TABLE'

    constructor(){
        super()
    }

    /**
     * Creates a new container and returns the id
     * @param {string} name name of the new container
     * @param {string} householdId id of the household where the container is held
     * @returns id of the container created
     */
    async createContainer(name, householdId){
    
        this.__UseCollection(this.CONTAINER_TABLE)
        const container = new Container(name, householdId)

        const newDocId = await this.__CreateEntity( container.toDocument() )
        return newDocId

    }

    /**
     * Gets a container that has been created. If the container does not exist, a null will be returned
     * @param {string} id id of the container trying to be retrieved
     * @returns a container object or null
     */
    async getContainer(id){
        this.__UseCollection(this.CONTAINER_TABLE)
        const container = await this.__GetById(id)

        if(container == undefined)
            return null

        return container
    }

    /**
     * Deletes a container by its id
     * @param {string} id
     */
    deleteContainer(id){
        throw new Error('Not Implemented')
    }
    
    /**
     * Updates the name of the container to the new given name
     * @param {string} name 
     */
    updateName(name){
        throw new Error('Not Implemented')
    }

    /**
     * Adds a food item to the container
     * @param {FoodItem} item
     */
    addItem(item){
        throw new Error('Not Implemented')
    }

    /**
     * Removes a food item from the container
     * @param {item} item 
     */
    removeItem(item){
        throw new Error('Not Implemented')
    }

    /**
     * Check if an item exist in the container
     * @param {FoodItem} item 
     * @returns boolean stating if the item is in the container
     */
    itemExist(item){
        throw new Error('Not Implemented')
    }

}