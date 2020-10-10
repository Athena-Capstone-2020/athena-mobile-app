import React from 'react'
import { HouseholdServiceProvider, HouseholdService } from "./src/services";
import { init } from './src/firebase/config'


export function Provider(props) {
    initFirebase()

    const householdService = new HouseholdService()

    return (
        <HouseholdServiceProvider householdService={householdService}>
            {props.children}
        </HouseholdServiceProvider>
    )
}