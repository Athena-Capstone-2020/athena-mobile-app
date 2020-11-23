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
                    <Slide
                        title="Welcome!"
                        description="Athena is your new kitchen organizational tool"
                    />
                    <Slide
                        title="Connect"
                        description="connect with housemates and family members to always have an up to date inventory of food "
                    />
                    <Slide
                        title="Save"
                        description="Save time and money by letting Athena keep track of food for you "
                    />
                    <GoogleAuth />
                </Animated.ScrollView>
            </Box>
        </Box>
    )
}

export default Onboarding;
