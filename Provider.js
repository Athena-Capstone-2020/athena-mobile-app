import React from 'react'
import { HouseholdServiceProvider, HouseholdService } from "./src/services";
import config from './src/components/firebase'


export function Provider(props) {
    firebase.initializeApp(config)

    const householdService = new HouseholdService()

    return (
        <HouseholdServiceProvider householdService={householdService}>
            {props.children}
        </HouseholdServiceProvider>
    )
}