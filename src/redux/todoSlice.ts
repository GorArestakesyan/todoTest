import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo, TodosState } from "../types/todoTypes";

const initialState: TodosState = {
  todos: [],
  trash: [],
};

const todosSlice = createSlice({
  name: "todos",
  initialState,
  reducers: {
    addTodo: (state, action: PayloadAction<Todo>) => {
      state.todos.push(action.payload);
    },
    setTodos: (state, action: PayloadAction<Todo[]>) => {
      state.todos = action.payload;
    },
    deletePermanently: (state, action: PayloadAction<Todo[]>) => {
      state.trash = action.payload;
    },
    deleteTodo: (state, action: PayloadAction<string>) => {
      const todoToDelete = state.todos.find(
        (todo) => todo.id === action.payload
      );
      if (todoToDelete) {
        state.trash.push(todoToDelete);
        state.todos = state.todos.filter((todo) => todo.id !== action.payload);
      }
    },
    putBackTodo: (state, action: PayloadAction<string>) => {
      const todoToPutBack = state.trash.find(
        (todo) => todo.id === action.payload
      );
      if (todoToPutBack) {
        state.todos.push(todoToPutBack);
        state.trash = state.trash.filter((todo) => todo.id !== action.payload);
      }
    },
  },
});

export const { addTodo, deleteTodo, putBackTodo, setTodos, deletePermanently } =
  todosSlice.actions;
  
export default todosSlice.reducer;
