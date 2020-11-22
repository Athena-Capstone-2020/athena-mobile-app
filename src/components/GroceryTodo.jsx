import React, { useState } from "react";
import { StyleSheet, Dimensions, ScrollView } from 'react-native'
import CheckBoxButton from '../components/CheckBoxButton';
import Svg, { G, Path, Rect, TSpan } from "react-native-svg";
import { Box, Text } from '../components/index';
import { RectButton } from "react-native-gesture-handler";

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    item: {
        paddingLeft: 8
    },
    hamburger: {
        paddingTop: 5
    },
    container: {
        width: windowWidth - 64,
        justifyContent: "space-between",
        flexDirection: "row"
    }
});

const HamburgerIcon = ({style}) => {
    return (
        <Box style={style}>
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

//CheckBoxButton needs fixing (does not yet change the text variant on change)

function GroceryTodo({ todo, toggleComplete, removeTodo }) {

    function handleCheckboxClick() {
        console.log("CHECKED 2");
        toggleComplete(todo.id);
    }

    function handleRemoveClick() {
        removeTodo(todo.id);
    }

    return (
        <Box style={styles.container}>
            <Box flexDirection="row">
                <CheckBoxButton onPress={handleCheckboxClick}/>
                <Text variant={todo.completed ? "groceryListItemCompleted" : "groceryListItem"} style={styles.item}>{todo.task}</Text>
            </Box>
            <RectButton onPress={handleRemoveClick}>
                <HamburgerIcon style={styles.hamburger}/>
            </RectButton>
        </Box>
    )
}

export default GroceryTodo;