import React from 'react'
import { StyleSheet } from 'react-native';
import { Box, Text, Search } from '../../components/index'
import { IconButton } from '../../components/index'

const styles = StyleSheet.create({
    screenName: {
        marginBottom: 12,
    },
});

const AddItem = () => {
    return (
        <Box style={styles.container} marginTop="xl" alignItems="center">
            <Text variant="header" style={styles.screenName}>Add Item</Text>
            <Search
                placeholder="Search Food Items"
            />
            <IconButton
                onPress={() => { }}
            />
        </Box>

    )
}

export default AddItem;