import { makeStyles, Theme } from "@material-ui/core/styles";
import TrashIcon from "@material-ui/icons/DeleteSweepRounded";
import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import TodoItem from "./TodoItem";
import TodoItemPreview from "./TodoItemPreview";

function ListOfTodos() {
  const classes = useStyles();
  const { todos, trash } = useSelector((state: RootState) => state.todos);

  return (
    <Box>
      <Box className={classes.todoListContainer}>
        {todos.length ? (
          todos?.map((todo) => <TodoItem todo={todo} key={todo.id} />)
        ) : (
          <Typography className={classes.noTodosText}>No todos</Typography>
        )}
      </Box>
      {!!trash.length && (
        <Box className={classes.trashContainer}>
          <Typography className={classes.trashTitle}>
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
          <TodoItemPreview todo={todo} key={todo.id} />
        ))}
      </Box>
    </Box>
  );
}

export default ListOfTodos;

const useStyles = makeStyles((theme: Theme) => ({
  trashTitle: {
    display: "flex",
    fontSize: "1rem !important",
    alignItems: "center",
    fontFamily: "Exo-Regular",
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
    width: "90%",
    margin: "0 auto",
    borderRadius: "5px",
    [theme.breakpoints.down("md")]: {
      width: "80%",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      border: "none",
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
    fontFamily: "Exo-Light",
    textAlign: "center",
    paddingTop: "10%",
    color: "#fff",
    [theme.breakpoints.down("sm")]: {
      fontSize: "2em !important",
    },
  },
}));
