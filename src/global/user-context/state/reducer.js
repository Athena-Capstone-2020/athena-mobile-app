import UserContextActionTypes from './actions'

export function reducer(state, action) {
    switch (action.type) {
        case (UserContextActionTypes.FETCH_HOUSEHOLD):
            return { household: null, householdMembers: [], user: state.user }
        case (UserContextActionTypes.SET_HOUSEHOLD):
            return { household: action.payload.household, householdMembers: action.payload.householdMembers, user: state.user }
        case (UserContextActionTypes.FETCH_USER):
            return { ...state, user: null }
        case (UserContextActionTypes.SET_USER):
            return { ...state, user: action.payload.user }
        case (UserContextActionTypes.ERROR_OUT):
            return { household: null, householdMembers: [], user: state.user }
        default:
            throw new Error(`Unhandled action: ${action} with current state of: ${state}`)
    }
}