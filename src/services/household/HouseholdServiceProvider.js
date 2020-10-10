import { createContext, useContext } from 'react'

const HouseholdServiceContext = createContext(null)

export function HouseholdServiceProvider(props) {
    return (
        <HouseholdServiceContext.Provider value={props.householdService}>
            {props.children}
        </HouseholdServiceContext.Provider>
    )
}

export function withHouseholdService() {
    if (!HouseholdServiceContext) throw new Error('No context found')

    return useContext(HouseholdServiceContext)
}