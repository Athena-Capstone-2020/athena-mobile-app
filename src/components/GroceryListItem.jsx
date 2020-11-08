import React, { useState } from 'react'
import { StyleSheet, Dimensions } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import CheckBoxButton from '../components/CheckBoxButton';
import IconButton from '../components/IconButton';
import { Box, Text } from '../components/index';
import Svg, { G, Path, Rect, TSpan } from "react-native-svg";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    groceryList: {
        marginTop: 17,
        alignSelf: "flex-start",
        marginLeft: 15 //used to be 39
     },
    item: {
        marginLeft: 16
    },
    container: {
        width: windowWidth - 64
    }
});

const HamburgerIcon = () => {
    return (
        <Svg width={21.546} height={15} viewBox="0 0 21.546 15">
      <G fill="none" stroke="#d0ced5" strokeLinecap="round" strokeWidth={3}>
        <Path data-name="Path 52" d="M1.5 1.5h18.546" />
        <Path data-name="Path 53" d="M1.5 7.5h18.546" />
        <Path data-name="Path 54" d="M1.5 13.5h18.546" />
      </G>
    </Svg>
    )
}

const listItems = ["Hot Dogs", "Bananas", "Red Onions", "Bacon"];

const GroceryListItem = ({ style }) => {
    return (
        <Box style={[styles.groceryList, style ? style : ""]}>
            {listItems.map((item, key) => {
                return (
                    <Box style={styles.container} flexDirection="row" key={key}>
                        <CheckBoxButton />
                        <Box flexDirection="column">
                            <Text variant="recentSearches" style={styles.item}>{item}</Text>
                            <Text variant="groceryListItemDetails" style={styles.item}>Quantity: 2</Text>
                        </Box>
                        <HamburgerIcon />
                    </Box>
                )
            })}
            <IconButton variant="addItem"></IconButton>
        </Box>
    )
    
}

export default GroceryListItem;