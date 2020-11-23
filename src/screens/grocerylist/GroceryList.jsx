import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Box, Text } from '../../components/index';
import Svg, { G, Path, Rect, TSpan } from "react-native-svg";
import IconButton from '../../components/IconButton';
import GroceryItem from "./GroceryItem";

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    groceryListName: {
        width: windowWidth - 64,
        height: 35,
        marginTop: 18,
        marginLeft: 32
    },
    groceryList: {
        height: windowHeight - 315,
        marginTop: 40,
        marginLeft: 32,
        flexDirection: "row"
    },
    item: {
        marginLeft: 16,
        marginBottom: 20
    },
    addItem: {
        marginLeft: 45,
        marginTop: 10
    },
    container: {
        height: windowHeight
    }
});

const GroceryList = () => {
    const [todos, setTodos] = useState([]);

    const addTodo = text => {
        const newTodos = [...todos, {text}];
        setTodos(newTodos);
    };

    const completeTodo = index => {
        const newTodos = [...todos];
        let completionState = newTodos[index].isComplete;
        newTodos[index].isComplete = !completionState;
        setTodos(newTodos);
    };

    const removeTodo = index => {
        const newTodos = [...todos];
        newTodos.splice(index, 1);
        setTodos(newTodos);
    };

    return (
        <Box marginTop="xl" style={styles.container}>
            <Box style={styles.groceryListName}>
                <Text variant="groceryListName">Grocery List</Text>
            </Box>
            <Box style={styles.groceryList}>
                <ScrollView showsVerticalScrollIndicator={false} height={windowHeight*.65}>
                    {todos.map((todo, index) => {
                        return (
                            <GroceryItem 
                                key={index}
                                index={index}
                                todo={todo}
                                completeTodo={completeTodo}
                                removeTodo={removeTodo}
                            />
                        )
                    })}
                </ScrollView>
            </Box>
            <IconButton variant="addItem" style={styles.addItem} onPress={() => addTodo("")}></IconButton>
        </Box>
    );
}

export default GroceryList;