import { HouseholdService } from '../../../services'

const UserContextActions = {
    FETCH_HOUSEHOLD: 'FETCH_HOUSEHOLD',
    SET_HOUSEHOLD: 'SET_HOUSEHOLD',
    ERROR_OUT: 'ERROR_OUT'
}

export class UserContextActionHandler {
    /**
     * 
     * @param {HouseholdService} householdService 
     * @param {*} state 
     * @param {*} dispatch 
     */
    constructor(householdService, state, dispatch) {
        this.householdService = householdService
        this.state = state
        this.__dispatch = dispatch
    }

    async setHousehold(householdId) {
        this.__dispatch({ type: UserContextActions.FETCH_HOUSEHOLD })
        try {
            const household = await this.householdService.getHouseholdById(householdId)
            const householdMembersRef = await this.householdService.listHousehold(householdId)
            const householdMembers = householdMembersRef.map((householdMemberRef) => ({ id: householdMemberRef.id, ...householdMemberRef.data }))

            this.__dispatch({ type: UserContextActions.SET_HOUSEHOLD, payload: { household: { id: householdId, ...household }, householdMembers } })
        } catch (error) {
            console.error(error)
            this.__dispatch({ type: UserContextActions.ERROR_OUT, payload: { error } })
        }
    }

    async __healthCheck(message) {
        console.log(`Health Check for User Context: ${message}`)
    }
}

export default UserContextActions