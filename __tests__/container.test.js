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

    const createdContainer = await containerService.createContainer('createByParams', 'someHouseholdId')
    expect(createdContainer.id).toBeDefined()
    expect(createdContainer.toDocument()).toMatchObject({
        name: 'createByParams',
        householdId: 'someHouseholdId',
        foodItems: [],
        icon: {
            name: "DefaultName",
            color: "DefaultColor",
            type: "DefaultType"
        }
    })
})

//CreateContainerWithIcon
test('should create container with custom icon without errors', async () => {
    const [containerService] = setup()

    const customIcon = {
        name: "CustomName",
        color: "CustomColor",
        type: "CustomType"
    }
    const createdContainer = await containerService.createContainerWithIcon('createByParams', 'someHouseholdId', customIcon)
    expect(createdContainer.id).toBeDefined()
    expect(createdContainer.toDocument()).toMatchObject({
        name: 'createByParams',
        householdId: 'someHouseholdId',
        foodItems: [],
        icon: {
            name: "CustomName",
            color: "CustomColor",
            type: "CustomType"
        }
    })
})

test('attempt to create container with an invalid icon', async () => {
    const [containerService] = setup()

    const customIcon = {
        attr: "Not name, color, or type"
    }
    const createdContainer = await containerService.createContainerWithIcon('createByParams', 'someHouseholdId', customIcon)
    expect(createdContainer).toBe(null)
})

//GetContainer
test('should get a container that has been created already without errors', async () => {
    const [containerService] = setup()

    const containerCreated = await containerService.createContainer('getContainerTest1', 'someHouseholdId')
    const retrievedContainer = await containerService.getContainerById(containerCreated.id);

    expect(retrievedContainer).toMatchObject(containerCreated)
    
})

test('should try to get a container that doesn\'t exist and return null without error', async () => {
    const [containerService] = setup()

    const containerId = 'I_Do_Not_Exist'
    const retrievedContainer = await containerService.getContainerById(containerId);

    expect(retrievedContainer).toBe(null)

})

//DeleteContainer
test('should create and delete a container by id without error', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('toBeDeleted', 'toBeDeleted')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const deletedContainer = await containerService.deleteContainerById(newContainer.id)
    expect(deletedContainer).toMatchObject(newContainer)

    const containerAfterDeletion = await containerService.getContainerById(newContainer.id)
    expect(containerAfterDeletion).toBe(null)
})

test('should try to delete container by id that doesn\'t exist', async () => {
    const [containerService] = setup()

    const containerId = 'I_Do_Not_Exist'
    const deletedContainer = await containerService.deleteContainerById(containerId)
    expect(deletedContainer).toBe(null)

})

test('should create and delete a container by object without error', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('toBeDeleted', 'toBeDeleted')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const deletedContainer = await containerService.deleteContainerByObject(newContainer)
    expect(deletedContainer).toMatchObject(newContainer)

    const containerAfterDeletion = await containerService.getContainerById(newContainer.id)
    expect(containerAfterDeletion).toBe(null)

})

test('should try to delete a container by object that has a null id', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', 'toBeDeleted', [], defaultIcon)
    const deletedContainer = await containerService.deleteContainerByObject(container)
    expect(deletedContainer).toBe(null)
})

//updateContainer
test('should create and update a container without error', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('nameToBeUpdated', 'someHouseholdId')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    containerCreated.name = 'updateContainer'
    const updatedContainer = await containerService.updateContainer(containerCreated)
    expect(updatedContainer).toMatchObject(containerCreated)

    const containerAfterUpdate = await containerService.getContainerById(newContainer.id)
    expect(containerAfterUpdate).toMatchObject(updatedContainer)

})

test('should try to update a container that has a null id and nothing happens', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', 'toBeDeleted', [], defaultIcon)
    const updatedContainer = await containerService.updateContainer(container)
    expect(updatedContainer).toBe(null)
})

test('should try to update a container with an id that doesn\'t exist and nothing happens', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', 'toBeDeleted',[], defaultIcon)
    container.id = 'I_Do_Not_Exist'
    const updatedContainer = await containerService.updateContainer(container)
    expect(updatedContainer).toBe(null)
})

//addFoodItemToContainer
test('should add a food item to a container without errors', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('addItemToContainer1', 'someHouseholdId')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const foodItemToAdd = new FoodItem('someFoodItemName', 'somePhotoURI', 'someQuantity')
    const updatedContainer = await containerService.addFoodItemToContainer(containerCreated, foodItemToAdd)
    const containerAfterUpdate = await containerService.getContainerById(newContainer.id)
    expect(containerAfterUpdate).toMatchObject(updatedContainer)
})

test('attempt to send something other than food item without errors', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('addItemToContainer2', 'someHouseholdId')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const foodItemToAdd = new Object()
    const updatedContainer = await containerService.addFoodItemToContainer(containerCreated, foodItemToAdd)
    expect(updatedContainer).toBe(null)
})

test('attempt to send container that doesn\'t exist without error', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', 'toBeDeleted',[], defaultIcon)
    container.id = 'I_Do_Not_Exist'
    const foodItem = new FoodItem('name', 'photoURI', 'quantity')

    const updatedContainer = await containerService.addFoodItemToContainer(container, foodItem)
    expect(updatedContainer).toBe(null)
})

//updateFoodItemInContainer
test('create container, add some food items, and update one without error', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('updateFoodItemInContainer1', 'someHouseholdId')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity')
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity')
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity')

    await containerService.addFoodItemToContainer(containerCreated, foodItemOne)
    await containerService.addFoodItemToContainer(containerCreated, foodItemTwo)
    await containerService.addFoodItemToContainer(containerCreated, foodItemThree)
    const updatedContainer = await containerService.getContainerById(containerCreated.id)
    expect(updatedContainer).toMatchObject(containerCreated)

    const updatedFoodItem = new FoodItem('iChanged', 'iChanged', 'iChanged')
    const updatedFoodItemContainer = await containerService.updateFoodItemInContainer(updatedContainer, 0, updatedFoodItem)
    const finalDBContainer = await containerService.getContainerById(updatedContainer.id)
    expect(finalDBContainer).toMatchObject(updatedFoodItemContainer)
    
})

test('attempt to update an item in a container that doesn\'t exist without error', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', 'toBeDeleted',[], defaultIcon)
    const foodItem = new FoodItem('dummy', 'dummy', 'dummy')

    const updatedContainer = await containerService.updateFoodItemInContainer(container, 0, foodItem)
    expect(updatedContainer).toBe(null)
    
})

test('attempt to update an item at an index that is out of bounds', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('updateFoodItemInContainer2', 'someHouseholdId')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity')
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity')
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity')

    await containerService.addFoodItemToContainer(containerCreated, foodItemOne)
    await containerService.addFoodItemToContainer(containerCreated, foodItemTwo)
    await containerService.addFoodItemToContainer(containerCreated, foodItemThree)
    const updatedContainer = await containerService.getContainerById(containerCreated.id)
    expect(updatedContainer).toMatchObject(containerCreated)

    const updatedFoodItem = new FoodItem('iChanged', 'iChanged', 'iChanged')
    const updatedFoodItemContainer = await containerService.updateFoodItemInContainer(updatedContainer, -1, updatedFoodItem)
    expect(updatedFoodItemContainer).toBe(null)
})

test('attempt to update an item that is not a FoodItem type', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', 'toBeDeleted',[], defaultIcon)
    const foodItem = new Object()
    const updatedContainer = await containerService.updateFoodItemInContainer(container, 0, foodItem)
    expect(updatedContainer).toBe(null)
})

test('attempt to update food item at index = ary.length', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('updateFoodItemInContainer3', 'someHouseholdId')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const foodItemToAdd = new FoodItem('someFoodItemName', 'somePhotoURI', 'someQuantity')
    const updatedContainer = await containerService.updateFoodItemInContainer(containerCreated, 0, foodItemToAdd)
    const containerAfterUpdate = await containerService.getContainerById(newContainer.id)
    expect(containerAfterUpdate).toMatchObject(updatedContainer)
})

//removeItemFromContainer
test('should create a container, add a food item to it, then delete the food item without error', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('removeFoodItemFromContainer1', 'someHouseholdId')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity')
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity')
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity')

    await containerService.addFoodItemToContainer(containerCreated, foodItemOne)
    await containerService.addFoodItemToContainer(containerCreated, foodItemTwo)
    await containerService.addFoodItemToContainer(containerCreated, foodItemThree)
    const updatedContainer = await containerService.getContainerById(containerCreated.id)
    expect(updatedContainer).toMatchObject(containerCreated)

    const deleteContainer = await containerService.removeFoodItemFromContainer(updatedContainer, 1)
    const containerAfterDelete = await containerService.getContainerById(deleteContainer.id)
    expect(containerAfterDelete).toMatchObject(deleteContainer)
})

test('attempt to delete a food item from an index that doesn\'t exist', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('removeFoodItemFromContainer2', 'someHouseholdId')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const deleteContainer = await containerService.removeFoodItemFromContainer(containerCreated, 0)
    expect(deleteContainer).toBe(null)
})

test('attempt to delete from a container that doesn\'t exist', async () => {
    const [containerService] = setup()

    const defaultIcon = {
        name: "DefaultName",
        color: "DefaultColor",
        type: "DefaultType"
    }
    const container = new Container('toBeDeleted', 'toBeDeleted',[], defaultIcon)

    const updatedContainer = await containerService.removeFoodItemFromContainer(container, 0)
    expect(updatedContainer).toBe(null)
    
})

//doesFoodItemExistInContainer
test('should create a container, add a food item to it, check to see if its there', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('doesFoodItemExist', 'someHouseholdId')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity')
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity')
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity')

    await containerService.addFoodItemToContainer(containerCreated, foodItemOne)
    await containerService.addFoodItemToContainer(containerCreated, foodItemTwo)
    await containerService.addFoodItemToContainer(containerCreated, foodItemThree)
    const updatedContainer = await containerService.getContainerById(containerCreated.id)
    expect(updatedContainer).toMatchObject(containerCreated)

    const doesExist = await containerService.doesFoodItemExistInContainer(updatedContainer, foodItemThree)
    expect(doesExist).toBe(true)

    const foodItemNonExistant = new FoodItem('fourthFood', 'somePhotoURI', 'someQuantity')
    const doesExistTwo = await containerService.doesFoodItemExistInContainer(updatedContainer, foodItemNonExistant)
    expect(doesExistTwo).toBe(false)
})

//getFoodItemArrayFromContainedWithId
test('should create a container, add food items, and get the items an array', async () => {
    const [containerService] = setup()

    const newContainer = await containerService.createContainer('doesFoodItemExist', 'someHouseholdId')
    const containerCreated = await containerService.getContainerById(newContainer.id)
    expect(containerCreated).toMatchObject(newContainer)

    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity')
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity')
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity')

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