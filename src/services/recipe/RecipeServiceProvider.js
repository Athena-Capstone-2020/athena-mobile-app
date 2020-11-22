import React, {createContext} from 'react'

export const RecipeServiceContext = createContext(null)

export function RecipeServiceProvider(props){
    return(
        <RecipeServiceContext.Provider value={{ recipeService: props.recipeService}}>
            {props.children}
        </RecipeServiceContext.Provider>
    )
}