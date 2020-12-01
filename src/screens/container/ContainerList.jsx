import React, { useState, useEffect } from 'react'
import { Modal, ScrollView, StyleSheet } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'

import { Button, Text, Box, Input, IconButton } from '../../components/index'
import ContainerButton from './ContainerButton'
import Container from './Container'
import { withContainerService, withHouseholdService } from '../../services'
import { logError } from '../../logger/Logger'
import { useUserContext } from '../../global/user-context/useUserContext'

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
})

const ContainerStack = createStackNavigator()

const ContainerListView = ({ navigation }) => {

  const { state } = useUserContext()

  const [containerNumber, setContainerNumber] = useState(1)
  const { containerService } = withContainerService()
  const { householdService } = withHouseholdService()
  const [containers, setContainers] = useState([])
  const [containerName, setContainerName] = useState('')
  const [distributing, setDistributing] = useState(false)

  async function fetchExistingContainers() {
    try {
      if (state.household) {
        const results = await householdService.getContainersForHousehold(
          state.household.id
        )
        setContainers(results)
      }
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
        type: 'icon',
      }

      // Create a container

      //TODO: Do sometype of name validation
      if (containerName.length && state.household) {
        const newContainerId = await containerService.createContainer(
          containerName,
          icon
        )

        // Add the created container to the household
        await householdService.addContainerToHousehold(
          newContainerId,
          state.household.id
        )

        const newContainer = await containerService.getContainerById(
          newContainerId
        )
        setContainers((prevContainers) => {
          return [...prevContainers, newContainer]
        })
        setContainerNumber(containerNumber + 1)
      }
    } catch (err) {
      console.error(err)
      logError(err)
    }
  }

  useEffect(() => {
    fetchExistingContainers()
  }, [])

  return (
    <Box style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Box marginTop="xl" alignItems="center">
          {containers.map((c) => (
            <ContainerButton
              key={c.id}
              container={c}
              distributing={distributing}
            />
          ))}
          <Input
            placeholder={'Container Name'}
            style={{ marginVertical: 15 }}
            value={containerName}
            onChangeText={(newContainerName) =>
              setContainerName(newContainerName)
            }
            keyboardType={'default'}
            maxLength={25}
          />
          <Button
            onPress={handleAddContainer}
            label="Add Container"
            variant="button"
          />
        </Box>
      </ScrollView>
    </Box>
  )
}

const ContainerList = () => (
  <ContainerStack.Navigator>
    <ContainerStack.Screen
      name="ContainerListView"
      component={ContainerListView}
      options={{ headerShown: false }}
    />
    <ContainerStack.Screen
      name="Container"
      component={Container}
      options={{ headerShown: false }}
    />
  </ContainerStack.Navigator>
)

export default ContainerList
