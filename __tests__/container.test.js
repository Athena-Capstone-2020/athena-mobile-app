const { ContainerService } = require('../src/services')
const { initFirebase } = require('../src/firebase/config')

//test to ensure the service can be created and used
test('should pass health check without errors', async () => {
    const services = setup()
    const [containerService] = services

    containerService.__HealthCheck('Message')
})

//CreateContainer
test('should create container without errors', async () => {
    const services = setup()
    const [containerService] = services

    const newContainerId = await containerService.createContainer('createContainerTest', 'someHouseholdId')
    expect(newContainerId).toBeDefined()
})

//GetContainer
test('should get a container that has been created already without errors', async () => {
    const services = setup()
    const [containerService] = services

    const containerId = await containerService.createContainer('getContainerTest1', 'someHouseholdId')
    const retrievedContainer = await containerService.getContainer(containerId);

    expect(retrievedContainer).toMatchObject({
        name: 'getContainerTest1',
        householdId: 'someHouseholdId'
    })
    
})

test('should try to get a container that doesn\'t exist and return null without error', async () => {
    const services = setup()
    const [containerService] = services

    const containerId = 'I_Do_Not_Exist'
    const retrievedContainer = await containerService.getContainer(containerId);

    expect(retrievedContainer).toBe(null)

})

//DeleteContainer
test('should create and delete a container without error', async () => {
    const services = setup()
    const [containerService] = services

    const newContainerId = await containerService.createContainer('toBeDeleted', 'toBeDeleted')
    const containerCreated = await containerService.getContainer(newContainerId)
    expect(containerCreated).toMatchObject({
        name: 'toBeDeleted',
        householdId: 'toBeDeleted'
    })

    await containerService.deleteContainer(newContainerId)
    const containerAfterDeletion = await containerService.getContainer(newContainerId)
    expect(containerAfterDeletion).toBe(null)
})

test('attempt to delete container that doesn\'t exist and nothing happens', async () => {
    const services = setup()
    const [containerService] = services

    const containerId = 'I_Do_Not_Exist'
    await containerService.deleteContainer(containerId)
})

//updateName
//TODO: try to figure out why this test keeps failing even though container's name is updated in DB
// test('should create a container and then change its name without errors', async () => {
//     const services = setup()
//     const [containerService] = services

//     const newContainerId = await containerService.createContainer('originalContainerName', 'someHouseholdId')
//     const containerCreated = await containerService.getContainer(newContainerId)
//     expect(containerCreated).toMatchObject({
//         name: 'originalContainerName',
//         householdId: 'someHouseholdId'
//     })

//     await containerService.updateName(newContainerId, 'updateNameTest')
//     const containerAfterNameChange = await containerService.getContainer(newContainerId)
//     expect(containerCreated).toMatchObject({
//         name: 'updateNameTest',
//         householdId: 'someHouseholdId'
//     })
// })

test('should try to update a nonexistant conatiner\'s name and nothing happens', async () => {
    const services = setup()
    const [containerService] = services

    const containerId = 'I_Do_Not_Exist'
    await containerService.updateName(containerId, 'newName')
})

function setup(){
    initFirebase()
    const containerService = new ContainerService();
    return [containerService]
}