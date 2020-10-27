import React from 'react'
import { Box } from './index'
import { StyleSheet } from 'react-native'
import { RectButton } from "react-native-gesture-handler";
import Svg, { Path } from "react-native-svg"

const styles = StyleSheet.create({
    shadow: {
        width: 40,
        height: 40,
        borderRadius: 14,
        shadowColor: "#6F6F6F",
        shadowOffset: {
            width: 18.2,
            height: 18.2,
        },
        shadowOpacity: .56,
        shadowRadius: 17,
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
    },
    barcode: {
        width: 27.934,
        height: 22.856,
        marginTop: 10.5,
        marginLeft: 8
    },
    backArrow: {
        width: 6.81,
        height: 11.621,
        // backgroundColor: "red",
        marginTop: 18,
        marginLeft: 15
    }
})

const BarcodeIcon = () => {
    return (
        <Box style={styles.barcode}>
            <Svg width={27.934} height={22.856} viewBox="0 0 27.934 22.856">
                <Path
                    data-name="Scan"
                    d="M18.539 22.856a.95.95 0 110-1.9h2.023a3.1 3.1 0 003.126-3.065v-4.52h-3.332v1.259a2.881 2.881 0 01-2.882 2.878H10.46a2.881 2.881 0 01-2.881-2.878v-1.255h-3.33V17.9a3.094 3.094 0 003.115 3.058h2.067a.95.95 0 110 1.9H7.362A5.01 5.01 0 012.315 17.9v-4.525H.968a.948.948 0 110-1.895h26a.948.948 0 110 1.895H25.62v4.52a5.015 5.015 0 01-5.058 4.961zM7.923 9.553a.353.353 0 01-.343-.342V7.629a2.88 2.88 0 012.881-2.876h7.014a2.87 2.87 0 012.882 2.876v1.582a.356.356 0 01-.346.342zm15.764-2.236V4.96a3.1 3.1 0 00-3.125-3.06h-2.023a.957.957 0 01-.966-.95.958.958 0 01.966-.95h2.023a5.013 5.013 0 015.057 4.96v2.357a.966.966 0 01-1.932 0zm-21.371 0V4.955A5.01 5.01 0 017.362 0h2.07a.958.958 0 01.968.949.957.957 0 01-.967.947h-2.07A3.093 3.093 0 004.25 4.955v2.361a.968.968 0 01-1.935 0z"
                    fill="#fe724c"
                />
            </Svg>
        </Box>
    );
}

const DownArrowIcon = () => {
    return (
        <Box style={styles.backArrow}>
            <Svg width={12.041} height={7.031} viewBox="0 0 12.041 7.031">
                <Path
                    data-name="Path 3391"
                    d="M1.06 1.06l4.891 5.221 5.03-5.029"
                    fill="none"
                    stroke="#111719"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    strokeDasharray="0 0"
                />
            </Svg>
        </Box>
    )
}

const IconButton = ({ style, onPress, variant }) => {

    return (
        <Box style={[styles.shadow, style ? style : ""]}>
            <RectButton
                style={styles.container}
                onPress={onPress}
            >
                {variant === 'barcode' && <BarcodeIcon />}
                {variant === 'downButton' && <DownArrowIcon />}
            </RectButton>
        </Box>
    )
}

export default IconButton;