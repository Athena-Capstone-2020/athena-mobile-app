import React, { useState, useEffect } from 'react';
import { StyleSheet, Dimensions, ScrollView, FlatList } from 'react-native';
import { Box, Text } from '../../components/index';
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
    }
});

const GroceryList = () => {

    const { groceryListService } = withGroceryListService()

    const [todos, setTodos] = useState([]);
    const [grocList, setGrocList] = useState([]);
    const [refreshing, setRefreshing] = useState(false)

    async function fetchGroceryList() {
        setRefreshing(true)
        let gList = await groceryListService.getGroceryListById("ReyesGroceryList");
        setGrocList(gList);
        const foodItemArr = await groceryListService.getFoodItemArrayFromGroceryList("ReyesGroceryList");
        setTodos(foodItemArr);
        setRefreshing(false)
    }

    async function addTodo(text) {
        try {
            const itemToAdd = new FoodItem(text, "", "", "", new Date(), {});
            let newList = await groceryListService.addFoodItemToGroceryList(grocList, itemToAdd);
            const foodItemArr = await groceryListService.getFoodItemArrayFromGroceryList("ReyesGroceryList");
            setTodos(foodItemArr);
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
            const foodItemArr = await groceryListService.getFoodItemArrayFromGroceryList("ReyesGroceryList");
            setTodos(foodItemArr);
        } catch (err) {
            console.error(err);
            logError(err);
        }
    }

    async function removeTodo(index) {
        try {
            let newList = await groceryListService.removeFoodItemFromContainer(grocList, index);
            setGrocList(newList);
            const foodItemArr = await groceryListService.getFoodItemArrayFromGroceryList("ReyesGroceryList");
            setTodos([]);
            setTodos(foodItemArr);
        } catch(err) {
            console.error(err);
            logError(err);
        }
    };

    useEffect(() => {
        fetchGroceryList();
    }, [])

    return (
        <Box marginTop="xl">
            <Box style={styles.groceryListName}>
                <Text variant="groceryListName">Grocery List</Text>
            </Box>
            <Box style={styles.groceryList}>
                <FlatList
                    data={todos}
                    renderItem={({ item, index }) => (
                        <GroceryItem 
                            key={index}
                            index={index}
                            todo={item.name}
                            removeTodo={removeTodo}
                            updateTodo={updateTodo}
                            />
                    )}
                    showsHorizontalScrollIndicator={false}
                    onRefresh={fetchGroceryList}
                    refreshing={refreshing}
                />
            </Box>
            <IconButton variant="addItem" style={styles.addItem} onPress={() => addTodo("")}></IconButton>
        </Box>
    );
}

export default GroceryList;