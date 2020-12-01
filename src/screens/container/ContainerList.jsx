import React, { useState, useEffect } from 'react'
import { Modal, ScrollView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { Button, Text, Box, Input } from '../../components/index'
import ContainerButton from './ContainerButton'
import Container from './Container'
import { withContainerService, withHouseholdService } from '../../services'
import {logError} from '../../logger/Logger'
import { useUserContext } from '../../global/user-context'

const ContainerStack = createStackNavigator()

const ContainerListView = () => {

    const { state } = useUserContext()
    console.log("UC:", state)

    const { containerService } = withContainerService()
    const { householdService } = withHouseholdService()
    const [containers, setContainers] = useState([])
    const [distributing, setDistributing] = useState(false)

    const [addingContainer, setAddingContainer] = useState(false)
    const [containerName, setContainerName] = useState('')

    async function fetchExistingContainers() {
        try {
            const results = await householdService.getContainersForHousehold(state.household.id)
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
                return [...prevContainers, newContainer]
            })
        } catch (err) {
            console.error(err)
            logError(err)
        }
    }

    useEffect(() => {
        fetchExistingContainers()
    }, [])

    return (
        <>
            <Box flex={1} position='absolute' top={0} bottom={0} left={0} right={0}>
                <Modal
                    animationType="slide"
                    transparent
                    visible={addingContainer}
                >
                    <Box>
                        <ScrollView horizontal>
                            {/* Colors */}
                        </ScrollView>
                        <ScrollView horizontal>
                            {/* Icons */}
                        </ScrollView>
                        <Input
                            placeholder={'Container Name'}
                            style={{ marginVertical: 15 }}
                            value={containerName}
                            onChangeText={(newContainerName) => setContainerName(newContainerName)}
                            keyboardType={'default'}
                            maxLength={25}
                        />
                    </Box>
                </Modal>
            </Box>
            <ScrollView showsVerticalScrollIndicator={false}>
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
                    <Button
                        onPress={() => setAddingContainer(true)}
                        label="Add Container"
                        variant="button"
                    />
                </Box>
            </ScrollView>
        </>
    )
}

const ContainerList = () => 
    <ContainerStack.Navigator>
        <ContainerStack.Screen name="ContainerListView" component={ContainerListView} options={{ headerShown: false }} />
        <ContainerStack.Screen name="Container" component={Container} options={{ headerShown: false }}/>
    </ContainerStack.Navigator>

export default ContainerList;