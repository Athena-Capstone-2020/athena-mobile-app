import React, { useState } from 'react'
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import CheckBoxButton from '../components/CheckBoxButton';
import IconButton from '../components/IconButton';
import { Box, Text } from '../components/index';
import Svg, { G, Path, Rect, TSpan } from "react-native-svg";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    groceryList: {
        height: windowHeight - windowHeight*0.25,
        paddingTop: 17,
        alignSelf: "flex-start"
     },
    item: {
        paddingLeft: 8
    },
    container: {
        width: windowWidth - 64,
        justifyContent: "space-between"
    },
    hamburger: {
        paddingTop: 5
    },
    addItem: {
       paddingLeft: 40,
       paddingTop: 20
    }
});

const HamburgerIcon = (props) => {
    return (
        <Box style={props.style}>
            <Svg width={21.546} height={15} viewBox="0 0 21.546 15">
            <G fill="none" stroke="#d0ced5" strokeLinecap="round" strokeWidth={3}>
                <Path data-name="Path 52" d="M1.5 1.5h18.546" />
                <Path data-name="Path 53" d="M1.5 7.5h18.546" />
                <Path data-name="Path 54" d="M1.5 13.5h18.546" />
            </G>
            </Svg>
        </Box>
    )
}

const listItems = ["Hot Dogs", "Bananas", "Red Onions", "Bacon", "Tacos", "Mustard", "Bread", "Ranch", "Salad", "Brownie Mix", "Chocolate Chips", "Milk", "Eggs"];

const GroceryListItem = ({ style }) => {
    return (
        <Box style={[styles.groceryList, style ? style : {}]}>
            <ScrollView showsVerticalScrollIndicator ={false}>
                {listItems.map((item, key) => {
                    return (
                        <Box style={styles.container} flexDirection="row" key={key}>
                            <Box flexDirection="row">
                                <CheckBoxButton style={styles.checkBox}/>
                                <Box flexDirection="column">
                                    <Text variant="groceryListItem" style={styles.item}>{item}</Text>
                                </Box>
                            </Box>
                            <HamburgerIcon style={styles.hamburger}/>
                        </Box>
                    )
                })}
            </ScrollView>
            <IconButton variant="addItem" style={styles.addItem}></IconButton>
        </Box>  
    )
    
}

export default GroceryListItem;