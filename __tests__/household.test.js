const { Person } = require("../src/models/Person")
const { PersonService, HouseholdService } = require("../src/services")
const { initFirebase } = require('../src/firebase/config')

test('should pass health check without errors', async () => {
    const services = setup()
    const [_, householdService] = services

    householdService.__HealthCheck('Message')

    teardown(services)
})

test('should be able to create a household without error', async () => {
    const services = setup()
    const [_, householdService] = services

    const newHouseholdMemberConnectionId = await householdService.addPerson('somerandomhouseholdid', 'somerandomuserid')
    expect(newHouseholdMemberConnectionId).toBeDefined()

    teardown(services)
})

function teardown(services) {
    for (const service of services) {
        service.__WARNING_CLEAR_COLLECTION()
    }
}

function setup() {
    initFirebase()
    const personService = new PersonService()
    const householdService = new HouseholdService(personService)

    return [personService, householdService]
}