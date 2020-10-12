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

    const newContainerId = await containerService.createContainer('someContainerName', 'someHouseholdId')
    expect(newContainerId).toBeDefined()

    console.log('the new container id is ' + newContainerId )
})

//GetContainer
test('should get a container that has been created already without errors', async () => {
    const services = setup()
    const [containerService] = services

    const containerId = 'TestContainerId'
    const retrievedContainer = await containerService.getContainer(containerId);

    expect(retrievedContainer).toMatchObject({
        name: 'someContainerName',
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

    containerService.deleteContainer(newContainerId)
    const containerAfterDeletion = await containerService.getContainer(newContainerId)
    expect(containerAfterDeletion).toBe(null)
})

test('attempt to delete container that doesn\'t exist and nothing happens', async () => {
    const services = setup()
    const [containerService] = services

    const containerId = 'I_Do_Not_Exist'
    await containerService.deleteContainer(containerId)
})

function setup(){
    initFirebase()
    const containerService = new ContainerService();
    return [containerService]
}