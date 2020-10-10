import React, { createContext } from 'react'

export const PersonServiceContext = createContext(null)

export function PersonServiceProvider(props) {
    return (
        <PersonServiceContext.Provider value={{ personService: props.personService }}>
            {props.children}
        </PersonServiceContext.Provider>
    )
}