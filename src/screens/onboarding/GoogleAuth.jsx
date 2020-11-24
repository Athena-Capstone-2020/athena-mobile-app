import React, { useState, useEffect } from 'react'
import { Dimensions, StyleSheet, ImageBackground } from 'react-native';
import { Box, Text } from '../../components/index';
const { width, height } = Dimensions.get('window')
import image from '../../../assets/Onboarding/Onboarding.png'
import { LinearGradient } from 'expo-linear-gradient';
import Svg, { Path } from "react-native-svg"
import GoogleSignInButton from './GoogleSignInButton'
import { useUserContext } from '../../global/user-context/useUserContext'


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
    text: {
        flex: .25,
        justifyContent: 'center',
        left: 30,
        width,
    },
    signIn: {
        width: width - 120,
        height: .2 * height,
        // backgroundColor: 'blue',
        alignSelf: 'center',
        position: 'absolute',
        bottom: 200
    },
    lines: {
        flex: 1,
        alignSelf: 'center',
        justifyContent: 'center',
        position: 'absolute',
        top: 50
    },
    signInButton: {
        top: 100
    },
    signInText: {
        position: "absolute",
        alignSelf: "center"
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

    const { googleAuth, actions } = useUserContext()

    const handleGoogleSignIn = async () => {
        await googleAuth.SignInWithGoogle().then((res) => actions.setUser(res.id, res.email))
    }

    return (
        <Box style={styles.container}>
            <ImageBackground source={image} style={styles.image} imageStyle={{
                resizeMode: "cover",
                alignSelf: "flex-end",
            }}>
                <LinearGradient
                    colors={['transparent', '#43465C',]}
                    style={{
                        position: 'absolute',
                        left: 0,
                        right: 0,
                        top: 160,
                        height,
                    }}
                >
                    <Box style={styles.text}>
                        <Text variant="WelcomeTo">Welcome To</Text>
                        <Text variant="Athena">Athena</Text>
                        <Box style={{ marginTop: 20 }}>
                            <Text variant="AthenaDesc">A personal food management</Text>
                            <Text variant="AthenaDesc" style={{ marginTop: 8 }}>app for your household </Text>
                        </Box>
                    </Box>
                    <Box style={styles.signIn}>
                        <Box style={styles.lines}>
                            <Line />
                            <Text style={styles.signInText} variant="signIn">Sign In</Text>
                        </Box>
                        <GoogleSignInButton onPress={handleGoogleSignIn} style={styles.signInButton} />
                    </Box>
                </LinearGradient>
            </ImageBackground>
        </Box>
    )
}

export default GoogleAuth
