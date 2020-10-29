import React from 'react'
import { HouseholdServiceProvider, HouseholdService, GroceryListServiceProvider, GroceryListService, 
         ContainerServiceProvider, ContainerService, PersonService, PersonServiceProvider, BarcodeServiceProvider, BarcodeService } from "./src/services";
import { initFirebase } from './src/firebase/config'
import { initSentry } from './src/logger/sentry/config'
import Constants from 'expo-constants'

export function Provider(props) {
    initFirebase()
    initSentry()

    const groceryListService = new GroceryListService()
    const containerService = new ContainerService()
    const personService = new PersonService()
    const householdService = new HouseholdService(personService, containerService)
    const barcodeService = new BarcodeService(Constants.manifest.extra.BARCODE_LOOKUP_API_KEY)

    return (
        <PersonServiceProvider personService={personService}>
            <ContainerServiceProvider containerService={containerService}>    
                <GroceryListServiceProvider groceryListService={groceryListService}>
                    <HouseholdServiceProvider householdService={householdService}>
                        <BarcodeServiceProvider barcodeService={barcodeService}>
                            {props.children}
                        </BarcodeServiceProvider>
                    </HouseholdServiceProvider>
                </GroceryListServiceProvider>
            </ContainerServiceProvider>
        </PersonServiceProvider>
    )
}