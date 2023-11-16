import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { Theme, makeStyles } from "@material-ui/core/styles";
import CloseIcon from "@material-ui/icons/Close";
import PutBack from "@material-ui/icons/VerticalAlignTopRounded";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deletePermanently, putBackTodo } from "../../redux/todoSlice";
import { Todo } from "../../types/todoTypes";

interface TodoItemPreviewProps {
  todo: Todo;
}

const TodoItemPreview: React.FC<TodoItemPreviewProps> = ({ todo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { trash } = useSelector((state: RootState) => state.todos);

  const onDelete = (id: string) => {
    dispatch(deletePermanently(trash.filter((todo) => todo.id !== id)));
  };

  const onPutBack = (todo: Todo) => {
    dispatch(putBackTodo(todo.id));
  };

  return (
    <Box className={classes.itemPreview}>
      <Box className={classes.todoInfo}>
        <Typography className={classes.todoStatus}>Status: Removed</Typography>
        <Typography className={classes.todoInfoText}>{todo.title}</Typography>
        <Typography className={classes.todoInfoText}>
          {todo.description ? todo.description : "No desc."}
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
          className={classes.icon}
        >
          <PutBack className={classes.icon} />
        </IconButton>
        <IconButton
          onClick={() => onDelete(todo.id)}
          color="secondary"
          title="Delete"
          className={classes.icon}
        >
          <CloseIcon className={classes.icon} />
        </IconButton>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  itemPreview: {
    marginBlock: "1%",
    display: "flex",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    background: "#f5f5f5",
    padding: "8px",
    border: "1px solid red",
    borderRadius: "5px",
    boxShadow: "0px 5px 9px 0px #a5a4a4",

    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      padding: "4px",
      gap: "8px",
      width: "100%",
    },
  },
  todoInfoText: {
    flexGrow: 2,
    fontFamily: "Exo-Light",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.3em !important",
      maxWidth: "30ch",
      textAlign: "center",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.3em !important",
      maxWidth: "10ch",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  todoStatus: {
    flexGrow: 1,
    fontFamily: "Exo-Light",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.3em !important",
      maxWidth: "30ch",
      textAlign: "center",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.3em !important",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  delPutBox: {
    display: "flex",
    flexDirection: "row",
  },
  icon: {
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      paddingInline: "1px",
    },
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
    fontSize: "0.9em !important",
    color: "#777",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.3em !important",
    },
  },
}));

export default TodoItemPreview;
