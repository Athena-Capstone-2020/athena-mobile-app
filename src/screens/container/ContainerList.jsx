import React from 'react'
import { Button, Text, Box } from '../../components/index'
import Container from './Container'

const ContainerList = () => {
    return (
        <Box marginTop="xl" alignItems="center">
            <Text variant="header" style={{marginBottom: 12}}>Containers</Text>
            <Container/>
            <Button
                onPress={() => {}}
                label="Add Container"
                variant="button"
            />
        </Box>
    )
}

export default ContainerList;