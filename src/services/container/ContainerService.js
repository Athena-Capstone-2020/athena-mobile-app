import { BaseService } from "../base"
import { Container, FoodItem } from "../../models"
import { log, logError } from '../../logger/Logger'

export class ContainerService extends BaseService{

    CONTAINER_COLLECTION = 'CONTAINER_COLLECTION'

    defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }

    constructor(){
        super()
    }

    /**
     * Creates a new container and returns the container object with an id
     * @param {string} name name of the new container
     * @param {Object} icon object with attributes name, color, type as strings
     * @returns the container object that was created
     * @throws errors if a container was not able to be made in DB
     */
    async createContainer(name, icon = this.defaultIcon){
        try{
            this.__UseCollection(this.CONTAINER_COLLECTION)
            const container = new Container(name, [], icon)

            const newDocId = await this.__CreateEntity( container.toDocument() )
            container.id = newDocId
            return container
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Gets a container that has been created. If the container does not exist, a null will be returned
     * @param {string} id id of the container trying to be retrieved
     * @returns a container object or null if container was not found
     * @throws error if id is null
     */
    async getContainerById(id){
        try{
            this.__UseCollection(this.CONTAINER_COLLECTION)
            if(id == null)
                throw new Error("id cannot be null")

            const containerDoc = await this.__GetById(id)

            if(containerDoc == undefined)
                return null
                
            const container = new Container(containerDoc.name, containerDoc.foodItems, containerDoc.icon)
            container.id = id

            return container
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Attempts to delete a container by using its object id
     * @param {Container} container the container to be deleted.
     * @returns the container obj that was deleted, or null if container was not found in DB
     * @throws error if container id is null
     */
    async deleteContainerByObject(container){
        try{
            this.__UseCollection(this.CONTAINER_COLLECTION)

            const containerId = container.id
            if( containerId == null )
                throw new Error('the container does not have an id')

            return await this.deleteContainerById(containerId)
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Attempts to delete a container by just its id
     * @param {string} id the id of the container container to be deleted
     * @returns the container obj that was deleted or null if container was not found
     */
    async deleteContainerById(id){
        try{
            this.__UseCollection(this.CONTAINER_COLLECTION)
            
            const containerToDelete = await this.getContainerById(id)
            if( containerToDelete == null)
                return null

            await this.__DeleteEntityById(id)
            return containerToDelete
        }
        catch(err){
            logError(err)
            throw err
        }
    }
    
    /**
     * Updates a container object in the DB
     * @param {Container} updatedContainer updated container object
     * @returns updated container if successful
     * @throws error if container id is null or the container is not in the DB
     */
    async updateContainer(updatedContainer){
        try{
            this.__UseCollection(this.CONTAINER_COLLECTION)

            const containerId = updatedContainer.id
            if(containerId == null)
                throw new Error('the container does not have an id')
            
            const oldContainer = await this.getContainerById(containerId)
            if(oldContainer == null)
                throw new Error('the container is not in the database')

            await this.__UpdateById(containerId, updatedContainer.toDocument())
            return updatedContainer
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Adds a food item to the specified container and updates the DB
     * @param {Container} container the container the item is being added to
     * @param {FoodItem} item the food item being added to the container
     * @returns updated container if successful, otherwise returns null
     * @throw error if item is not FoodItem or if container is not in the DB
     */
    async addFoodItemToContainer(container, item){
        try{
            this.__UseCollection(this.CONTAINER_COLLECTION)

            if( !(item instanceof FoodItem) )
                throw new Error('item is not of type FoodItem')

            const containerToAddTo = await this.getContainerById(container.id)
            if(containerToAddTo == null)
                throw new Error('the container is not in the database')

            container.foodItems.push(item.toDocument())
            return await this.updateContainer(container)
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Update the food item in the container at the specified index
     * @param {Container} container the container the item is being retrieved from
     * @param {Number} index the location where the food item is located
     * @param {FoodItem} updatedItem
     * @returns updated container if successful, otherwise returns null
     * @throws error if item is not FoodItem, if the container is not in the DB, or if the index is out of bounds
     */
    async updateFoodItemInContainer(container, index, updatedItem){
        try{
            this.__UseCollection(this.CONTAINER_COLLECTION)

            if( !(updatedItem instanceof FoodItem) )
                throw new Error('updatedItem is not of type FoodItem')
            
            const containerToAddTo = await this.getContainerById(container.id)
            if(containerToAddTo == null)
                throw new Error('the container is not in the database')

            if(index < 0 || container.foodItems.length <= index)
                 throw new Error('the index is out of bounds')

            container.foodItems.splice(index, 1, updatedItem.toDocument())
            return await this.updateContainer(container)
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Removes the food item at the index in the specified container
     * @param {Container} container the container a food item is being removed from 
     * @param {Number} index the index at which the food item is located
     * @returns updated container if successful, otherwise returns null
     * @throw error if the container is not in the DB or if the index is out of bounds 
     */
    async removeFoodItemFromContainer(container, index){
        try{
            this.__UseCollection(this.CONTAINER_COLLECTION)

            const containerToRemoveFrom = await this.getContainerById(container.id)
            if(containerToRemoveFrom == null)
                throw new Error('the container is not in the database')

            if( index < 0 || container.foodItems.length <= index )
                throw new Error('the index is out of bounds')

            container.foodItems.splice(index, 1)
            return await this.updateContainer(container)
        }
        catch(err){
            logError(err)
            throw err
        }
    }

    /**
     * Check if an item exist in the container
     * @param {Container} container the container that is being checked for item
     * @param {FoodItem} item the FoodItem that the container is being checked for
     * @returns true if the item is in the container, otherwise false if the item is not in the container, 
     *   the food item is invalid, or the container does not exist
     * @throws error if item is not of type FoodItem
     */
    async doesFoodItemExistInContainer(container, item){
        try{
            this.__UseCollection(this.CONTAINER_COLLECTION)

            if( !(item instanceof FoodItem) )
                throw new Error('item is not of type FoodItem')

            const foodItemAry = await this.getFoodItemArrayFromContainedWithId(container.id)
            const itemJSONString = JSON.stringify(item)

            let result = false

            foodItemAry.forEach(aryItem => {
                if(JSON.stringify(aryItem) == itemJSONString)
                    result = true
            })

            return result
        }
        catch(err){
            logError(err)
            throw err
        }

    }

    /**
     * Gets all the food items from a container
     * @param {string} id id of the container to get the food items from
     * @returns {FoodItem[]} an array of FoodItems that are currently in the container
     */
    async getFoodItemArrayFromContainer(id){
        try{
            this.__UseCollection(this.CONTAINER_COLLECTION)

            const container = await this.getContainerById(id)
            if(container == null)
                throw new Error('the container is not in the database')

            const foodItemAry = [];
            
            container.foodItems.forEach(obj => {
                const item = new FoodItem(obj.name, obj.photoURI, obj.quantity, obj.description, new Date(obj.expireDate), obj.nutritionData)
                foodItemAry.push(item)
            })

            return foodItemAry
        }
        catch(err){
            logError(err)
            throw err
        }
    }

}