import React, { useState } from 'react';
import { StyleSheet, Dimensions, TextInput, CheckBox } from 'react-native';
import { Box, Text } from '../../components/index';
import CheckBoxButton from '../../components/CheckBoxButton';
import Svg, { G, Path, Rect, TSpan } from "react-native-svg";
import { RectButton } from "react-native-gesture-handler";
import GroceryListInput from "../../components/GroceryListInput";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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

const HamburgerIcon = ({ style }) => {
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

const GroceryItem = ({ todo, index, completeTodo, removeTodo }) => {

    const [editing, setEditing] = useState(true);
    const [value, setValue] = useState("");

    return (
        <Box style={styles.container} >
            <Box flexDirection="row">
                <CheckBoxButton onPress={completeTodo(index)}/>
                {editing ? 
                <GroceryListInput 
                    onPress={() => setEditing(e => !e)} 
                    style={styles.item}
                    onBlur={() => setEditing(false)}
                    autoFocus 
                    value={value} 
                    onChangeText={(e) => setValue(e)} /> : 
                <Text 
                    onPress={() => setEditing(e => !e)} 
                    variant={todo.isComplete ? "groceryListItemCompleted" : "groceryListItem"}
                    style={styles.item}>{value}
                </Text>
                }
            </Box>
            <RectButton onPress={() => removeTodo(index)}>
                <HamburgerIcon style={styles.hamburger} />
            </RectButton>
        </Box>
    )
}

export default GroceryItem;