import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import PutBack from "@material-ui/icons/VerticalAlignTopRounded";
import React from "react";

const TodoItemPreview = ({ todo, onDelete, onPutBack }) => {
  const classes = useStyles();

  return (
    <Box className={classes.itemPreview}>
      <Box className={classes.todoInfo}>
        <Typography className={classes.todoInfoText}>{todo.title}</Typography>
        <Typography className={classes.todoInfoText}>
          {todo.description}
        </Typography>
        <Typography className={classes.deadline}>
          {todo.date ? todo.date : "Not specified"}
        </Typography>
      </Box>
      <Box className={classes.delPutBox}>
        <IconButton
          onClick={() => onPutBack(todo)}
          color="primary"
          title="Put back"
        >
          <PutBack />
        </IconButton>
        <IconButton
          onClick={() => onDelete(todo.id)}
          color="secondary"
          title="Delete"
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default TodoItemPreview;

let useStyles = makeStyles((theme) => ({
  itemPreview: {
    marginTop: "10px",
    width: "50vw",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f5f5f5",
    boxShadow: "0px 5px 9px 0px #a5a4a4",
    padding: "8px",
    border: "1px solid red",
    borderRadius: "5px",
    [theme.breakpoints.down("md")]: {
      width: "80vw",
    },
    [theme.breakpoints.down("sm")]: {
      width: "80vw",
    },
  },
  todoInfoText: {
    flexGrow: 1,
    [theme.breakpoints.down("md")]: {
      marginLeft: "40%",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.9em !important",
      maxWidth: "30ch",
      textAlign: "center",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.9em !important",
      maxWidth: "10ch",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  delPutBox: {
    display: "flex",
    flexDirection: "row",
  },
  todoInfo: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    flexGrow: 1,
    [theme.breakpoints.down("md")]: {
      flexDirection: "row",
      justifyContent: "center",
    },
  },
  deadline: {
    fontSize: "0.9rem",
    color: "#777",
  },
}));
