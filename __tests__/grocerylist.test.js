const { GroceryListService } = require('../src/services')
const { GroceryList, FoodItem } = require('../src/models')
const { initFirebase } = require('../src/firebase/config')

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

//addItemToGroceryList
//updateItemInGroceryList
//removeItemFromGroceryList
//getItemFromGroceryList

/**
 * helper function
 * @returns {[GroceryListService]}
 */
function setup(){
    initFirebase()
    const groceryListService = new GroceryListService()
    return [groceryListService]
}