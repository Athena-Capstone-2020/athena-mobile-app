import { HouseholdServiceProvider } from "./src/services";

import { HouseholdService, HouseholdServiceProvider } from './src/services'

export function Provider(props) {
    const householdService = new HouseholdService()

    return (
        <HouseholdServiceProvider householdService={householdService}>
            {props.children}
        </HouseholdServiceProvider>
    )
}