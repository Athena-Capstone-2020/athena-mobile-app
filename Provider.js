import React from 'react'
import { HouseholdServiceProvider, HouseholdService, GroceryListServiceProvider, GroceryListService, 
         ContainerServiceProvider, ContainerService, PersonService, PersonServiceProvider } from "./src/services";
import { initFirebase } from './src/firebase/config'
import { initSentry } from './src/sentry/config'

export function Provider(props) {
    initFirebase()
    initSentry()

    const householdService = new HouseholdService()
    const groceryListService = new GroceryListService()
    const containerService = new ContainerService()
    const personService = new PersonService()

    return (
        <PersonServiceProvider personService={personService}>
            <ContainerServiceProvider containerService={containerService}>    
                <GroceryListServiceProvider groceryListService={groceryListService}>
                    <HouseholdServiceProvider householdService={householdService}>
                        {props.children}
                    </HouseholdServiceProvider>
                </GroceryListServiceProvider>
            </ContainerServiceProvider>
        </PersonServiceProvider>
    )
}