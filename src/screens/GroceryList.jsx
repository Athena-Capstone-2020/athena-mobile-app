import React, { useState } from 'react';
import { StyleSheet, Dimensions, ScrollView, Button } from 'react-native';
import { Box, Text } from '../components/index';
import GroceryListItem from "../components/GroceryListItem";
import GroceryTodoList from "../components/GroceryTodoList";
import GroceryTodoForm from "../components/GroceryTodoForm";
import Svg, { G, Path, Rect, TSpan } from "react-native-svg";
import IconButton from '../components/IconButton';

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const styles = StyleSheet.create({
    groceryListName: {
        width: windowWidth - 64,
        height: 35,
        marginTop: 18
    },
    groceryList: {
        height: windowHeight * .60,
        marginTop: 40,
        marginLeft: 32,
        alignSelf: "flex-start",
        flexDirection: "row"
    },
    item: {
        marginLeft: 16,
        marginBottom: 20
    },
    addItem: {
        marginRight: 250,
        marginLeft: 15
    }
});

const GroceryList = () => {
    const [todos, setTodos] = useState([]);

    function addTodo(todo) {
        // adds new todo to beginning of todos array
        setTodos([...todos, todo]);
    }

    function toggleComplete(id) {
        setTodos(
            todos.map(todo => {
                if (todo.id === id) {
                    return {
                        ...todo,
                        completed: !todo.completed
                    };
                }
                return todo;
            })
        );
    }

    function removeTodo(id) {
        setTodos(todos.filter(todo => todo.id !== id));
    }

    return (
        <Box marginTop="xl" alignItems="center">
            <Box style={styles.groceryListName}>
                <Text variant="groceryListName">Grocery List</Text>
            </Box>
            {/* <GroceryTodoForm addTodo={addTodo}/> */}
            <Box style={styles.groceryList}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    {
                        todos.map((_, key) => {
                            <GroceryItem
                                key={key}
                            />
                        })
                    }
                    <Button onPress={() => addTodo('a;kdjnfa')} />
                </ScrollView>
            </Box>
        </Box>
    );
}

export default GroceryList;

/*
<IconButton variant="addItem" style={styles.addItem}></IconButton>
*/