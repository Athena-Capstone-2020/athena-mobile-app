import React from 'react';
import { StyleSheet, Dimensions } from 'react-native';
import { Box, Text } from '../components/index';
import GroceryListItem from "../components/GroceryListItem";
import Svg, { G, Path, Rect, TSpan } from "react-native-svg";

const windowWidth = Dimensions.get('window').width;
 
 const styles = StyleSheet.create({
    groceryListName: {
        width: windowWidth - 64,
        height: 51,
        marginTop: 18,
    },
    groceryList: {
        marginTop: 17,
        alignSelf: "flex-start",
        marginLeft: 39
     },
    item: {
        marginLeft: 16,
        marginBottom: 20
    }
 });

 const GroceryList = () => {
     return (
        <Box marginTop="xl" alignItems="center">
            <Box style={styles.groceryListName}>
                <Text variant="groceryListName">List</Text>
                <Box >
                    <GroceryListItem />
                </Box>
            </Box>
        </Box>
    );
 }

export default GroceryList;