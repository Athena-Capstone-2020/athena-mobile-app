import React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { Text, useTheme } from "./index";
import {Arrow, Fridge } from './index'
import { Box } from "./Theme";

const styles = StyleSheet.create({
    button: {
        width: 323,
        height: 121.71,
        borderRadius: 18.21,
    },
    shadow: {
        width: 323,
        height: 121.71,
        borderRadius: 18.21,
        backgroundColor: "white",
        shadowColor: "#656565",
        shadowOffset: {
            width: 18.2,
            height: 18.2,
        },
        shadowOpacity: .56,
        shadowRadius: 17,
        marginBottom: 21.4,
        flexDirection: "row"
    },
    content: {
        width: 323,
        height: 121.71,
        borderRadius: 18.21,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "space-between"
    },
    fridge: {
        width: 39.622,
        height: 69.49,
        marginLeft: 17,
    },
    text: {
        width: "auto",
        height: "auto",
        position: "absolute",
        marginLeft: 74.4,
    },
    arrow: {
        width: 6.81,
        height: 11.621,
        marginRight: 32
    },
})

const ContainerButton = ({ label, onPress, style }) => {

    const theme = useTheme();

    const background = theme.textVariants["container"].background;
    const backgroundColor = theme.colors[background];

    const fontColor = theme.textVariants["container"].text;
    const color = theme.colors[fontColor];

    return (
        <Box style={styles.shadow}>
            <RectButton
                style={[styles.button, style ? style : "", { backgroundColor }]}
                {...{ onPress }}
            >
                <Box style={styles.content}>
                    <Box style={styles.fridge}>
                        <Fridge />
                    </Box>
                    <Box style={styles.text}>
                        <Text variant="container" style={{ color }}>
                            {label}'s {"\n"}Food
                    </Text>
                    </Box>
                    <Box style={styles.arrow}>
                        <Arrow style={styles.arrow} />
                    </Box>
                </Box>
            </RectButton>
        </Box>
    )
}

export default ContainerButton;
