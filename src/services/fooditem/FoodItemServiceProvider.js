import React, {createContext} from 'react'

export const FoodItemServiceContext = createContext(null)

export function FoodItemServiceProvider(props){
    return (
        <FoodItemServiceContext.Provider value={{foodItemService: props.foodItemService}}>
            {props.children}
        </FoodItemServiceContext.Provider>
    )
}