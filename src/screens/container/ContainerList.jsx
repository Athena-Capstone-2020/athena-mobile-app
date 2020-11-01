import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Button, Text, Box, Input } from '../../components/index'
import ContainerButton from './ContainerButton'
import Container from './Container'
import { withContainerService, withHouseholdService } from '../../services'
import {logError} from '../../logger/Logger'

const ContainerStack = createStackNavigator()

const ContainerListView = () => {
    const { containerService } = withContainerService()
    const { householdService } = withHouseholdService()
    const [containers, setContainers] = useState([])
    const [distributing, setDistributing] = useState(false)
    const [containerName, setContainerName] = useState('')

    async function fetchExistingContainers() {
        try {
            const results = await householdService.getContainersForHousehold('ReyesHousehold')
            setContainers(results)
        } catch (err) {
            console.error(err)
            logError(err)
        }
    }

    async function handleAddContainer() {
        try {
            // Create icon
            const icon = {
                name: 'Fridge',
                color: '#30A7BE',
                type: 'icon'
            }

            // Create a container
            const newContainer = await containerService.createContainer(containerName, 'ReyesHousehold', icon)
    
            // Add the created container to the household
            await householdService.addContainerToHousehold(newContainer.id, 'ReyesHousehold')

            setContainers((prevContainers) => {
                prevContainers.push(newContainer)
                return prevContainers
            })
        } catch (err) {
            console.error(err)
            logError(err)
        }
    }

    /**
     * On Screen load the first time
     */
    useEffect(() => {
        fetchExistingContainers()
    }, [])

    return (
        <Box marginTop="xl" alignItems="center">
            {
                containers.map(c => 
                    <ContainerButton
                        key={c.id}
                        container={c}
                        distributing={distributing}
                    />
                )
            }
            <Input
                placeholder={'Container Name'}
                style={{ marginVertical: 15 }}
                value={containerName}
                onChangeText={(newContainerName) => setContainerName(newContainerName)}
                keyboardType={'default'}
                maxLength={25}
            />
            <Button
                onPress={handleAddContainer}
                label="Add Container"
                variant="button"
            />
        </Box>
    )
}

const ContainerList = () => 
    <ContainerStack.Navigator>
        <ContainerStack.Screen name="ContainerListView" component={ContainerListView} options={{ headerShown: false }} />
        <ContainerStack.Screen name="Container" component={Container} options={{ headerShown: false }}/>
    </ContainerStack.Navigator>

export default ContainerList;