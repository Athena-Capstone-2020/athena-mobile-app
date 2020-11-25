import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView } from 'react-native';
import { Box, Text } from '../../components/index';
import Svg, { G, Path, Rect, TSpan } from "react-native-svg";
import IconButton from '../../components/IconButton';
import GroceryItem from "./GroceryItem";
import { withGroceryListService } from '../../services'
import { FoodItem } from "../../models/FoodItem"
import { logError } from '../../logger/Logger';

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

    const { groceryListService } = withGroceryListService()

    const [todos, setTodos] = useState([]);
    const [grocList, setGrocList] = useState([]);

    async function fetchGroceryList() {
        let gList = await groceryListService.getGroceryListById("ReyesGroceryList");
        setGrocList(gList);
        const foodItemArr = await groceryListService.getFoodItemArrayFromGroceryList("ReyesGroceryList");
        setTodos(foodItemArr);
    }

    async function addTodo(text) {
        try {
            const itemToAdd = new FoodItem(text, "", "", "", new Date(), {});
            let newList = await groceryListService.addFoodItemToGroceryList(grocList, itemToAdd);
            setGrocList(newList);
            const newTodos = [...todos, {text}];
            setTodos(newTodos);
        } catch (err) {
            console.error(err);
            logError(err);
        }
    };

    async function updateTodo(text, index) {
        try {
            const itemToUpdate = new FoodItem(text, "", "", "", new Date(), {});
            let newList = await groceryListService.updateFoodItemInGroceryList(grocList, index, itemToUpdate);
            setGrocList(newList);
            const newTodos = [...todos];
            newTodos[index].name = text;
            setTodos(newTodos);
        } catch (err) {
            console.error(err);
            logError(err);
        }
    }

    async function removeTodo(index) {
        try {
            let newList = await groceryListService.removeFoodItemFromContainer(grocList, index);
            setGrocList(newList);
            const newTodos = [...todos];
            newTodos.splice(index, 1);
            setTodos(newTodos);
        } catch(err) {
            console.error(err);
            logError(err);
        }
    };

    useEffect(() => {
        fetchGroceryList()
    }, [])

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
                            todo={todo.name}
                            removeTodo={removeTodo}
                            updateTodo={updateTodo}
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