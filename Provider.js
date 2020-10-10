import React from 'react'
import { HouseholdServiceProvider, HouseholdService, GroceryListServiceProvider, GroceryListService } from "./src/services";
import { initFirebase } from './src/firebase/config'

export function Provider(props) {
    initFirebase()

    const householdService = new HouseholdService()
    const groceryListService = new GroceryListService()

    return (
        <GroceryListServiceProvider groceryListService={groceryListService}>
            <HouseholdServiceProvider householdService={householdService}>
                {props.children}
            </HouseholdServiceProvider>
        </GroceryListServiceProvider>
    )
}