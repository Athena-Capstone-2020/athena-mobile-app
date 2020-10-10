import React from 'react'
import { HouseholdServiceProvider, HouseholdService, GroceryListServiceProvider, GroceryListService } from "./src/services";

export function Provider(props) {
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