import { BaseService } from "../base"
import { Container, FoodItem } from "../../models"

export class ContainerService extends BaseService{

    CONTAINER_TABLE = 'CONTAINER_TABLE'

    constructor(){
        super()
    }

    /**
     * Creates a new container and returns the container object with an id
     * @param {string} name name of the new container
     * @param {string} householdId id of the household where the container is held
     * @returns the container object that was created
     */
    async createContainer(name, householdId){
        this.__UseCollection(this.CONTAINER_TABLE)
        const container = new Container(name, householdId, [])

        const newDocId = await this.__CreateEntity( container.toDocument() )
        container.id = newDocId
        return container
    }

    /**
     * Gets a container that has been created. If the container does not exist, a null will be returned
     * @param {string} id id of the container trying to be retrieved
     * @returns a container object or null
     */
    async getContainerById(id){
        this.__UseCollection(this.CONTAINER_TABLE)
        if(id == null)
            return null

        const containerDoc = await this.__GetById(id)

        if(containerDoc == undefined)
            return null
            
        const container = new Container(containerDoc.name, containerDoc.householdId, containerDoc.foodItems)
        container.id = id

        return container
    }

    /**
     * Attempts to delete a container by using its object id
     * @param {Container} container the container to be deleted.
     * @returns the container obj that was deleted, or null if container was not found or its id was null
     */
    async deleteContainerByObject(container){
        this.__UseCollection(this.CONTAINER_TABLE)

        const containerId = container.id
        if( containerId == null )
            return null

        const containerToDelete = await this.getContainerById(containerId)
        if( containerToDelete == null )
            return null

        await this.__DeleteEntityById(containerId)
        return containerToDelete
    }

    /**
     * Attempts to delete a container by just its id
     * @param {Container} container the container to be deleted. MUST HAVE ID
     * @returns the container obj that was deleted or null if container was not found
     */
    async deleteContainerById(id){
        this.__UseCollection(this.CONTAINER_TABLE)
        
        const containerToDelete = await this.getContainerById(id)
        if( containerToDelete == null)
            return null

        await this.__DeleteEntityById(id)
        return containerToDelete
    }
    
    /**
     * Updates a container object in the DB. If container Object has no id then returns null
     * @param {Container} updatedContainer updated container object
     * @returns updated container if successful, or null if the id doesn't exist or is null
     */
    async updateContainer(updatedContainer){
        this.__UseCollection(this.CONTAINER_TABLE)

        const containerId = updatedContainer.id
        if(containerId == null)
            return null
        
        const oldContainer = await this.getContainerById(containerId)
        if(oldContainer == null)
            return null

        await this.__UpdateById(containerId, updatedContainer.toDocument())
        return updatedContainer
    }

    /**
     * Adds a food item to the specified container and updates the DB
     * @param {Container} container the container the item is being added to
     * @param {FoodItem} item the food item being added to the container
     * @returns updated container if successful, otherwise returns null
     */
    async addFoodItemToContainer(container, item){
        this.__UseCollection(this.CONTAINER_TABLE)

        if( !(item instanceof FoodItem) )
            return null

        const containerToAddTo = await this.getContainerById(container.id)
        if(containerToAddTo == null)
            return null

        container.foodItems.push(item.toDocument())
        return await this.updateContainer(container)
    }

    /**
     * Update the food item in the container at the specified index
     * @param {Container} container the container the item is being retrieved from
     * @param {Number} index the location where the food item is located
     * @param {FoodItem} updatedItem
     * @returns updated container if successful, otherwise returns null
     */
    async updateFoodItemInContainer(container, index, updatedItem){
        this.__UseCollection(this.CONTAINER_TABLE)

        if( !(updatedItem instanceof FoodItem) )
            return null
        
        const containerToAddTo = await this.getContainerById(container.id)
        if(containerToAddTo == null)
            return null

        if(index < 0 || container.foodItems.length < index)
            return null

        if(index == container.foodItems.length)
            return await this.addFoodItemToContainer(container, updatedItem)

        container.foodItems.splice(index, 1, updatedItem.toDocument())
        return await this.updateContainer(container)
    }

    /**
     * Removes the food item at the index in the specified container
     * @param {Container} container the container a food item is being removed from 
     * @param {Number} index the index at which the food item is located
     * @returns updated container if successful, otherwise returns null 
     */
    async removeFoodItemFromContainer(container, index){
        this.__UseCollection(this.CONTAINER_TABLE)

        const containerToRemoveFrom = await this.getContainerById(container.id)
        if(containerToRemoveFrom == null)
            return null

        if( index < 0 || containerToRemoveFrom.foodItems.length <= index )
            return null

        containerToRemoveFrom.foodItems.splice(index, 1)
        return await this.updateContainer(containerToRemoveFrom)
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