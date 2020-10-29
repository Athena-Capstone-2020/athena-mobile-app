import React, { useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import { Box, Text, Button } from '../../components/index'
import { IconButton } from '../../components/index'
import Svg, { G, Path } from "react-native-svg"

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        alignItems: "center",
        justifyContent: "center",
    },
    image: {

    },
    name: {

    }, 
    description: {

    }
})

const ItemDescription = () => {
    return (
        <Box style={styles.container}>
            <Text>ItemDescription Screen</Text>
        </Box>
    )
}

export default ItemDescription;
