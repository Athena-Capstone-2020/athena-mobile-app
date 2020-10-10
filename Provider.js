import React from 'react'
import { HouseholdServiceProvider, HouseholdService, GroceryListServiceProvider, GroceryListService, 
         ContainerServiceProvider, ContainerService } from "./src/services";
import { initFirebase } from './src/firebase/config'

export function Provider(props) {
    initFirebase()

    const householdService = new HouseholdService()
    const groceryListService = new GroceryListService()
    const containerService = new ContainerService()

    return (
        <ContainerServiceProvider containerService={containerService}>    
            <GroceryListServiceProvider groceryListService={groceryListService}>
                <HouseholdServiceProvider householdService={householdService}>
                    {props.children}
                </HouseholdServiceProvider>
            </GroceryListServiceProvider>
        </ContainerServiceProvider>
    )
}