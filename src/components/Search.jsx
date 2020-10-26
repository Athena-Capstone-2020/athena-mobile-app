import React from 'react'
import { Box, useTheme, Text } from './index'
import { TextInput, StyleSheet } from "react-native";
import Svg, { G, Path, Circle } from "react-native-svg"

const styles = StyleSheet.create({
    searchBox: {
        width: 290,
        height: 51,
        borderWidth: 1,
        borderRadius: 10,
    },
    input: {
        height: 40,
        marginRight: 5,
        marginTop: 5,
        marginLeft: 48.1,
    },
    searchIcon: {
        width: 17.228,
        height: 17.405,
        marginTop: 18,
        marginLeft: 20,
        position: "absolute"
    }
})

const SearchIcon = () => {
    return (
        <Svg width={17.228} height={17.405} viewBox="0 0 17.228 17.405">
            <G
                transform="translate(-.028 -.028)"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeMiterlimit={10}
            >
                <Path
                    d="M12.312 12.665l2.648 2.516.883.839"
                    fill="#434b67"
                    stroke="#434b67"
                    strokeWidth={2}
                />
                <Circle
                    cx={6.802}
                    cy={6.802}
                    r={6.802}
                    transform="translate(.778 .778)"
                    fill="none"
                    stroke="#767f9d"
                    strokeWidth={1.5}
                />
            </G>
        </Svg>
    )
}

const Search = ({ placeholder, style }) => {

    const theme = useTheme()
    const variant = "search"

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
                    style={[styles.input, { color, fontFamily, fontSize}]}
                    placeholder={placeholder}
                    autoCapitalize="none"
                    returnKeyType="next"
                    returnKeyLabel="next"

                />
            </Box>
            <Box style={styles.searchIcon}>
                <SearchIcon />
            </Box>
        </Box>
    )
}

export default Search
