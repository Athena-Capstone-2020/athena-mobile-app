import { BaseService } from "../base";
import { Container } from "../../models/Container";

export class ContainerService extends BaseService{

    static CONTAINER_TABLE = 'CONTAINER_TABLE'
    static CONTAINER_FOOD_ITEM_TABLE = 'CONTAINER_FOOD_ITEM_TABLE'

    /**
     * Creates a new container and returns the id
     * @param {string} name 
     * @param {string} ownerId
     * @returns id of the container created
     */
    createContainer(name, ownerId){
       const container = new Container(name, ownerId);

        this.__UseCollection(CONTAINER_TABLE)
        const docRef = await this.__CreateEntity(container.toDocument())
        const id = docRef.id

        return id
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