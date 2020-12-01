import React from 'react'
import { HouseholdServiceProvider, HouseholdService, GroceryListServiceProvider, GroceryListService, 
         ContainerServiceProvider, ContainerService, PersonService, PersonServiceProvider, BarcodeServiceProvider, BarcodeService,
         RecipeServiceProvider, RecipeService } from "./src/services";
import { initFirebase } from './src/firebase/config'
import { initSentry } from './src/logger/sentry/config'
import { UserContextProvider } from './src/global/user-context'
import Constants from 'expo-constants'

export function Provider(props) {
    initFirebase(Constants.manifest.extra.FIREBASE_CONFIG)
    initSentry(Constants.manifest.extra.SENTRY_CONFIG)

    const groceryListService = new GroceryListService()
    const containerService = new ContainerService()
    const personService = new PersonService()
    const householdService = new HouseholdService(personService, containerService, groceryListService)
    const barcodeService = new BarcodeService(Constants.manifest.extra.BARCODE_LOOKUP_API_KEY)
    const recipeService = new RecipeService()

    return (
        <RecipeServiceProvider recipeService={recipeService}>
            <PersonServiceProvider personService={personService}>
                <ContainerServiceProvider containerService={containerService}>    
                    <GroceryListServiceProvider groceryListService={groceryListService}>
                        <HouseholdServiceProvider householdService={householdService}>
                            <BarcodeServiceProvider barcodeService={barcodeService}>
                                <UserContextProvider initState={{ household: null, householdMembers: [] }}>
                                    {props.children}
                                </UserContextProvider>
                            </BarcodeServiceProvider>
                        </HouseholdServiceProvider>
                    </GroceryListServiceProvider>
                </ContainerServiceProvider>
            </PersonServiceProvider>
        </RecipeServiceProvider>
    )
}