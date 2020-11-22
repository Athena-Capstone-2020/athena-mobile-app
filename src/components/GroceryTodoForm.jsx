import React, { useState } from "react";
import uuid from 'react-native-uuid';
import { Box, Text, Button, Input } from '../components/index';
import { StyleSheet, Dimensions } from 'react-native';
import IconButton from '../components/IconButton';

const windowWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    inputAndButton: {
        width: windowWidth - 64,
        height: 51,
        marginTop: 18,
        flexDirection: "row"
    },
    formInput: {
        width: 256
    },
    formSubmit: {
        marginTop: 4,
        marginLeft: 15,
        width: windowWidth*.20,
    },
    addItem: {
        paddingLeft: 40,
        paddingTop: 20
     }
 });

function GroceryTodoForm({ addTodo }) {
    const [todo, setTodo] = useState({
        id: "",
        task: "",
        completed: false
    });

    function handleTaskInputChange(e) {
        setTodo({ ...todo, task: e });
    }

    function handleSubmit(e) {
        if (todo.task.trim()) {
            addTodo({ ...todo, id: uuid.v4() });
            setTodo({ ...todo, task: ""});
        }
    }

    return (
        <Box style={styles.inputAndButton}>
            <Input style={styles.formInput}
                onChangeText={handleTaskInputChange}
                value={todo.task}
                placeholder="Add Item"
                keyboardType = "default"
            />
            <Button onPress={handleSubmit} label="Submit" style={styles.formSubmit}/>
        </Box>

    )
}

export default GroceryTodoForm;