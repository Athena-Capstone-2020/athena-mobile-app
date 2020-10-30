import React from 'react'
import { StyleSheet } from 'react-native'

import { Text, useTheme, Icon, Button, FoodItem } from "../../components/index"
import { Box } from "../../components/Theme"

const styles = StyleSheet.create({
    container: {},
    topButtons: {},
    name: {},
    foodItems: {}
})

const Container = ({ route }) => {

    const theme = useTheme()

    const background = theme.textVariants[variant].background
    const backgroundColor = theme.colors[background]

    const fontColor = theme.textVariants[variant].text
    const color = theme.colors[fontColor]

    const { name, icon, foodItems } = route.params.container

    return (
        <Box style={styles.container}> 
            <Box style={styles.topButtons}>
                <Button
                    label='<'
                    onPress={() => navigation.navigate("ContainerListView")}
                />
                <Button
                    label='+'
                    onPress={() => { /* navigate to addItem passing containerId along as props */ }}
                />
            </Box>
            <Box style={styles.name}>
                <Text>{name}</Text>
            </Box>
            <Box style={styles.foodItems}>
                {foodItems.map(item => {
                    <FoodItem
                        key={item.id}
                        name={item.name}
                        photoURI={item.photoURI}
                        quantity={item.quantity}
                    />
                })}
            </Box>
        </Box>
    )
}

export default Container