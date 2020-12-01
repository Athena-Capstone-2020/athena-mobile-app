import React from 'react'
import { Dimensions, StyleSheet } from 'react-native';
import { Box, Text } from '../../components/index';
import Svg, { G, Circle } from "react-native-svg"

const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        textAlign: "center",
        width,

    },
    title: {
        marginTop: 103,
        marginBottom: 28,
    },
    descriptionContainer: {
        width: width - 45
    },
    description: {
        textAlign: "center",
    }
})

const GreenCircle = () => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={310}
            height={310}
            viewBox="0 0 310 310"
        >
            <G
                data-name="Ellipse 90"
                fill="none"
                stroke="#2dbc48"
                strokeDasharray="0 0"
            >
                <Circle cx={155} cy={155} r={155} stroke="none" />
                <Circle cx={155} cy={155} r={154.5} />
            </G>
        </Svg>
    )
}


const Slide = ({ mainPhoto, miniPhotos, title, description }) => {
    return (
        <Box flex={1} style={styles.container}>
            <Box>
                <GreenCircle />
            </Box>
            <Text variant="onboardingTitle" style={styles.title}>{title}</Text>
            <Box style={styles.descriptionContainer}>
                <Text variant="onboardingDesc" style={styles.description}>{description}</Text>
            </Box>
        </Box >
    )
}

export default Slide
