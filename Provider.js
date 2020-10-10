import React from 'react'
import { HouseholdServiceProvider, HouseholdService, PersonService, PersonServiceProvider } from "./src/services";
import { initFirebase } from './src/firebase/config'


export function Provider(props) {
    initFirebase()

    const personService = new PersonService()
    const householdService = new HouseholdService(personService)

    return (
        <PersonServiceProvider personService={personService}>
            <HouseholdServiceProvider householdService={householdService}>
                {props.children}
            </HouseholdServiceProvider>
        </PersonServiceProvider>
    )
}