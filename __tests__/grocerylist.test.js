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
//deleteGroceryListById
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