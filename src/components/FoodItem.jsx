import React, { useState } from 'react'
import { StyleSheet } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'

import { Box, Text, useTheme } from './index'

const styles = StyleSheet.create({
    card: {},
    header: {},
    photo: {},
    headerText: {},
    nameBox: {},
    name: {},
    count: {},
    expiresBox: {},
    expires: {},

    details: {},
    detailsDivider: {},
})

const FoodItem = ({ name, photoURI, quantity, expires }) => {

    const [open, setOpen] = useState(false)

    return (
        <RectButton style={styles.card} onPress={() => setOpen(o => !o)}>
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
                            {quantity || ''}
                        </Text>
                    </Box>
                    <Box style={styles.expiresBox}>
                        <Text style={styles.expires}>
                            {expires || ''}
                        </Text>
                    </Box>
                </Box>
            </Box>
            { open ?
                <Box style={styles.details}>
                    <Box style={styles.detailsDivider}/>
                    <Box>
                        <Text>
                            Details
                        </Text>
                    </Box>
                </Box>
            : null }
        </RectButton>
    )
    
}

export default FoodItem