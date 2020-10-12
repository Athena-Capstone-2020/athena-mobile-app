const { FoodItemService } = require('../src/services')
const { initFirebase } = require('../src/firebase/config')

//test to ensure the service can be created and used
test('should pass health check without errors', async() => {
    const services = setup()
    const[foodItemService] = services

    foodItemService.__HealthCheck('Message')
})

function setup(){
    initFirebase()
    const foodItemService = new FoodItemService()
    return [foodItemService]
}