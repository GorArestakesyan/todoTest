import { Box } from "@mui/material";
import React, { useState } from "react";
import Form from "../form/Form";
import ListOfTodos from "./ListOfTodos";

function TodoList() {
  const [todos, setTodos] = useState({
    todos: [],
    trash: [],
  });
  return (
    <Box>
      <Form todos={todos} setTodos={setTodos} />
      <ListOfTodos
        todos={todos.todos}
        trash={todos.trash}
        setTodos={setTodos}
      />
    </Box>
  );
}

export default TodoList;
