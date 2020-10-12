const { ContainerService } = require('../src/services')
const { initFirebase } = require('../src/firebase/config')

test('should pass health check without errors', async () => {
    const services = setup()
    const [containerService] = services

    containerService.__HealthCheck('Message')
})

test('should create container without errors', async () => {
    const services = setup()
    const [containerService] = services

    const newContainerId = await containerService.createContainer('someContainerName', 'someHouseholdId')
    expect(newContainerId).toBeDefined()

    console.log('the new container id is ' + newContainerId )
})

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

function setup(){
    initFirebase()
    const containerService = new ContainerService();
    return [containerService]
}