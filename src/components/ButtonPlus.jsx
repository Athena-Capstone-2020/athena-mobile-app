import { border } from "@shopify/restyle";
import React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme, Box } from "./index";
import Svg, { G, Path, Rect } from "react-native-svg"

const styles = StyleSheet.create({
    // container: {
    //     width: 31,
    //     height: 31,
    //     justifyContent: "center",
    // },
})

const Plus = () => {
    return (
        <Svg
            width={30.598}
            height={30.598}
            viewBox="21 14 33.598 33.598"
        >
            <G filter="url(#prefix__a)">
                <Rect
                    data-name="Rectangle 4146"
                    width={30.598}
                    height={30.598}
                    rx={15.299}
                    transform="translate(22.5 15.5)"
                    fill="#fe724c"
                />
            </G>
            <G
                data-name="Group 17839"
                stroke="#fff"
                strokeLinecap="round"
                strokeWidth={1.5}
                strokeDasharray="0 0"
            >
                <Path data-name="Line 70" d="M37.309 25.433v10.731" fill="none" />
                <Path data-name="Line 71" d="M32.434 31.289h10.731" fill="#fff" />
            </G>
        </Svg>
    )
}

const ButtonPlus = ({ onPress, style }) => {
    return (
        <Box style={[styles.container, style ? style : ""]}>
            <RectButton
                underlayColor="#fff"
                {...{ onPress }}
            >
                <Plus />
            </RectButton>
        </Box>
    );
};


export default ButtonPlus;
