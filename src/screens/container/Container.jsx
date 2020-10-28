import React from 'react'

import { Text, useTheme, Icon, Button } from "../../components/index"
import { Box } from "../../components/Theme"

const users = ["Jeremiah", "Elias", "Blaine"];

const Container = ({ route }) => {

    const { name, icon, foodItems } = route.container

    return (
        <Box> {/* I would love for each container to have some sort of gradient background using the icon's color */}
            <Box>
                <Button>
                    {/* CHANGE Button.jsx label -> children */}
                </Button>
            </Box>
            <Box>
                {/* Back Button */}
                <Text>{name}</Text>
            </Box>
            <Box>
                {foodItems.map(item => {
                    
                })}
            </Box>
        </Box>
    )
}

export default Container;