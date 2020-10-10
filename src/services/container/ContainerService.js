import { BaseService } from "../base";

export class ContainerService extends BaseService{

    /**
     * Creates a new container
     * @param {string} name 
     * @param {string} ownerId 
     */
    createContainer(name, ownerId){
        throw new Error('Not Implemented')
    }

    /**
     * Deletes a container by its id
     * @param {string} id
     */
    deleteContainerById(id){
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