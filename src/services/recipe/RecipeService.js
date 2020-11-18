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
            throw new Error('Not Implemented')
        }
        catch(err){
            logError(err)
            throw err
        }
    }

}