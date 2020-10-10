import React, { createContext } from 'react'

export const HouseholdServiceContext = createContext(null)

export function HouseholdServiceProvider(props) {
    return (
        <HouseholdServiceContext.Provider value={{ householdService: props.householdService }}>
            {props.children}
        </HouseholdServiceContext.Provider>
    )
}