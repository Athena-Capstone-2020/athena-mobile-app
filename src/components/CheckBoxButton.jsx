import React, { useState } from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Svg, { G, Path, Rect, Text, TSpan } from "react-native-svg";
import { Box } from "./index";

const styles = StyleSheet.create({
    checkBox: {
        width: 40,
        height: 40,
        borderRadius: 14,
        marginBottom: 21.4,
        flexDirection: "row"
    },
    container: {
        backgroundColor: "white",
        width: 43,
        height: 43,
        borderRadius: 14,
        marginLeft: 270,
        marginTop: 13.5
    }
})

const UncheckedIcon = () => {
    return (
        <Svg width={25} height={25} viewBox="0 0 23 23">
            <Path d="M7.667 0h7.667A7.839 7.839 0 0123 8v7a7.839 7.839 0 01-7.667 8H7.667A7.839 7.839 0 010 15V8a7.839 7.839 0 017.667-8z" />
            <Path
                d="M7.667 1C3.99 1 1 4.14 1 8v7c0 3.86 2.99 7 6.667 7h7.666C19.01 22 22 18.86 22 15V8c0-3.86-2.99-7-6.667-7H7.667m0-1h7.666C19.568 0 23 3.582 23 8v7c0 4.418-3.432 8-7.667 8H7.667C3.432 23 0 19.418 0 15V8c0-4.418 3.432-8 7.667-8z"
                fill="#d4d5da"
            />
        </Svg>
    )
}

const CheckedIcon = () => {
    return (
        <Svg width={25} height={25} viewBox="0 0 24 24">
            <Path
                data-name="Tick Square"
                d="M16.991.5h-9.97C3.122.5.5 3.237.5 7.308v9.4c0 4.055 2.622 6.792 6.521 6.792h9.97c3.898 0 6.509-2.737 6.509-6.8V7.3c0-4.063-2.611-6.8-6.509-6.8"
                fill="none"
                stroke="#fe724c"
            />
            <Path
                data-name="Tick Square"
                d="M16.492 22.35H7.519c-3.51 0-5.869-2.458-5.869-6.115V7.777c0-3.665 2.359-6.127 5.869-6.127h8.973c3.5 0 5.858 2.462 5.858 6.127v8.457c0 3.658-2.354 6.116-5.858 6.116zM8.315 11.094a.906.906 0 00-.642 1.547l2.463 2.453a.914.914 0 001.273 0l4.916-4.917a.908.908 0 00-1.283-1.283l-4.273 4.276-1.812-1.812a.9.9 0 00-.642-.264z"
                fill="#fe724c"
            />
        </Svg>
    )
}

const CheckBoxButton = ({ style, checked, onPress }) => {
    return (
        <Box style={[styles.checkBox, style ? style : {}]}>
            <RectButton onPress={onPress}>
                {checked ? <CheckedIcon /> : <UncheckedIcon />}
            </RectButton>
        </Box>
    )
}

export default CheckBoxButton;