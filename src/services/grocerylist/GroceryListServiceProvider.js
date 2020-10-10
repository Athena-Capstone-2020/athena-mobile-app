import React, {createContext} from 'react'

export const GroceryListServiceContext = createContext(null)

export function GroceryListServiceProvider(props) {
    return (
        <GroceryListServiceContext.Provider value={{ groceryListService: props.groceryListService}}>
            {props.children}
        </GroceryListServiceContext.Provider>
    )

}