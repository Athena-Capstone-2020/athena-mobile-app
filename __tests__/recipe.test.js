const {Recipe} = require('../src/models/Recipe')
const { RecipeService } = require('../src/services')
const { initFirebase } = require('../src/firebase/config')

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
    initFirebase()
    const recipeService = new RecipeService()

    return [recipeService]
}