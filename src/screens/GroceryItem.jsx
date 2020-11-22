import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, TextInput } from 'react-native';
import { Box, Text } from '../components/index';

const GroceryItem = () => {

    const [editing, setEditing] = useState(true);
    const [value, setValue] = useState('')
    const [done, setDone] = useState(false);

    return (
        <Box>
            <Box>
                <CheckBoxButton />
            </Box>
            <Box onPress={() => setEditing(e => !e)}>
                {editing ? <TextInput onBlur={() => setEditing(false)} autoFocus value={value} onChange={(e) => setValue(e)} /> : <Text>{value}</Text>}
            </Box>
        </Box>
    )
}

export default GroceryItem;
