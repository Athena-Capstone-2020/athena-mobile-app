import React from "react";
import { StyleSheet } from "react-native";
import { RectButton } from "react-native-gesture-handler";
import Svg, { G, Path, Rect, Text, TSpan } from "react-native-svg";
import { Box } from "./index";

// const styles = StyleSheet.create({
//     container: {
//         borderRadius: 28.5,
//         backgroundColor: "green",
//         width: 229,
//         height: 53,
//     },
// })

const AddToContainer = () => {
    return (
        <Svg width={229} height={53} viewBox="26.5 24 46 55">
            <G data-name="Group 17860">
                <G data-name="Group 17858" transform="translate(44.939 25)">
                    <G transform="translate(-44.94 -25)" filter="url(#prefix__a)">
                        <Rect
                            data-name="Rectangle 4144"
                            width={229}
                            height={53}
                            rx={26.5}
                            transform="translate(45 25)"
                            fill="#fe724c"
                        />
                    </G>
                    <Rect
                        data-name="Rectangle 4145"
                        width={40}
                        height={40}
                        rx={20}
                        transform="translate(6.061 6)"
                        fill="#fff"
                    />
                </G>
                <Text
                    data-name="Add to cart"
                    transform="translate(110 56)"
                    fill="#fff"
                    fontSize={16}
                >
                    <TSpan x={0} y={0}>
                        {"Add to Container"}
                    </TSpan>
                </Text>
                <Path
                    data-name="Path 3391"
                    d="M252.425 56.956l5.221-4.891-5.029-5.03"
                    fill="none"
                    stroke="#fff"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    strokeDasharray="0 0"
                />
                <Path
                    d="M72.324 52.81h6.238a1.818 1.818 0 001.823-1.779 1.787 1.787 0 00-1.823-1.758h-6.238v-5.969a1.824 1.824 0 00-3.646 0v5.973h-6.216a1.943 1.943 0 00-1.3.508 1.8 1.8 0 00-.527 1.25 1.818 1.818 0 001.823 1.779h6.216v5.99a1.824 1.824 0 003.646 0z"
                    fill="#fe724c"
                    stroke="#fe724c"
                    fillRule="evenodd"
                />
            </G>
        </Svg>
    )
}

const ButtonAddToContainer = ({ onPress, style }) => {

    return (
        <Box style={[style ? style : ""]}>
            <RectButton 
                underlayColor="#fff"
                {...{ onPress }}
            >
                <AddToContainer/>
            </RectButton>
        </Box>
    );
};

export default ButtonAddToContainer;
