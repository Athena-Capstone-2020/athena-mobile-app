import React, { useReducer, createContext } from "react";
import { withHouseholdService } from '../../services'
import { reducer as userContextReducer } from './state/reducer'
import { UserContextActionHandler } from './state/actions'
import { initialUserContextState } from './state/state'

export const UserContext = createContext(null)

export function UserContextProvider({ children, initState = initialUserContextState }) {
    const { householdService } = withHouseholdService()
    const [state, dispatch] = useReducer(userContextReducer, initState)

    const userContextActionHandler = new UserContextActionHandler(householdService, state, dispatch)

    return (
        <UserContext.Provider value={{ actions: userContextActionHandler, state }}>
            {children}
        </UserContext.Provider>
    )
}