import React from 'react';
import { ScrollView, Dimensions } from 'react-native';
import { Box } from '../../components/index';
import Slide from './Slide'

const { width } = Dimensions.get('window')


const Onboarding = () => {
    return (
        <Box flex={1}>
            <ScrollView horizontal snapToInterval={width} decelerationRate="fast">
                <Slide
                    title="Welcome"
                    description="Athena is your new kitchen organizational tool"
                    index={0}
                />
                <Slide
                    title="Connect"
                    description="connect with housemates and family members to always have an up to date inventory of food "
                    index={1}
                />
                <Slide
                    title="Save"
                    description="Save time and money by letting Athena keep track of food for you "
                    index={2}
                />
                {/* <Auth/> */}
            </ScrollView>
        </Box>
    )
}

export default Onboarding;
