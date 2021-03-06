const { ContainerService } = require('../src/services')
const { Container, FoodItem } = require('../src/models')
const { initFirebase } = require('../src/firebase/config')
require('dotenv').config()

//test to ensure the service can be created and used
test('should pass health check without errors', async () => {
    const [containerService] = setup()

    containerService.__HealthCheck('Message')
})

//CreateContainer
test('should create container without errors', async () => {
    const [containerService] = setup()

    const createdContainerId = await containerService.createContainer('createContainer')
    expect(createdContainerId).toBeDefined()
})

//GetContainer
test('should get a container that has been created already without errors', async () => {
    const [containerService] = setup()

    const newContainerId = await containerService.createContainer('getContainerTest1')
    const retrievedContainer = await containerService.getContainerById(newContainerId);

    expect(retrievedContainer).toMatchObject({
        name: "getContainerTest1",
        foodItems: [],
        icon: {
            name: "DefaultName",
            color: "DefaultColor",
            type: "DefaultType"
        }
    })
    
})

test('should try to get a container that does not exist and return null without error', async () => {
    const [containerService] = setup()

    const containerId = 'I_Do_Not_Exist'
    const retrievedContainer = await containerService.getContainerById(containerId);

    expect(retrievedContainer).toBe(null)

})

//DeleteContainer
test('should create and delete a container by id without error', async () => {
    const [containerService] = setup()

    const newContainerId = await containerService.createContainer('toBeDeleted')

    const deletedContainer = await containerService.deleteContainerById(newContainerId)
    expect(deletedContainer).toMatchObject({
        name: "toBeDeleted",
        foodItems: [],
        icon: {
            name: "DefaultName",
            color: "DefaultColor",
            type: "DefaultType"
        }
    })

    const containerAfterDeletion = await containerService.getContainerById(newContainerId)
    expect(containerAfterDeletion).toBe(null)
})

test('should try to delete container by id that does not exist', async () => {
    const [containerService] = setup()

    const containerId = 'I_Do_Not_Exist'
    const deletedContainer = await containerService.deleteContainerById(containerId)
    expect(deletedContainer).toBe(null)
})

test('should create and delete a container by object without error', async () => {
    const [containerService] = setup()

    const newContainerId = await containerService.createContainer('toBeDeleted')
    const containerCreated = await containerService.getContainerById(newContainerId)

    const deletedContainer = await containerService.deleteContainerByObject(containerCreated)
    expect(deletedContainer).toMatchObject(containerCreated)

    const containerAfterDeletion = await containerService.getContainerById(newContainerId)
    expect(containerAfterDeletion).toBe(null)

})

test('attempts to delete a container by object that has a null id and errors', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', [], defaultIcon)

    let errorCaught = null
    try{
        const deletedContainer = await containerService.deleteContainerByObject(container)
    }
    catch(err){
        errorCaught = err
    }

    expect(errorCaught).toStrictEqual(new Error('the container does not have an id'))
})

//updateContainer
test('should create and update a container without error', async () => {
    const [containerService] = setup()

    const newContainerId = await containerService.createContainer('nameToBeUpdated')
    const containerCreated = await containerService.getContainerById(newContainerId)

    containerCreated.name = 'updateContainer'
    const updatedContainer = await containerService.updateContainer(containerCreated)
    expect(updatedContainer).toMatchObject(containerCreated)

    const containerAfterUpdate = await containerService.getContainerById(newContainerId)
    expect(containerAfterUpdate).toMatchObject(updatedContainer)

})

test('attempts to update a container that has a null id and errors', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', [], defaultIcon)
    
    let errorCaught = null
    try{
        const updatedContainer = await containerService.updateContainer(container)
    }
    catch(err){
        errorCaught = err
    }

    expect(errorCaught).toStrictEqual(new Error('the container does not have an id'))
})

test('attempts to update a container with an id that does not exist and errors', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', [], defaultIcon)
    container.id = 'I_Do_Not_Exist'

    let errorCaught = null
    try{
        const updatedContainer = await containerService.updateContainer(container)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the container is not in the database'))
})

//addFoodItemToContainer
test('should add a food item to a container without errors', async () => {
    const [containerService] = setup()

    const newContainerId = await containerService.createContainer('addItemToContainer1')

    const expireDate = new Date()
    const foodItemToAdd = new FoodItem('someFoodItemName', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const updatedContainer = await containerService.addFoodItemToContainer(foodItemToAdd, newContainerId)
    const containerAfterUpdate = await containerService.getContainerById(newContainerId)
    expect(containerAfterUpdate).toMatchObject(updatedContainer)
})

test('attempts to add something other than food item to container and errors', async () => {
    const [containerService] = setup()

    const newContainerId = await containerService.createContainer('addItemToContainer2')

    const foodItemToAdd = new Object()

    let errorCaught = null
    try{
        const updatedContainer = await containerService.addFoodItemToContainer(foodItemToAdd, newContainerId)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('item is not of type FoodItem'))
})

test('attempts to add FoodItem to container that does not exist and errors', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', [], defaultIcon)
    container.id = 'I_Do_Not_Exist'
    const expireDate = new Date()
    const foodItem = new FoodItem('name', 'photoURI', 'quantity', 'someDescription', expireDate, {})
    
    let errorCaught = null
    try{
        const updatedContainer = await containerService.addFoodItemToContainer(foodItem, container.id)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the container is not in the database'))
})

//updateFoodItemInContainer
test('should update a food item in a container without error', async () => {
    const [containerService] = setup()

    const newContainerId = await containerService.createContainer('updateFoodItemInContainer1')

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await containerService.addFoodItemToContainer(foodItemOne, newContainerId)
    await containerService.addFoodItemToContainer(foodItemTwo, newContainerId)
    const finalAdd = await containerService.addFoodItemToContainer(foodItemThree, newContainerId)
    const updatedContainer = await containerService.getContainerById(newContainerId)
    expect(updatedContainer).toMatchObject(finalAdd)

    const changedExpireDate = new Date()
    const updatedFoodItem = new FoodItem('iChanged', 'iChanged', 'iChanged', 'iChanged', changedExpireDate, {something: 'iAmAdded'})
    const updatedFoodItemContainer = await containerService.updateFoodItemInContainer(newContainerId, 0, updatedFoodItem)
    const finalDBContainer = await containerService.getContainerById(newContainerId)
    expect(finalDBContainer).toMatchObject(updatedFoodItemContainer)
    
})

test('attempts to update an item in a nonexistent container and errors', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', [], defaultIcon)
    container.id = 'I_DO_NOT_EXIST'
    const foodItem = new FoodItem('dummy', 'dummy', 'dummy')

    let errorCaught = null
    try{
        const updatedContainer = await containerService.updateFoodItemInContainer(container.id, 0, foodItem)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the container is not in the database'))
    
})

test('attempts to update an item at an index that is out of bounds and errors', async () => {
    const [containerService] = setup()

    const newContainerId = await containerService.createContainer('updateFoodItemInContainer2')
    const containerCreated = await containerService.getContainerById(newContainerId)

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await containerService.addFoodItemToContainer(foodItemOne, newContainerId)
    await containerService.addFoodItemToContainer(foodItemTwo, newContainerId)
    await containerService.addFoodItemToContainer(foodItemThree, newContainerId)

    const changedExpireDate = new Date()
    const updatedFoodItem = new FoodItem('iChanged', 'iChanged', 'iChanged', 'iChanged', changedExpireDate, {something: 'iAmAdded'})

    let errorCaught = null
    try{
        const updatedFoodItemContainer = await containerService.updateFoodItemInContainer(newContainerId, -1, updatedFoodItem)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the index is out of bounds'))
})

test('attempts to update an item that is not a FoodItem type and errors', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', [], defaultIcon)
    const foodItem = new Object()
    
    let errorCaught = null
    try{
        const updatedFoodItemContainer = await containerService.updateFoodItemInContainer(container.id, 0, foodItem)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('updatedItem is not of type FoodItem'))
})

//removeItemFromContainer
test('should delete the food item from container without error', async () => {
    const [containerService] = setup()

    const newContainerId = await containerService.createContainer('removeFoodItemFromContainer1')

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await containerService.addFoodItemToContainer(foodItemOne, newContainerId)
    await containerService.addFoodItemToContainer(foodItemTwo, newContainerId)
    await containerService.addFoodItemToContainer(foodItemThree, newContainerId)

    const deleteContainer = await containerService.removeFoodItemFromContainer(newContainerId, 1)
    const containerAfterDelete = await containerService.getContainerById(newContainerId)
    expect(containerAfterDelete).toMatchObject(deleteContainer)
})

test('attempts to delete a food item from index out of bounds and errors', async () => {
    const [containerService] = setup()

    const newContainerId = await containerService.createContainer('removeFoodItemFromContainer2')

    let errorCaught = null
    try{
    const deleteContainer = await containerService.removeFoodItemFromContainer(newContainerId, 0)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the index is out of bounds'))
})

test('attempts to delete from a container that does not exist and errors', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', [], defaultIcon)
    container.id = 'I_DO_NOT_EXIST'

    let errorCaught = null
    try{
        const updatedContainer = await containerService.removeFoodItemFromContainer(container.id, 0)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the container is not in the database'))
    
})

//doesFoodItemExistInContainer
test('should create a container, add a food item to it, check to see if its there', async () => {
    const [containerService] = setup()

    const newContainerId = await containerService.createContainer('doesFoodItemExist')

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await containerService.addFoodItemToContainer(foodItemOne, newContainerId)
    await containerService.addFoodItemToContainer(foodItemTwo, newContainerId)
    await containerService.addFoodItemToContainer(foodItemThree, newContainerId)

    const existingFoodItem = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const doesExist = await containerService.doesFoodItemExistInContainer(newContainerId, existingFoodItem)
    expect(doesExist).toBe(true)

    const foodItemNonExistant = new FoodItem('fourthFood', 'somePhotoURI', 'someQuantity', 'someDescripion', null, {})
    const doesExistTwo = await containerService.doesFoodItemExistInContainer(newContainerId, foodItemNonExistant)
    expect(doesExistTwo).toBe(false)
})

//getFoodItemArrayFromContainedWithId
test('should create a container, add food items, and get the items an array', async () => {
    const [containerService] = setup()

    const newContainerId = await containerService.createContainer('doesFoodItemExist')

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await containerService.addFoodItemToContainer(foodItemOne, newContainerId)
    await containerService.addFoodItemToContainer(foodItemTwo, newContainerId)
    await containerService.addFoodItemToContainer(foodItemThree, newContainerId)

    const arrayExpect = [foodItemOne, foodItemTwo, foodItemThree]

    const foodItemArray = await containerService.getFoodItemArrayFromContainer(newContainerId);
    expect(arrayExpect).toStrictEqual(foodItemArray)
})

/**
 * helper function
 * @returns {[ContainerService]}
 */
function setup(){
    const firebaseConfig = {
        apiKey: process.env.FIREBASE_API_KEY,
        authDomain: process.env.FIREBASE_AUTH_DOMAIN,
        databaseURL: process.env.FIREBASE_DATABASE_URL,
        projectId: process.env.FIREBASE_PROJECT_ID,
        storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
        messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
        appId: process.env.FIREBASE_APP_ID,
        measurementId: process.env.FIREBASE_MEASUREMENT_ID,
    }
    initFirebase(firebaseConfig)
    const containerService = new ContainerService();
    return [containerService]
}