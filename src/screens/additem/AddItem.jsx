import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet, Dimensions, FlatList, ListItem } from 'react-native';
import { Box, Text, Search, Button } from '../../components/index'
import { IconButton } from '../../components/index'
import Svg, { Path, G, parse } from "react-native-svg"
import BarcodeScannerStack from './BarcodeScannerStack'
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
        marginLeft: 39,
        width: windowWidth - 80,
    },
    item: {
        marginLeft: 16,
        marginBottom: 20
    }
});

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

const XIcon = () => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={10.688}
            height={10.688}
            viewBox="0 0 10.688 10.688"
        >
            <G
                data-name="Group 90"
                fill="none"
                stroke="#9796a1"
                strokeLinecap="round"
                strokeWidth={2}
            >
                <Path data-name="Line 2" d="M1.414 1.414l7.859 7.859" />
                <Path data-name="Line 3" d="M9.273 1.414L1.414 9.273" />
            </G>
        </Svg>
    )
}

const RootStack = createStackNavigator();

const AddItemSearch = ({ navigation }) => {

    const [searches, setSearches] = useState([])
    const [text, setText] = useState('')
    const [recents, setRecents] = useState(false)

    useEffect(() => {
        restoreSearchesAsync();
    }, []);

    const submitHandler = text => {
        if (text.length === 0) return;
        const key = Math.random().toString();

        const newSearches = [{ text, key }, ...searches];

        console.log('newSearches', newSearches)

        setSearches(newSearches);
        storeSearchesAsync(newSearches);
        setRecents(true)
    };

    const asyncStorageKey = '@searches';

    const storeSearchesAsync = newSearches => {
        const stringifiedSearches = JSON.stringify(newSearches);

        AsyncStorage.setItem(asyncStorageKey, stringifiedSearches).catch(err => {
            console.warn('Error storing searches in Async');
            console.warn(err);
        });
    };

    const clearStorage = async () => {
        try {
            await AsyncStorage.clear()
            setSearches([])
            console.log('searches after clear:', searches)
            setRecents(false)
        } catch (err) {
            console.log(err)
        }
    }

    const restoreSearchesAsync = () => {
        AsyncStorage.getItem(asyncStorageKey)
            .then(stringifiedSearches => {
                console.log('Restored Searches:');
                console.log(stringifiedSearches);
                const parsedSearches = JSON.parse(stringifiedSearches);
                console.log('parsedSearches', parsedSearches);
                if (!parsedSearches || typeof parsedSearches !== 'object') return;
                setSearches(parsedSearches);
                setRecents(true)
            })
            .catch(err => {
                console.warn('Error restoring searches from async');
                console.warn(err);
            });
    };

    return (
        <Box style={styles.container} marginTop="xl" alignItems="center">
            <Text variant="header" style={styles.screenName}>Add Item</Text>
            <Box style={styles.searchAndButton}>
                <Search
                    style={styles.search}
                    placeholder="Search Food Items"
                    onSubmitEditing={e => submitHandler(e.nativeEvent.text)}
                    value={text}
                    onChange={text => setText(text)}
                />
                <IconButton
                    style={styles.barcode}
                    variant="barcode"
                    onPress={() => navigation.navigate('BarcodeScannerStack')}
                />
            </Box>
            {recents ?
                <Box>
                    <Box flexDirection="row" justifyContent="space-between" style={{ width: windowWidth - 64 }}>
                        <Text variant="recentSearchesTitle" style={styles.recentSearchesTitle}>Recent Searches</Text>
                        <Button style={{ width: 50, height: 30, borderRadius: 15, marginTop: 23 }} label="clear" onPress={clearStorage} />
                    </Box>
                    <Box style={styles.recentSearches}>
                        <FlatList
                            data={searches}
                            renderItem={({ item }) => {
                                return (
                                    <Box flexDirection="row" key={item.key} marginTop="s">
                                        <ClockIcon />
                                        <Text variant="recentSearches" style={styles.item}>{item.text}</Text>
                                    </Box>)
                            }}
                        />
                    </Box>
                </Box>
                : null}

        </Box>

    )
}

const AddItem = () => {
    return (
        <RootStack.Navigator mode="modal" screenOptions={{ tabBarVisible: false }}>
            <RootStack.Screen name="AddItemSearch" component={AddItemSearch} options={{ headerShown: false }} />
            <RootStack.Screen name="BarcodeScannerStack" component={BarcodeScannerStack} options={{ headerShown: false }} />
        </RootStack.Navigator>
    )
}

export default AddItem;