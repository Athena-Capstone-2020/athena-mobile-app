import React from 'react';
import { Dimensions, StyleSheet } from 'react-native';
import { Box } from '../../components/index';
import Slide from './Slide'
import GoogleAuth from './GoogleAuth'
import Animated from "react-native-reanimated";
import { useScrollHandler } from "react-native-redash/lib/module/v1";


const { width, height } = Dimensions.get('window')

const styles = StyleSheet.create({
    container: {

    },
    slider: {
    }
})

const assets = [
    {
        title: 'Welcome!',
        picture: {
            src: require('../../../assets/Onboarding/welcome.png'),
            width: 240,
            height: 300,
            marginBottom: 23,
            marginLeft: 36
        },
        minipics: {
            src1: require('../../../assets/Onboarding/salad.png'),
            src2: require('../../../assets/Onboarding/ladel.png'),
            src3: require('../../../assets/Onboarding/avocado.png'),
            src4: require('../../../assets/Onboarding/frenchToast.png'),
        },
        description: "Athena is your new kitchen organizational tool"
    },
    {
        title: 'Connect',
        picture: {
            src: require('../../../assets/Onboarding/bowl.png'),
            width: 350,
            height: 350,
            marginBottom: 23,
            marginLeft: -25
        },
        description: "connect with housemates and family members to always have an up to date inventory of food "
    },
    {
        title: 'Save',
        picture: {
            src: require('../../../assets/Onboarding/fruit.png'),
            width: 250,
            height: 250,
            marginBottom: -28,
            marginLeft: 30
        },
        description: "Save time and money by letting Athena keep track of food for you "
    },
]

const Onboarding = () => {

    const { scrollHandler, x } = useScrollHandler();

    return (
        <Box flex={1} styles={styles.container}>
            <Box flex={height} styles={styles.slder}>
                <Animated.ScrollView
                    horizontal
                    snapToInterval={width}
                    decelerationRate="fast"
                    showsHorizontalScrollIndicator={false}
                    bounces={false}
                    {...{ scrollHandler }}
                >
                    {assets.map((slide, key) => {
                        return (
                            <Slide
                                key={key}
                                title={slide.title}
                                mainPhoto={slide.picture}
                                description={slide.description}
                                minipics={slide.minipics ? slide.minipics : ""}
                            />
                        )
                    })}
                    <GoogleAuth />
                </Animated.ScrollView>
            </Box>
        </Box>
    )
}

export default Onboarding;