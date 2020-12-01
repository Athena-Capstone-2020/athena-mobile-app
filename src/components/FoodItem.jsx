import React, { useState } from 'react'
import { StyleSheet, Image } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { Box, Text, useTheme, Card } from './index'

const styles = StyleSheet.create({
    card: {
        backgroundColor: "white",
        borderRadius: 10,
        width: '100%',
        minHeight: 75,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 5 },
        shadowOpacity: 0.3,
        shadowRadius: 4,
        zIndex: 10,
        marginBottom: 20
    },
    header: {
        flex: 1,
        flexDirection: "row"
    },
    photo: {
        width: 75,
        height: 75,
        borderTopLeftRadius: 10,
        borderBottomLeftRadius: 10
    },
    headerText: {
        padding: 14
    },
    nameBox: {
        flex: 1,
        flexDirection: "row"
    },
    name: {
        fontSize: 24,
        fontWeight: "500"
    },
    count: {
        fontSize: 24,
        fontWeight: "300",
        color: '#777'
    },
    expiresBox: {},
    expires: {},
})

const FoodItem = ({ name, photoURI, quantity, expires }) => {

    console.log(name, photoURI, quantity, expires)

    return (
        <Box style={styles.card}>
            <Box style={styles.header}>
                <Image 
                    style={styles.photo}
                    source={{ uri: photoURI }}
                />
                <Box style={styles.headerText}>
                    <Box style={styles.nameBox}>
                        <Text style={styles.name}>
                            {name || ''}
                        </Text>
                        <Text style={styles.count}>
                            {(' - ' + quantity) || ''}
                        </Text>
                    </Box>
                    <Box style={styles.expiresBox}>
                        <Text style={{ color: expires > new Date() ? 'inherit' : 'red' }}>
                            {Intl.DateTimeFormat("en-us").format(expires) || ''}
                        </Text>
                    </Box>
                </Box>
            </Box>
        </Box>
    )
    
}

export default FoodItem