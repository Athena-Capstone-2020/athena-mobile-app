import React from 'react'
import { HouseholdServiceProvider, HouseholdService, GroceryListServiceProvider, GroceryListService, 
         ContainerServiceProvider, ContainerService, PersonService, PersonServiceProvider } from "./src/services";
import { initFirebase } from './src/firebase/config'
import { initSentry } from './src/sentry/config'

export function Provider(props) {
    initFirebase()
    initSentry()

    const groceryListService = new GroceryListService()
    const containerService = new ContainerService()
    const personService = new PersonService()
    const householdService = new HouseholdService(personService, containerService)

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