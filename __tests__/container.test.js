const { ContainerService } = require('../src/services')
const { initFirebase } = require('../src/firebase/config')

test('should pass health check without errors', async () => {
    const services = setup()
    const [containerService] = services

    containerService._HealthCheck('Message')

    teardown(services)
})

function setup(){
    initFirebase()
    const containerService = new ContainerService();

    return [containerService]
}

function teardown(services) {
    for (const service of services){
        service._WARNING_CLEAR_COLLECTION()
    }
}