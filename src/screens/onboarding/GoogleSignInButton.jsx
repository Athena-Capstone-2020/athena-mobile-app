import React from 'react'
import { Dimensions, StyleSheet, ImageBackground } from 'react-native';
import { Box, Text } from '../../components/index';
const { width, height } = Dimensions.get('window')
import Svg, { Defs, G, Rect, TSpan, Path } from "react-native-svg"
import { RectButton } from "react-native-gesture-handler";


const Button = () => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={246.504}
            height={161.241}
            viewBox="0 0 246.504 161.241"
        >
            <Defs></Defs>
            <G data-name="Group 17865">
                <G transform="translate(-.003 -.003)" filter="url(#prefix__a)">
                    <Rect
                        data-name="Rectangle 4145"
                        width={139.263}
                        height={54}
                        rx={27}
                        transform="translate(35.75 35.75)"
                        fill="#fff"
                    />
                </G>
                <Text variant="Google">Google</Text>
                <G data-name="Group 17967">
                    <G data-name="super g">
                        <Path
                            d="M67.588 56.411l4.038-3.949a13.747 13.747 0 00-9.57-3.715 14.3 14.3 0 00-12.783 7.887l4.627 3.592a8.648 8.648 0 018.156-5.946 7.93 7.93 0 015.532 2.131z"
                            fill="#ea4335"
                        />
                        <Path
                            data-name="Shape"
                            d="M75.489 60.45H62.056v5.311h7.886a6.993 6.993 0 01-2.926 4.642l4.515 3.5a13.989 13.989 0 003.249-4.81 13.989 13.989 0 001.016-5.718 12.257 12.257 0 00-.307-2.925z"
                            fill="#4285f4"
                        />
                        <Path
                            data-name="Shape"
                            d="M53.439 63.056a9.256 9.256 0 01.461-2.83l-4.627-3.592a14.278 14.278 0 000 12.846l4.644-3.594a8.805 8.805 0 01-.478-2.83z"
                            fill="#fbbc05"
                        />
                        <Path
                            data-name="Shape"
                            d="M71.531 73.899l-4.515-3.5a8.468 8.468 0 01-4.96 1.431 8.614 8.614 0 01-5.03-1.658 8.614 8.614 0 01-3.109-4.286L49.29 69.48a14.274 14.274 0 005.263 5.755 14.274 14.274 0 007.5 2.13 13.637 13.637 0 009.478-3.466z"
                            fill="#34a853"
                        />
                        <Path
                            data-name="Shape"
                            d="M76.364 48.749v28.617H47.747V48.749z"
                            fill="none"
                        />
                    </G>
                </G>
            </G>
        </Svg>
    )
}

const styles = StyleSheet.create({
    container: {

    }
})

const GoogleSignInButton = () => {
    return (
        <Box>
            <RectButton>
                <Button />
            </RectButton>
        </Box>
    )
}

export default GoogleSignInButton;
