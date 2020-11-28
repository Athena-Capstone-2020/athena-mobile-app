import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions } from 'react-native';
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
        flexDirection: "row",
        height: 50
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

const BlackDeleteIcon = ({ style }) => {
    return (
        <Box style={style}>
            <Svg width={23} height={23} viewBox="0 0 35 35" >
                <G id="surface1">
                    <Path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(0%,0%,0%)", fillOpacity: 1,}}d="M 17.5 35 C 7.851562 35 0 27.148438 0 17.5 C 0 7.851562 7.851562 0 17.5 0 C 27.148438 0 35 7.851562 35 17.5 C 35 27.148438 27.148438 35 17.5 35 Z M 17.5 2.1875 C 9.054688 2.1875 2.1875 9.054688 2.1875 17.5 C 2.1875 25.945312 9.054688 32.8125 17.5 32.8125 C 25.945312 32.8125 32.8125 25.945312 32.8125 17.5 C 32.8125 9.054688 25.945312 2.1875 17.5 2.1875 Z M 17.5 2.1875 "/>
                    <Path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(0%,0%,0%)", fillOpacity: 1, }} d="M 12.085938 24.007812 C 11.808594 24.007812 11.527344 23.902344 11.3125 23.6875 C 10.886719 23.257812 10.886719 22.566406 11.3125 22.140625 L 22.140625 11.3125 C 22.570312 10.882812 23.261719 10.882812 23.6875 11.3125 C 24.117188 11.738281 24.117188 12.429688 23.6875 12.859375 L 12.859375 23.6875 C 12.644531 23.902344 12.367188 24.007812 12.085938 24.007812 Z M 12.085938 24.007812 "/>
                    <Path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(0%,0%,0%)", fillOpacity: 1, }} d="M 22.914062 24.007812 C 22.632812 24.007812 22.351562 23.902344 22.140625 23.6875 L 11.3125 12.859375 C 10.886719 12.433594 10.886719 11.738281 11.3125 11.3125 C 11.738281 10.886719 12.433594 10.886719 12.859375 11.3125 L 23.6875 22.140625 C 24.113281 22.566406 24.113281 23.261719 23.6875 23.6875 C 23.472656 23.902344 23.191406 24.007812 22.914062 24.007812 Z M 22.914062 24.007812 "/>
                </G>
            </Svg>
        </Box>
    )
}

const GreyDeleteIcon = ({ style }) => {
    return (
        <Box style={style}>
            <Svg width={23} height={23} viewBox="0 0 35 35" >
                <G id="surface1">
                    <Path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(208,206,213)", fillOpacity: 1,}}d="M 17.5 35 C 7.851562 35 0 27.148438 0 17.5 C 0 7.851562 7.851562 0 17.5 0 C 27.148438 0 35 7.851562 35 17.5 C 35 27.148438 27.148438 35 17.5 35 Z M 17.5 2.1875 C 9.054688 2.1875 2.1875 9.054688 2.1875 17.5 C 2.1875 25.945312 9.054688 32.8125 17.5 32.8125 C 25.945312 32.8125 32.8125 25.945312 32.8125 17.5 C 32.8125 9.054688 25.945312 2.1875 17.5 2.1875 Z M 17.5 2.1875 "/>
                    <Path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(208,206,213)", fillOpacity: 1, }} d="M 12.085938 24.007812 C 11.808594 24.007812 11.527344 23.902344 11.3125 23.6875 C 10.886719 23.257812 10.886719 22.566406 11.3125 22.140625 L 22.140625 11.3125 C 22.570312 10.882812 23.261719 10.882812 23.6875 11.3125 C 24.117188 11.738281 24.117188 12.429688 23.6875 12.859375 L 12.859375 23.6875 C 12.644531 23.902344 12.367188 24.007812 12.085938 24.007812 Z M 12.085938 24.007812 "/>
                    <Path style={{ stroke: "none", fillRule: "nonzero", fill: "rgb(208,206,213)", fillOpacity: 1, }} d="M 22.914062 24.007812 C 22.632812 24.007812 22.351562 23.902344 22.140625 23.6875 L 11.3125 12.859375 C 10.886719 12.433594 10.886719 11.738281 11.3125 11.3125 C 11.738281 10.886719 12.433594 10.886719 12.859375 11.3125 L 23.6875 22.140625 C 24.113281 22.566406 24.113281 23.261719 23.6875 23.6875 C 23.472656 23.902344 23.191406 24.007812 22.914062 24.007812 Z M 22.914062 24.007812 "/>
                </G>
            </Svg>
        </Box>
    )
}

const GroceryItem = ({ todo, index, removeTodo, updateTodo }) => {

    const [editing, setEditing] = useState(false);
    const [value, setValue] = useState("");
    const [checked, setChecked] = useState(false);

    function updater() {
        updateTodo(value, index);
    }

    function initlializeTodo() {
        if(todo != "") {
            setValue(todo);
        }
        else {
            setEditing(true);
        }
    }

    useEffect(() => {
        initlializeTodo()
    }, [])

    return (
        <Box style={styles.container}>
            <Box flexDirection="row">
                <CheckBoxButton onPress={() => setChecked(c => !c)} checked={checked} />
                {editing ?
                    <GroceryListInput
                        onPress={() => setEditing(e => !e)}
                        style={styles.item}
                        onBlur={() => setEditing(false)}
                        onEndEditing={updater(value)}
                        autoFocus
                        value={value}
                        onChangeText={(e) => setValue(e)} /> :
                    <Text
                        onPress={() => setEditing(e => !e)}
                        variant={checked ? "groceryListItemCompleted" : "groceryListItem"}
                        style={styles.item}>{value}
                    </Text>
                }
            </Box>
            <RectButton onPress={() => removeTodo(index, value)}>
                { checked ? <GreyDeleteIcon />: null}
            </RectButton>
        </Box>
    )
}

export default GroceryItem;
