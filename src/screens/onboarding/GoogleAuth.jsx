import React from 'react'
import { Dimensions, StyleSheet, ImageBackground } from 'react-native';
import { Box, Text } from '../../components/index';
const { width, height } = Dimensions.get('window')
import image from '../../../assets/Onboarding/Onboarding.png'
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from "react-native-svg"
import GoogleSignInButton from './GoogleSignInButton'

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        width,
    },
    image: {
        flex: 1,
        width,
    },
    signIn: {
        width: width - 120,
        height: .2 * height,
        backgroundColor: 'black',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 200
    },
    lines: {
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 50
    }

})

const Line = () => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={292.456}
            height={1}
            viewBox="0 0 292.456 1"
        >
            <Path
                data-name="Line 71"
                d="M83.472.5H0"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeDasharray="0 0"
            />
            <Path
                data-name="Line 72"
                d="M292.456.5h-88.44"
                fill="none"
                stroke="rgba(255,255,255,0.5)"
                strokeDasharray="0 0"
            />
        </Svg>
    )
}

const GoogleAuth = () => {
    return (
        <Box style={styles.container}>
            <ImageBackground source={image} style={styles.image} imageStyle={{
                resizeMode: "cover",
                alignSelf: "flex-end"
            }}>
                <LinearGradient
                    // Background Linear Gradient
                    colors={['transparent', '#43465C',]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 160,
                        height,
                    }}
                >
                    <Box style={styles.signIn}>
                        <Line style={styles.lines}>
                            <Text variant="signIn">Sign In</Text>
                        </Line>
                        <GoogleSignInButton />
                    </Box>
                </LinearGradient>
            </ImageBackground>
        </Box>
    )
}

export default GoogleAuth
