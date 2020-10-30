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
    },
    input: {
        height: 55,
        marginRight: 8,
        marginTop: 5,
        marginLeft: 20,
        // backgroundColor: "blue"
    }
})

const Input = ({ placeholder, style, value, onChangeText, maxLength }) => {

    const theme = useTheme()
    const variant = "input"

    const background = theme.textVariants[variant].background;
    const backgroundColor = theme.colors[background];

    const border = theme.textVariants[variant].border;
    const borderColor = theme.colors[border];

    const fontColor = theme.textVariants[variant].text;
    const color = theme.colors[fontColor];

    const fontFamily = theme.textVariants[variant].fontFamily;
    const fontSize = theme.textVariants[variant].fontSize;

    return (
        <Box style={style ? style : ""}>
            <Box style={[styles.searchBox, { backgroundColor, borderColor }]}>
                <TextInput
                    variant="search"
                    style={[styles.input, { color, fontFamily, fontSize }]}
                    placeholder={placeholder}
                    autoCapitalize="none"
                    returnKeyType="next"
                    returnKeyLabel="next"
                    keyboardType="number-pad"
                    value={value}
                    onChangeText={onChangeText}
                    maxLength={maxLength}
                />
            </Box>
        </Box>
    )
}

export default Input
