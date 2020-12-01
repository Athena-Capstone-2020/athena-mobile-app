const {Recipe} = require('../src/models/Recipe')
const { RecipeService } = require('../src/services')
const { initFirebase } = require('../src/firebase/config')
require('dotenv').config()

test('should pass health check without errors', async () => {
    const [recipeService] = setup()
    recipeService.__HealthCheck('Message')
})

test('should query recipes based on given food names without error', async () => {
    const [ recipeService ] = setup()

    const res1 = await recipeService.queryRecipes([])
    expect(res1.length).toBe(0)

    const res2 = await recipeService.queryRecipes(['Banana'])
    expect(res2.length).toBe(1)

    const res3 = await recipeService.queryRecipes(['Banana', 'Salt'])
    expect(res3.length).toBe(3)
})

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
    const recipeService = new RecipeService()

    return [recipeService]
}