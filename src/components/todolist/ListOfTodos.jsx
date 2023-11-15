import { makeStyles } from "@material-ui/core/styles";
import TrashIcon from "@material-ui/icons/DeleteSweepRounded";
import { Box, Typography } from "@mui/material";
import React from "react";
import TodoItem from "./TodoItem";
import TodoItemPreview from "./TodoItemPreview";

function ListOfTodos({ todos, trash, setTodos }) {
  const classes = useStyles();
  const onDelete = (id) => {
    setTodos({ todos, trash: trash.filter((todo) => todo.id !== id) });
  };
  const onPutBack = (todo) => {
    setTodos({
      todos: [...todos, todo],
      trash: trash.filter((item) => item.id !== todo.id),
    });
  };
  return (
    <Box>
      <Box className={classes.todoListContainer}>
        {todos.length ? (
          todos?.map((todo) => (
            <TodoItem
              todo={todo}
              key={todo.id}
              todos={todos}
              trash={trash}
              setTodos={setTodos}
            />
          ))
        ) : (
          <Typography className={classes.noTodosText}>No todos</Typography>
        )}
      </Box>
      {!!trash.length && (
        <Box className={classes.trashContainer}>
          <Typography variant="h5" className={classes.trashTitle}>
            Trash
            <TrashIcon
              color="secondary"
              fontSize="large"
              className={classes.trashIcon}
            />
          </Typography>
        </Box>
      )}
      <Box className={classes.trashContainer}>
        {trash.map((todo) => (
          <TodoItemPreview
            todo={todo}
            onDelete={onDelete}
            onPutBack={onPutBack}
          />
        ))}
      </Box>
    </Box>
  );
}

export default ListOfTodos;
let useStyles = makeStyles((theme) => ({
  trashTitle: {
    display: "flex",
    alignItems: "center",
  },
  trashIcon: {
    marginInline: "2vw",
  },
  trashContainer: {
    marginBlock: "4vh",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  todoListContainer: {
    height: "50vh",
    marginTop: "3vh",
    overflowY: "auto",
    width: "60vw",
    margin: "0 auto",
    border: "1px solid #fff",
    borderRadius: "5px",
    [theme.breakpoints.down("md")]: {
      width: "80vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "95vw",
    },
  },
  deletedTodo: {
    marginBlock: "10px",
    display: "flex",
    width: "60vw",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f5f5f5",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "5px",
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
  },
  itemPreview: {
    marginTop: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f5f5f5",
    padding: "8px",
    border: "1px solid #ddd",
    borderRadius: "5px",
  },
  todoInfo: {
    display: "flex",
    flexDirection: "column",
    flexGrow: 1,
  },
  deadline: {
    fontSize: "0.9rem",
    color: "#777",
  },
  noTodosText: {
    fontSize: "3em !important",
    textAlign: "center",
    paddingTop: "10%",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2em !important",
    },
  },
}));
