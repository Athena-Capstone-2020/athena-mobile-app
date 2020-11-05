const { ContainerService } = require('../src/services')
const { Container, FoodItem } = require('../src/models')
const { initFirebase } = require('../src/firebase/config')

//test to ensure the service can be created and used
test('should pass health check without errors', async () => {
    const [containerService] = setup()

    containerService.__HealthCheck('Message')
})

//CreateContainer
test('should create container without errors', async () => {
    const [containerService] = setup()

    const createdContainer = await containerService.createContainer('createByParams')
    expect(createdContainer.id).toBeDefined()
    expect(createdContainer.toDocument()).toMatchObject({
        name: 'createByParams',
        foodItems: [],
        icon: {
            name: "DefaultName",
            color: "DefaultColor",
            type: "DefaultType"
        }
    })
})

//GetContainer
test('should get a container that has been created already without errors', async () => {
    const [containerService] = setup()

    const containerCreated = await containerService.createContainer('getContainerTest1')
    const retrievedContainer = await containerService.getContainerById(containerCreated.id);

    expect(retrievedContainer).toMatchObject(containerCreated)
    
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

    const newContainer = await containerService.createContainer('toBeDeleted')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const deletedContainer = await containerService.deleteContainerById(newContainer.id)
    expect(deletedContainer).toMatchObject(newContainer)

    const containerAfterDeletion = await containerService.getContainerById(newContainer.id)
    expect(containerAfterDeletion).toBe(null)
})

test('should try to delete container by id that does not exist and returns null', async () => {
    const [containerService] = setup()

    const containerId = 'I_Do_Not_Exist'
    const deletedContainer = await containerService.deleteContainerById(containerId)
    expect(deletedContainer).toBe(null)

})

test('should create and delete a container by object without error', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('toBeDeleted')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const deletedContainer = await containerService.deleteContainerByObject(newContainer)
    expect(deletedContainer).toMatchObject(newContainer)

    const containerAfterDeletion = await containerService.getContainerById(newContainer.id)
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

    const newContainer = await containerService.createContainer('nameToBeUpdated')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    containerCreated.name = 'updateContainer'
    const updatedContainer = await containerService.updateContainer(containerCreated)
    expect(updatedContainer).toMatchObject(containerCreated)

    const containerAfterUpdate = await containerService.getContainerById(newContainer.id)
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

    const newContainer = await containerService.createContainer('addItemToContainer1')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const expireDate = new Date()
    const foodItemToAdd = new FoodItem('someFoodItemName', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const updatedContainer = await containerService.addFoodItemToContainer(containerCreated, foodItemToAdd)
    const containerAfterUpdate = await containerService.getContainerById(newContainer.id)
    expect(containerAfterUpdate).toMatchObject(updatedContainer)
})

test('attempts to add something other than food item to container and errors', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('addItemToContainer2')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const foodItemToAdd = new Object()

    let errorCaught = null
    try{
        const updatedContainer = await containerService.addFoodItemToContainer(containerCreated, foodItemToAdd)
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
        const updatedContainer = await containerService.addFoodItemToContainer(container, foodItem)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the container is not in the database'))
})

//updateFoodItemInContainer
test('should update a food item in a container without error', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('updateFoodItemInContainer1')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await containerService.addFoodItemToContainer(containerCreated, foodItemOne)
    await containerService.addFoodItemToContainer(containerCreated, foodItemTwo)
    await containerService.addFoodItemToContainer(containerCreated, foodItemThree)
    const updatedContainer = await containerService.getContainerById(containerCreated.id)
    expect(updatedContainer).toMatchObject(containerCreated)

    const changedExpireDate = new Date()
    const updatedFoodItem = new FoodItem('iChanged', 'iChanged', 'iChanged', 'iChanged', changedExpireDate, {something: 'iAmAdded'})
    const updatedFoodItemContainer = await containerService.updateFoodItemInContainer(updatedContainer, 0, updatedFoodItem)
    const finalDBContainer = await containerService.getContainerById(updatedContainer.id)
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
        const updatedContainer = await containerService.updateFoodItemInContainer(container, 0, foodItem)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the container is not in the database'))
    
})

test('attempts to update an item at an index that is out of bounds and errors', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('updateFoodItemInContainer2')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await containerService.addFoodItemToContainer(containerCreated, foodItemOne)
    await containerService.addFoodItemToContainer(containerCreated, foodItemTwo)
    await containerService.addFoodItemToContainer(containerCreated, foodItemThree)
    const updatedContainer = await containerService.getContainerById(containerCreated.id)
    expect(updatedContainer).toMatchObject(containerCreated)

    const changedExpireDate = new Date()
    const updatedFoodItem = new FoodItem('iChanged', 'iChanged', 'iChanged', 'iChanged', changedExpireDate, {something: 'iAmAdded'})

    let errorCaught = null
    try{
        const updatedFoodItemContainer = await containerService.updateFoodItemInContainer(updatedContainer, -1, updatedFoodItem)
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
        const updatedFoodItemContainer = await containerService.updateFoodItemInContainer(container, 0, foodItem)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('updatedItem is not of type FoodItem'))
})

test('attempts to update food item at index = ary.length and adds it to the end of the array', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('updateFoodItemInContainer3')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const expireDate = new Date()
    const foodItemToAdd = new FoodItem('someFoodItemName', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const updatedContainer = await containerService.updateFoodItemInContainer(containerCreated, 0, foodItemToAdd)
    const containerAfterUpdate = await containerService.getContainerById(newContainer.id)
    expect(containerAfterUpdate).toMatchObject(updatedContainer)
})

//removeItemFromContainer
test('should delete the food item from container without error', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('removeFoodItemFromContainer1')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await containerService.addFoodItemToContainer(containerCreated, foodItemOne)
    await containerService.addFoodItemToContainer(containerCreated, foodItemTwo)
    await containerService.addFoodItemToContainer(containerCreated, foodItemThree)
    const updatedContainer = await containerService.getContainerById(containerCreated.id)
    expect(updatedContainer).toMatchObject(containerCreated)

    const deleteContainer = await containerService.removeFoodItemFromContainer(updatedContainer, 1)
    const containerAfterDelete = await containerService.getContainerById(deleteContainer.id)
    expect(containerAfterDelete).toMatchObject(deleteContainer)
})

test('attempts to delete a food item from index out of bounds and errors', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('removeFoodItemFromContainer2')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    let errorCaught = null
    try{
    const deleteContainer = await containerService.removeFoodItemFromContainer(containerCreated, 0)
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
        const updatedContainer = await containerService.removeFoodItemFromContainer(container, 0)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the container is not in the database'))
    
})

//doesFoodItemExistInContainer
test('should create a container, add a food item to it, check to see if its there', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('doesFoodItemExist')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await containerService.addFoodItemToContainer(containerCreated, foodItemOne)
    await containerService.addFoodItemToContainer(containerCreated, foodItemTwo)
    await containerService.addFoodItemToContainer(containerCreated, foodItemThree)
    const updatedContainer = await containerService.getContainerById(containerCreated.id)
    expect(updatedContainer).toMatchObject(containerCreated)

    const existingFoodItem = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const doesExist = await containerService.doesFoodItemExistInContainer(updatedContainer, existingFoodItem)
    expect(doesExist).toBe(true)

    const foodItemNonExistant = new FoodItem('fourthFood', 'somePhotoURI', 'someQuantity', 'someDescripion', null, {})
    const doesExistTwo = await containerService.doesFoodItemExistInContainer(updatedContainer, foodItemNonExistant)
    expect(doesExistTwo).toBe(false)
})

//getFoodItemArrayFromContainedWithId
test('should create a container, add food items, and get the items an array', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('doesFoodItemExist')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await containerService.addFoodItemToContainer(containerCreated, foodItemOne)
    await containerService.addFoodItemToContainer(containerCreated, foodItemTwo)
    await containerService.addFoodItemToContainer(containerCreated, foodItemThree)
    const updatedContainer = await containerService.getContainerById(containerCreated.id)
    expect(updatedContainer).toMatchObject(containerCreated)

    const arrayExpect = [foodItemOne, foodItemTwo, foodItemThree]

    const foodItemArray = await containerService.getFoodItemArrayFromContainedWithId(containerCreated.id);
    expect(arrayExpect).toStrictEqual(foodItemArray)
})

/**
 * helper function
 * @returns {[ContainerService]}
 */
function setup(){
    initFirebase()
    const containerService = new ContainerService();
    return [containerService]
}