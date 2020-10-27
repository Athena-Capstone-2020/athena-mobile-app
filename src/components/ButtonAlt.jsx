import { border } from "@shopify/restyle";
import React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Text, useTheme } from "./index";

const styles = StyleSheet.create({
    container: {
        borderRadius: 28.5,
        width: 248,
        height: 57,
        justifyContent: "center",
    },
})

const ButtonAlt = ({ label, onPress, style, variant }) => {

    const theme = useTheme();

    const background = theme.textVariants[variant].background;
    const backgroundColor = theme.colors[background];

    const fontColor = theme.textVariants[variant].text;
    const color = theme.colors[fontColor];

    return (
        <RectButton
            style={[styles.container, style ? style : "", { backgroundColor, borderWidth: 1, borderColor: color }]}
            {...{ onPress }}
        >
            <Text variant={variant} style={{ color }}>
                {label}
            </Text>
        </RectButton>
    );
};

ButtonAlt.defaultProps = { variant: "buttonAlt" }


export default ButtonAlt
