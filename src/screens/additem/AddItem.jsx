import React from 'react'
import { StyleSheet, Dimensions } from 'react-native';
import { Box, Text, Search } from '../../components/index'
import { IconButton } from '../../components/index'
import Svg, { Path } from "react-native-svg"
import BarcodeScanner from './BarcodeScanner'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    screenName: {
        marginTop: 10,
        marginBottom: 12,
    },
    searchAndButton: {
        width: windowWidth - 64,
        height: 51,
        marginTop: 18,
    },
    search: {
        width: 256
    },
    barcode: {
        marginTop: -60.5,
        marginLeft: 35
    },
    recentSearchesTitle: {
        alignSelf: "flex-start",
        marginTop: 25,
        marginLeft: 32
    },
    recentSearches: {
        marginTop: 17,
        alignSelf: "flex-start",
        marginLeft: 39
    },
    item: {
        marginLeft: 16,
        marginBottom: 20
    }
});

const recents = ["English Muffins", "Bananas", "Ketchup", "Ramen Noodles"];

const ClockIcon = () => {
    return (
        <Svg width={19} height={19} viewBox="0 0 19 19">
            <Path
                d="M9.491 19A9.5 9.5 0 1119 9.5 9.506 9.506 0 019.491 19zM9.5 1.9a7.6 7.6 0 107.6 7.6 7.609 7.609 0 00-7.6-7.6zm3.813 11.3a.7.7 0 01-.356-.1l-3.942-2.365a.946.946 0 01-.465-.817V5.434a.685.685 0 01.684-.684h.057a.685.685 0 01.684.684v4.313l3.677 2.185a.669.669 0 01.2.177.7.7 0 01.116.242.677.677 0 01.013.269.687.687 0 01-.094.252.659.659 0 01-.573.328z"
                fill="#9796a1"
            />
        </Svg>
    )
}

const RootStack = createStackNavigator();

const AddItemSearch = ({ navigation }) => {
    
    return (
        <Box style={styles.container} marginTop="xl" alignItems="center">
            <Text variant="header" style={styles.screenName}>Add Item</Text>
            <Box style={styles.searchAndButton}>
                <Search
                    style={styles.search}
                    placeholder="Search Food Items"
                />
                <IconButton
                    style={styles.barcode}
                    variant="barcode"
                    onPress={() => navigation.navigate('BarcodeScanner')}
                />
            </Box>
            <Text variant="recentSearchesTitle" style={styles.recentSearchesTitle}>Recent Searches</Text>
            <Box style={styles.recentSearches}>
                {recents.map((item, key) => {
                    return (
                        <Box flexDirection="row" key={key}>
                            <ClockIcon />
                            <Text variant="recentSearches" style={styles.item}>{item}</Text>
                        </Box>)
                })}
            </Box>
        </Box>

    )
}

const AddItem = () => {
    return (
        <RootStack.Navigator mode="modal" screenOptions={{tabBarVisible: false}}>
            <RootStack.Screen name="AddItemSearch" component={AddItemSearch} options={{ headerShown: false }} />
            <RootStack.Screen name="BarcodeScanner" component={BarcodeScanner} options={{ headerShown: false }} />
        </RootStack.Navigator>
    )
}

export default AddItem;