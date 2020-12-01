import React, { useState } from 'react'
import { StyleSheet, ScrollView } from 'react-native'

import { Text, useTheme, Button, IconButton, FoodItem } from "../../components/index"
import { Box } from "../../components/Theme"

const styles = StyleSheet.create({
    container: {},
    nameBox: {
        marginTop: 30,
        flexDirection: 'row'
    },
    foodItems: {
        padding: '5%'
    },
    backButton: {
        marginLeft: -250,
        marginTop: 28,
        position: "absolute"
    },
})

const Container = ({ route, navigation }) => {

    var d = new Date()
    d.setMonth(d.getMonth() + 8)
    var d2 = new Date()
    d2.setMonth(d2.getMonth() - 1)

    const foodItems2 = [
        {
            id: "1",
            name: "Bananas",
            photoURI: "https://cdn1.sph.harvard.edu/wp-content/uploads/sites/30/2018/08/bananas-1354785_1920.jpg",
            quantity: "6",
            expires: d
        },
        {
            id: "2",
            name: "Sugar",
            photoURI: "https://cdn1.sph.harvard.edu/wp-content/uploads/sites/30/2018/08/bananas-1354785_1920.jpg",
            quantity: "1lb",
            expires: d2
        },
    ]

    const { name, icon, foodItems } = route.params.container

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <Box style={styles.container}>
                <Box style={styles.nameBox}>
                    <IconButton style={styles.backButton} variant="backButton" onPress={() => navigation.goBack()} />
                    <Text
                        style={{ marginVertical: 40, marginLeft: '20%', fontSize: 36, fontWeight: '500' }}
                    >{name}</Text>
                </Box>
                <Box style={styles.foodItems}>
                    {foodItems.map(item =>
                        <FoodItem
                            key={item.id}
                            name={item.name}
                            photoURI={item.photoURI}
                            quantity={item.quantity}
                            expires={item.expires}
                        />
                    )}
                </Box>
            </Box>
        </ScrollView>
    )
}

export default Container