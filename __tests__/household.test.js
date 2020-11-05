const { Person } = require("../src/models/Person")
const { PersonService, HouseholdService, ContainerService } = require("../src/services")
const { initFirebase } = require('../src/firebase/config')
const uuid = require('uuid')

test('should pass health check without errors', async () => {
    const services = setup()
    const [_, householdService] = services

    householdService.__HealthCheck('Message')
})

test('should be able to create a household without error', async () => {
    const services = setup()
    const [_, householdService] = services

    const newHouseholdMemberConnectionId = await householdService.addPerson('somerandomhouseholdid', 'somerandomuserid')
    expect(newHouseholdMemberConnectionId).toBeDefined()
})

test('should be able to create and query the members of that household', async () => {
    const services = setup()
    const [_, householdService] = services

    const household1Id = uuid.v4()
    const household2Id = uuid.v4()
    const person1Id = uuid.v4()
    const person2Id = uuid.v4()
    const person3Id = uuid.v4()

    await householdService.addPerson(household1Id, person1Id)
    await householdService.addPerson(household1Id, person2Id)
    await householdService.addPerson(household2Id, person3Id)

    const household1List = await householdService.listHousehold(household1Id)
    const household2List = await householdService.listHousehold(household2Id)

    expect(household1List.length).toBe(2)
    expect(household2List.length).toBe(1)
})

test('should be able to query households a person is a part of', async () => {
    const services = setup()
    const [_, householdService] = services

    const person1Id = uuid.v4()

    const household1Id = await householdService.createHousehold('Household 1')
    const household2Id = await householdService.createHousehold('Household 2')
    await householdService.createHousehold('Household 3')

    await householdService.addPerson(household1Id, person1Id)
    await householdService.addPerson(household2Id, person1Id)

    const households = await householdService.findHouseholdForPerson(person1Id)

    expect(households.length).toBe(2)
})

test('should be able to add and remove people from a household', async () => {
    const services = setup()
    const [_, householdService] = services

    const person1Id = uuid.v4()
    const person2Id = uuid.v4()
    const household1Id = uuid.v4()

    await householdService.addPerson(household1Id, person1Id)
    await householdService.addPerson(household1Id, person2Id)
    await householdService.removePerson(household1Id, person1Id)

    const members = await householdService.listHousehold(household1Id)

    expect(members.length).toBe(1)
    expect(members[0].id).toBe(person2Id)
})

test('should be able to add a container to a household', async () => {
    const [_, householdService, containerService] = setup()

    const householdId = await householdService.createHousehold('Household 1')
    const { id: containerId } = await containerService.createContainer('Fridge')

    await householdService.addContainerToHousehold(containerId, householdId)

    const containersForHousehold = await householdService.getContainersForHousehold(householdId)

    expect(containersForHousehold.length).toBe(1)
})

/**
 * @returns {[PersonService, HouseholdService, ContainerService]}
 */
function setup() {
    initFirebase()
    const personService = new PersonService()
    const containerService = new ContainerService()
    const householdService = new HouseholdService(personService, containerService)

    return [personService, householdService, containerService]
}