const { GroceryListService } = require('../src/services')
const { GroceryList, FoodItem } = require('../src/models')
const { initFirebase } = require('../src/firebase/config')
require('dotenv').config()

//test to ensure the service can be created and used
test('should pass health check without errors', async () => {
    const [groceryListService] = setup()

    groceryListService.__HealthCheck('Message')
})

//createGroceryList
test('should create grocery list without errors', async () => {
    const [groceryListService] = setup()

    const createdGroceryList = await groceryListService.createGroceryList('createGroceryList', 'someOwnerId')
    expect(createdGroceryList.id).toBeDefined()
    expect(createdGroceryList.toDocument()).toMatchObject({
        name: 'createGroceryList',
        ownerId: 'someOwnerId',
        foodItems: []
    })
})

//getGroceryListById
test('should get a grocery list that has been created already without errors', async () => {
    const [groceryListService] = setup()

    const groceryListCreated = await groceryListService.createGroceryList('getGroceryListByIdTest1', 'someOwnerId')
    const retrievedGroceryList = await groceryListService.getGroceryListById(groceryListCreated.id)

    expect(retrievedGroceryList).toMatchObject(groceryListCreated)
})

test('should try to get a grocery list that does not exist and return null without error', async () => {
    const [groceryListService] = setup()

    const groceryListId = 'I_DO_NOT_EXIST'
    const retrievedGroceryList = await groceryListService.getGroceryListById(groceryListId)

    expect(retrievedGroceryList).toBe(null)
})

//deleteGroceryList
test('should create and delete a grocery list by id without error', async () => {
    const [groceryListService] = setup()

    const newGroceryList = await groceryListService.createGroceryList('toBeDeleted', 'someOwnerId')
    const groceryListCreated = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListCreated).toMatchObject(newGroceryList)

    const deletedGroceryList = await groceryListService.deleteGroceryListById(newGroceryList.id)
    expect(deletedGroceryList).toMatchObject(newGroceryList)

    const groceryListAfterDeletion = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListAfterDeletion).toBe(null)
})

test('should try to delete grocery list by id that does not exist and returns null', async () => {
    const [groceryListService] = setup()

    const groceryListId = 'I_DO_NOT_EXIST'
    const deletedGroceryList = await groceryListService.deleteGroceryListById(groceryListId)
    expect(deletedGroceryList).toBe(null)

})

test('should create and delete a grocery list by object without error', async () => {
    const [groceryListService] = setup()

    const newGroceryList = await groceryListService.createGroceryList('toBeDeleted', 'someOwnerId')
    const groceryListCreated = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListCreated).toMatchObject(newGroceryList)

    const deletedGroceryList = await groceryListService.deleteGroceryListByObject(newGroceryList)
    expect(deletedGroceryList).toMatchObject(newGroceryList)

    const groceryListAfterDeletion = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListAfterDeletion).toBe(null)
})

test('attemps to delete a container by objec that has a null is and errors', async () => {
    const [groceryListService] = setup()

    const groceryList = new GroceryList('toBeDeleted', 'someOwnerId', [])

    let errorCaught = null
    try{
        const deletedGroceryList = await groceryListService.deleteGroceryListByObject(groceryList)
    }
    catch(err){
        errorCaught = err
    }

    expect(errorCaught).toStrictEqual(new Error('the grocery list does not have an id'))
})

//updateGroceryList
test('should create and update a container without error', async () => {
    const [groceryListService] = setup()

    const newGroceryList = await groceryListService.createGroceryList('nameToBeUpdated', 'someOwnerId')
    const groceryListCreated = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListCreated).toMatchObject(newGroceryList)

    groceryListCreated.name = 'updateGroceryList'
    const updatedGroceryList = await groceryListService.updateGroceryList(groceryListCreated)
    expect(updatedGroceryList).toMatchObject(groceryListCreated)

    const groceryListAfterUpdate = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListAfterUpdate).toMatchObject(updatedGroceryList)
})

test('attempts to updated a grocery list that has a null id and errors', async () => {
    const [groceryListService] = setup()

    const groceryList = new GroceryList('toBeUpdated', 'someOwnerId', [])

    let errorCaught = null
    try{
        const updatedGroceryList = await groceryListService.updateGroceryList(groceryList)
    }
    catch(err){
        errorCaught = err
    }

    expect(errorCaught).toStrictEqual(new Error('the grocery list does not have an id'))
})

test('attempts to update a container with an id that does not exist and errors', async () => {
    const [groceryListService] = setup()

    const groceryList = new GroceryList('toBeUpdated', 'someOwnerId', [])
    groceryList.id = 'I_DO_NOT_EXIST'

    let errorCaught = null
    try{
        const updatedGroceryList = await groceryListService.updateGroceryList(groceryList)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the grocery list is not in the database'))
})

//addItemToGroceryList
test('should add a food item to grocery list with errors', async () => {
    const [groceryListService] = setup()

    const newGroceryList = await groceryListService.createGroceryList('addItemToGroceryList', 'someOwnerId')
    const groceryListCreated = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListCreated).toMatchObject(newGroceryList)

    const expireDate = new Date()
    const foodItemToAdd = new FoodItem('someFoodItemName', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const updatedGroceryList = await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemToAdd)
    const groceryListAfterUpdate = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListAfterUpdate).toMatchObject(updatedGroceryList)
})

test('attempts to add something other than food item to grocery list and errors', async () => {
    const [groceryListService] = setup()

    const newGroceryList = await groceryListService.createGroceryList('addItemToGroceryList', 'someOwnerId')
    const groceryListCreated = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListCreated).toMatchObject(newGroceryList)

    const foodItemToAdd = new Object()

    let errorCaught = null
    try{
        const updatedGroceryList = await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemToAdd)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('item is not of type FoodItem'))
})

test('attempts to add FoodItem to grocery list that does not exist and errors', async () => {
    const [groceryListService] = setup()

    const groceryList = new GroceryList('toBeUpdated', 'someOwnerId', [])
    groceryList.id = 'I_DO_NOT_EXIST'
    const expireDate = new Date()
    const foodItem = new FoodItem('name', 'photoURI', 'quantity', 'someDescription', expireDate, {})
    
    let errorCaught = null
    try{
        const updatedGroceryList = await groceryListService.updateGroceryList(groceryList)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the grocery list is not in the database'))
})

//updateItemInGroceryList
test('should update a food item in a grocery list without error', async () => {
    const [groceryListService] = setup()

    const newGroceryList = await groceryListService.createGroceryList('updateFoodItemInGroceryList1')
    const groceryListCreated = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListCreated).toMatchObject(newGroceryList)

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemOne)
    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemTwo)
    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemThree)
    const updatedGroceryList = await groceryListService.getGroceryListById(groceryListCreated.id)
    expect(updatedGroceryList).toMatchObject(groceryListCreated)

    const changedExpireDate = new Date()
    const updatedFoodItem = new FoodItem('iChanged', 'iChanged', 'iChanged', 'iChanged', changedExpireDate, {something: 'iAmAdded'})
    const updatedFoodItemGroceryList = await groceryListService.updateFoodItemInGroceryList(updatedGroceryList, 0, updatedFoodItem)
    const finalDBGroceryList = await groceryListService.getGroceryListById(updatedGroceryList.id)
    expect(finalDBGroceryList).toMatchObject(updatedFoodItemGroceryList)

})

test('attempts to update a food item in a nonexistant grocery list and errors', async () => {
    const [groceryListService] = setup()

    const groceryList = new GroceryList('name', null)
    groceryList.id = 'I_DO_NOT_EXIST'
    const foodItem = new FoodItem('dummy','dummy','dummy')

    let errorCaught = null
    try{
        const attemptToUpdate = await groceryListService.updateFoodItemInGroceryList(groceryList, 0, foodItem)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the grocery list is not in the database'))
})

test('attemps to update an item at an index that is out of bounds and errors', async () => {
    const [groceryListService] = setup()

    const newGroceryList = await groceryListService.createGroceryList('updateFoodItemInGroceryList1')
    const groceryListCreated = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListCreated).toMatchObject(newGroceryList)

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemOne)
    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemTwo)
    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemThree)
    const updatedGroceryList = await groceryListService.getGroceryListById(groceryListCreated.id)
    expect(updatedGroceryList).toMatchObject(groceryListCreated)

    const changedExpireDate = new Date()
    const updatedFoodItem = new FoodItem('iChanged', 'iChanged', 'iChanged', 'iChanged', changedExpireDate, {something: 'iAmAdded'})
    
    let errorCaught = null
    try{
        const attemptToUpdate = await groceryListService.updateFoodItemInGroceryList(updatedGroceryList, -1, updatedFoodItem)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the index is out of bounds'))
}) 

test('attempts to updated an item that is not a FoodItem type and errors', async () => {
    const [groceryListService] = setup()
    
    const groceryList = new GroceryList('name', null)
    const foodItemToAdd = new Object()

    let errorCaught = null
    try{
        const updatedGroceryList = await groceryListService.updateFoodItemInGroceryList(groceryList, 0, foodItemToAdd)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('updatedItem is not of type FoodItem'))
})

//removeItemFromGroceryList
test('should delete a food item from container without error', async () => {
    const [groceryListService] = setup()

    const newGroceryList = await groceryListService.createGroceryList('removeFoodItemInGroceryList1')
    const groceryListCreated = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListCreated).toMatchObject(newGroceryList)

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemOne)
    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemTwo)
    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemThree)
    const updatedGroceryList = await groceryListService.getGroceryListById(groceryListCreated.id)
    expect(updatedGroceryList).toMatchObject(groceryListCreated)

    const deleteGroceryList = await groceryListService.removeFoodItemFromContainer(updatedGroceryList, 1)
    const groceryListAfterDelete = await groceryListService.getGroceryListById(deleteGroceryList.id)
    expect(groceryListAfterDelete).toMatchObject(deleteGroceryList)
})

test('attempts to delete a food item from index out of bounds and errors', async () => {
    const [groceryListService] = setup()

    const newGroceryList = await groceryListService.createGroceryList('removeFoodItemInGroceryList1')
    const groceryListCreated = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListCreated).toMatchObject(newGroceryList)

    let errorCaught = null
    try{
        const attemptToUpdate = await groceryListService.removeFoodItemFromContainer(groceryListCreated, -1)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the index is out of bounds'))
})

test('attempts to delete from grocery list that does not exist and errors', async () => {
    const [groceryListService] = setup()

    const groceryList = new GroceryList('someName', null)
    groceryList.id = 'I_DO_NOT_EXIST'

    let errorCaught = null
    try{
        const attemptToUpdate = await groceryListService.removeFoodItemFromContainer(groceryList, 0)
    }
    catch(err){
        errorCaught = err
    }
    expect(errorCaught).toStrictEqual(new Error('the grocery list is not in the database'))
})

//getFoodItemArrayFromGroceryList
test('should create grocery list, add food items, and get the items an array', async () => {
    const [groceryListService] = setup()

    const newGroceryList = await groceryListService.createGroceryList('removeFoodItemInGroceryList1')
    const groceryListCreated = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListCreated).toMatchObject(newGroceryList)

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemOne)
    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemTwo)
    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemThree)
    const updatedGroceryList = await groceryListService.getGroceryListById(groceryListCreated.id)
    expect(updatedGroceryList).toMatchObject(groceryListCreated)

    const arrayExpect = [foodItemOne, foodItemTwo, foodItemThree]

    const foodItemArray = await groceryListService.getFoodItemArrayFromGroceryList(groceryListCreated.id)
    expect(foodItemArray).toStrictEqual(arrayExpect)
})

//searchItemInGroceryList
test('should create a grocery list, add food items and perform a search', async () => {
    const [groceryListService] = setup()

    const newGroceryList = await groceryListService.createGroceryList('removeFoodItemInGroceryList1')
    const groceryListCreated = await groceryListService.getGroceryListById(newGroceryList.id)
    expect(groceryListCreated).toMatchObject(newGroceryList)

    const expireDate = new Date()
    const foodItemOne = new FoodItem('firstFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemTwo = new FoodItem('secondFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})
    const foodItemThree = new FoodItem('thirdFood', 'somePhotoURI', 'someQuantity', 'someDescription', expireDate, {})

    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemOne)
    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemTwo)
    await groceryListService.addFoodItemToGroceryList(groceryListCreated, foodItemThree)
    const updatedGroceryList = await groceryListService.getGroceryListById(groceryListCreated.id)
    expect(updatedGroceryList).toMatchObject(groceryListCreated)

    const aryTest1 = [foodItemOne, foodItemThree]
    const result1 = await groceryListService.searchItemInGroceryList(updatedGroceryList.id, 'ir')
    expect(result1).toStrictEqual(aryTest1)

    const aryTest2 = [foodItemOne, foodItemTwo, foodItemThree]
    const result2 = await groceryListService.searchItemInGroceryList(updatedGroceryList.id, 'food')
    expect(result2).toStrictEqual(aryTest2)

    const aryTest3 = []
    const result3 = await groceryListService.searchItemInGroceryList(updatedGroceryList.id, 'a')
    expect(result3).toStrictEqual(aryTest3)
    
    const aryTest4 = [foodItemOne, foodItemTwo, foodItemThree]
    const result4 = await groceryListService.searchItemInGroceryList(updatedGroceryList.id, '')
    expect(result4).toStrictEqual(aryTest4)
})

/**
 * helper function
 * @returns {[GroceryListService]}
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
    const groceryListService = new GroceryListService()
    return [groceryListService]
}