import React from 'react'
import { HouseholdServiceProvider, HouseholdService } from "./src/services";

export function Provider(props) {
    const householdService = new HouseholdService()

    return (
        <HouseholdServiceProvider householdService={householdService}>
            {props.children}
        </HouseholdServiceProvider>
    )
}