import AsyncStorage from '@react-native-async-storage/async-storage';
import { createStackNavigator } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { Dimensions, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import Svg, { G, Path } from "react-native-svg";
import { Box, Button, IconButton, Search, Text } from '../../components/index';
import BarcodeManual from './BarcodeManual';
import { default as BarcodeScanner, default as BarcodeScannerStack } from './BarcodeScanner';
import ItemDescription from './ItemDescription';
import { withBarcodeService } from '../../services';
import { RectButton } from "react-native-gesture-handler";


const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    screenName: {
        // marginTop: 10,
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
    },
    push: {
        // backgroundColor: "#DDDDDD",
        width: 300,
        borderRadius: 10
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

const AddItemSearch = ({ navigation }) => {

    const [searches, setSearches] = useState([])
    const [text, setText] = useState('')
    const [searched, setSearched] = useState(false)
    const [searchedItem, setSearchedItem] = useState(null)
    const [showRecents, setShowRecents] = useState(true)
    const [recents, setRecents] = useState(false)

    const { barcodeService } = withBarcodeService()

    useEffect(() => {
        restoreSearchesAsync();
    }, []);

    const search = (array, nameKey) => {
        setShowRecents(false)
        for (let item of array) {
            if (item.name === nameKey) return item
        }
        return null
    }

    const submitHandler = async (text) => {
        const response = await barcodeService.mockGetAllFoods();
        console.log(response)
        if (text.length === 0) return;

        var item = search(response, text)
        setSearchedItem(item)
        setSearched(true)
        console.log('searchedItem', searchedItem)

        const key = Math.random().toString();

        const newSearches = [{ text, key }, ...searches];


        setSearches(newSearches);
        storeSearchesAsync(newSearches);
        // setRecents(true)
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
            // console.log('searches after clear:', searches)
            // setRecents(false)
        } catch (err) {
            console.log(err)
        }
    }

    const BackArrowIcon = () => {
        return (
            <Svg
                xmlns="http://www.w3.org/2000/svg"
                width={7.031}
                height={12.041}
                viewBox="0 0 7.031 12.041"
            >
                <Path
                    data-name="Path 3391"
                    d="M1.06 10.981L6.281 6.09 1.252 1.06"
                    fill="none"
                    stroke="#111719"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    strokeDasharray="0 0"
                />
            </Svg>
        )
    }

    const restoreSearchesAsync = () => {
        AsyncStorage.getItem(asyncStorageKey)
            .then(stringifiedSearches => {
                // console.log('Restored Searches:');
                // console.log(stringifiedSearches);
                const parsedSearches = JSON.parse(stringifiedSearches);
                // console.log('parsedSearches', parsedSearches);
                if (!parsedSearches || typeof parsedSearches !== 'object') return;
                setSearches(parsedSearches);
                // setRecents(true)
            })
            .catch(err => {
                console.warn('Error restoring searches from async');
                console.warn(err);
            });
    };

    return (
        <SafeAreaView>
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

                {searches.length > 0 & showRecents ?
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
                    </Box> :
                    (searchedItem !== null ?
                        <Box>
                            <Box flexDirection="row" justifyContent="space-between" style={{ width: windowWidth - 64 }}>
                                <Text variant="recentSearchesTitle" style={styles.recentSearchesTitle}>Search Results:</Text>
                            </Box>
                            <Box style={styles.recentSearches}>
                                <RectButton
                                    style={styles.push}
                                    onPress={() => navigation.navigate("ItemDescription", { searchedItem })}
                                >
                                    <Box flexDirection="row" marginTop="s" style={{ width: 340, justifyContent: "space-between" }}>
                                        <Text variant="recentSearches" style={[styles.item, { marginTop: 3 }]}>{searchedItem.name}</Text>
                                        <Box style={{ width: 20, height: 20, marginTop: 10, marginRight: 60 }}>
                                            <BackArrowIcon />
                                        </Box>
                                    </Box>
                                </RectButton>
                            </Box>
                        </Box> :
                        (searched ?
                            <Box>
                                <Box flexDirection="row" justifyContent="space-between" style={{ width: windowWidth - 64 }}>
                                    <Text variant="recentSearchesTitle" style={styles.recentSearchesTitle}>No results Found</Text>
                                </Box>
                            </Box> : null
                        )
                    )}
            </Box>
        </SafeAreaView >
    )
}

const addItemStack = createStackNavigator();

const AddItem = () => {
    return (
        <addItemStack.Navigator screenOptions={{ tabBarVisible: false, headerShown: false }} >
            <addItemStack.Screen name="AddItemSearch" component={AddItemSearch} />
            <addItemStack.Screen name="BarcodeScannerStack" component={BarcodeScannerStack} options={{ mode: "modal" }} />
            <addItemStack.Screen name='BarcodeManual' component={BarcodeManual} />
            <addItemStack.Screen name="ItemDescription" component={ItemDescription} />
            <addItemStack.Screen name="BarcodeScanner" component={BarcodeScanner} />
        </addItemStack.Navigator>
    )
}

export default AddItem;