import React, { useState, useEffect } from 'react'
import { Button, Text, Box } from '../../components/index'
import ContainerButton from './ContainerButton'

const ContainerList = () => {

    const [containers, setContainers] = useState([
        { id: 0, label: 'Fridge', icon: 'Fridge', color: '#00AAAA' },
        { id: 1, label: 'Freezer', icon: 'Fridge', color: '#0000FF' },
        { id: 2, label: 'Blaine\'s Food', icon: 'User', color: '#333300' },
        { id: 3, label: 'Pantry', icon: 'ArrowRight', color: '#330000' }
    ])
    const [distributing, setDistributing] = useState(false)

    useEffect(() => {
        // get containers from household
        // set containers
    })

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
                onPress={() => {}}
                label="Add Container"
                variant="button"
            />
        </Box>
    )
}

export default ContainerList;