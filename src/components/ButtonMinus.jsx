import { border } from "@shopify/restyle";
import React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import { useTheme, Box } from "./index";
import Svg, { G, Path, Rect, TSpan, Text } from "react-native-svg"

const Minus = () => {
    return (
        <Svg
            width={30.598}
            height={30.598}
            viewBox="43 23 33.598 33.598"
        >
            <G filter="url(#prefix__a)">
                <G
                    data-name="Rectangle 4146"
                    transform="translate(45 25)"
                    fill="none"
                    stroke="#fe724c"
                    strokeDasharray="0 0"
                >
                    <Rect width={30.598} height={30.598} rx={15.299} stroke="none" />
                    <Rect x={0.5} y={0.5} width={29.598} height={29.598} rx={14.799} />
                </G>
            </G>
            <G data-name="Group 17839">
                <Path
                    data-name="Line 71"
                    d="M54.934 40.79h10.731"
                    fill="none"
                    stroke="#fe724c"
                    strokeLinecap="round"
                    strokeWidth={1.5}
                    strokeDasharray="0 0"
                />
            </G>
        </Svg>
    )
}

const ButtonMinus = ({ onPress, style }) => {
    return (
        <Box style={style ? style : ""}>
            <RectButton
                underlayColor="#fff"
                {...{ onPress }}
            >
                <Minus/>
            </RectButton>
        </Box>
    );
};


export default ButtonMinus;
