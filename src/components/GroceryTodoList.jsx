import React, { useState } from "react";
import GroceryTodo from "./GroceryTodo";
import { Box, Text } from '../components/index';

function GroceryTodoList({todos, removeTodo, toggleComplete}) {
    return (
        <Box>
            {todos.map(todo => (
            <GroceryTodo
                key={todo.id}
                todo={todo}
                removeTodo={removeTodo}
                toggleComplete={toggleComplete}
            />
            ))}
        </Box>
    )
}

export default GroceryTodoList;