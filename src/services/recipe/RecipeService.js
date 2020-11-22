import {BaseService} from '../base'
import {Recipe} from '../../models'
import { log, logError} from '../../logger/Logger'

export class RecipeService extends BaseService{

    RECIPE_COLLECTION = 'DUMMY_RECIPES'

    constructor(){
        super()
    }

    /**
     * Queries recipes for any matching food items
     * @param {string[]} aryOfFoodNames the name of all foods in a container 
     * @returns {Recipe[]} array of possible recipes to be made
     */
    async queryRecipes(aryOfFoodNames){
        try{
            const cleanedNames = []
            aryOfFoodNames.forEach((name) => {
                cleanedNames.push(name.toLowerCase())
            })

            this.__UseCollection(this.RECIPE_COLLECTION)
            const collection = await this.db.where('name', '!=', '').get()
            const recipeObjs = collection.docs.map((doc) => doc.data())
            
            const res = []
            recipeObjs.forEach((recipeObj) => {
                let addToList = false
                const ingredients = recipeObj.ingredients
                ingredients.forEach( (food) => {
                    const basicName = food.substring(food.lastIndexOf('-')+2)
                    if(cleanedNames.includes(basicName))
                        addToList = true
                } )

                if(addToList){
                    const recipe = new Recipe(recipeObj.name, recipeObj.photoURI, recipeObj.ingredients, 
                        recipeObj.directions, recipeObj.servingSize, recipeObj.prepTime)
                    res.push(recipe)
                }
            } )

            return res

        }
        catch(err){
            logError(err)
            throw err
        }
    }

}