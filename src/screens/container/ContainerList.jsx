import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'

import { Button, Text, Box } from '../../components/index'
import ContainerButton from './ContainerButton'
import Container from './Container'

const ContainerStack = createStackNavigator()

const ContainerListView = () => {

    const [containers, setContainers] = useState([
        { householdId: 0, name: 'Fridge', icon: { name: 'Fridge', color: '#F17A6C', type: 'icon' }, foodItems: [

        ] },
        { householdId: 1, name: 'Freezer', icon: { name: 'Fridge', color: '#30A7BE', type: 'icon' }, foodItems: [
            {
                name: 'Milk',
                photoURI: '',
                count: '2 gallons',
                expires: 'November 22nd'
            },
            {
                name: 'Bacon',
                photoURI: '',
                count: '1',
                expires: 'December 1st'
            },
            {
                name: 'Swiss Cheese Slices',
                photoURI: '',
                count: '3',
                expires: 'January 28th, 2021'
            }
        ] },
    ])
    const [distributing, setDistributing] = useState(false)
    const [adding, setAdding] = useState(false)

    useEffect(() => {
        // get containers from household
        // set containers
    })

    useEffect(() => {

    }, [adding])

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
            <Button
                onPress={() => setAdding(true)}
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