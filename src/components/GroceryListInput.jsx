import React from 'react'
import { Box, useTheme, Text } from './index'
import { TextInput, StyleSheet, Dimensions } from "react-native";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    searchBox: {
        width: windowWidth - 64,
        height: 65,
        borderWidth: 1,
        borderRadius: 10,
    }
})

const GroceryListInput = ({ autoFocus, onBlur, onPress, placeholder, style, value, onChangeText, maxLength, keyboardType = "default" }) => {

    const theme = useTheme()
    const variant = "groceryListItemCompleted"

    const fontColor = theme.textVariants[variant].text;
    const color = theme.colors[fontColor];

    const fontFamily = theme.textVariants[variant].fontFamily;
    const fontSize = theme.textVariants[variant].fontSize;

    return (
        <Box style={style ? style : ""}>
            <TextInput
                variant="groceryListItem"
                style={[{ color, fontFamily, fontSize }]}
                placeholder={placeholder}
                autoCapitalize="none"
                returnKeyType="next"
                returnKeyLabel="next"
                keyboardType={keyboardType}
                value={value}
                onChangeText={onChangeText}
                maxLength={maxLength}
                autoFocus={autoFocus}
                onBlur={onBlur}
                onPress={onPress}
            />
        </Box>
    )
}

export default GroceryListInput