import { HouseholdServiceContext } from "./HouseholdServiceProvider";

export function withHouseholdService() {
    const ctx = useContext(HouseholdServiceContext)

    if (!ctx) throw new Error('No context found')

    return ctx
}