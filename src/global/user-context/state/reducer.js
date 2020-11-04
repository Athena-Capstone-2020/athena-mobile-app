import UserContextActionTypes from './actions'

export function reducer(state, action) {
    switch (action.type) {
        case (UserContextActionTypes.FETCH_HOUSEHOLD):
            return { household: null, householdMembers: [] }
        case (UserContextActionTypes.SET_HOUSEHOLD):
            return { household: action.payload.household, householdMembers: action.payload.householdMembers }
        case (UserContextActionTypes.ERROR_OUT):
            return { household: null, householdMembers: [] }
        default:
            throw new Error(`Unhandled action: ${action} with current state of: ${state}`)
    }
}