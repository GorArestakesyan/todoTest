import Box from "@material-ui/core/Box";
import IconButton from "@material-ui/core/IconButton";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import SaveIcon from "@material-ui/icons/Save";
import Checkbox, { checkboxClasses } from "@mui/material/Checkbox";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import { deleteTodo, setTodos } from "../../redux/todoSlice";
import { Todo } from "../../types/todoTypes";

interface TodoItemProps {
  todo: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo }) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [isEditing, setEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({ ...todo });
  const { todos } = useSelector((state: RootState) => state.todos);

  const handleEditToggle = () => {
    setEditing(!isEditing);
    setEditedTodo({ ...todo });
  };

  const handleCheck = () => {
    const updatedTodos = todos.map((item) =>
      item.id === todo.id
        ? {
            ...item,
            status: item.status === "Pending" ? "Completed" : "Pending",
          }
        : item
    );
    dispatch(setTodos(updatedTodos));
  };

  const onDelete = () => {
    dispatch(deleteTodo(todo.id));
  };

  const handleSave = () => {
    if (editedTodo.title) {
      const updatedTodos = todos.map((item) =>
        item.id === todo.id ? editedTodo : item
      );

      dispatch(setTodos(updatedTodos));
      setEditing(false);
    } else {
      alert("Todo title can't be empty");
    }
  };

  const handleEditDate = (e: React.ChangeEvent<HTMLInputElement>) => {
    let todoStatusCheck =
      new Date().getTime() > new Date(e.target.value)?.getTime()
        ? "Overdue"
        : "Pending";

    setEditedTodo({
      ...editedTodo,
      date: e.target.value,
      status: todoStatusCheck,
    });
  };

  return (
    <Box className={classes.itemEdit}>
      {todo.status !== "Overdue" && !isEditing && (
        <Checkbox
          disabled={isEditing}
          size="small"
          checked={todo.status !== "Completed" ? false : true}
          onChange={handleCheck}
          sx={{
            [`&, &.${checkboxClasses.checked}`]: {
              color: "#00d900",
              padding: "2px",
            },
          }}
        />
      )}
      {!isEditing && (
        <Typography className={classes.statusText}>
          Status: {todo.status}
        </Typography>
      )}
      <Box className={classes.todoInfo}>
        <Box className={classes.editBox}>
          {isEditing ? (
            <Box className={classes.editingBox}>
              <Typography className={classes.deadline}>Title</Typography>
              <TextField
                required
                fullWidth
                size="small"
                variant="outlined"
                className={classes.editingInputs}
                value={editedTodo.title}
                onChange={(e) =>
                  setEditedTodo({ ...editedTodo, title: e.target.value })
                }
              />
              <Typography className={classes.deadline}>Description</Typography>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                className={classes.editingInputs}
                value={editedTodo.description}
                onChange={(e) =>
                  setEditedTodo({
                    ...editedTodo,
                    description: e.target.value,
                  })
                }
              />
              <Typography className={classes.deadline}>Deadline</Typography>
              <TextField
                id="dateField"
                name="todoDate"
                fullWidth
                size="small"
                type="date"
                className={classes.editingInputs}
                variant="outlined"
                InputLabelProps={{
                  shrink: true,
                }}
                value={editedTodo.date}
                onChange={handleEditDate}
              />
            </Box>
          ) : (
            <Typography className={classes.todoInfoText}>
              {todo.title}
            </Typography>
          )}

          {!isEditing && (
            <React.Fragment>
              <Typography
                className={
                  todo.description ? classes.todoInfoText : classes.deadline
                }
              >
                {todo.description ? todo.description : "No desc."}
              </Typography>
              <Box>
                <Typography className={classes.deadline}>
                  {todo.date ? todo.date : "Not specified"}
                </Typography>
              </Box>
            </React.Fragment>
          )}
        </Box>
      </Box>
      <React.Fragment>
        {isEditing ? (
          <IconButton
            onClick={handleSave}
            color="primary"
            title="Save"
            className={classes.icon}
          >
            <SaveIcon />
          </IconButton>
        ) : (
          <Box className={classes.editDelBlock}>
            <IconButton
              onClick={handleEditToggle}
              color="primary"
              title="Edit"
              className={classes.icon}
            >
              <EditIcon className={classes.icon} />
            </IconButton>
            <IconButton
              onClick={onDelete}
              color="secondary"
              title="Delete"
              className={classes.icon}
            >
              <DeleteIcon className={classes.icon} />
            </IconButton>
          </Box>
        )}
      </React.Fragment>
    </Box>
  );
};

export default TodoItem;

let useStyles = makeStyles((theme) => ({
  "@keyframes slideInFromTop": {
    "0%": {
      transform: "translateY(15vh)",
      zIndex: "999",
    },
    "100%": {
      transform: "translateY(0)",
      zIndex: "1",
    },
  },
  "@keyframes fadein": {
    "0%": {
      opacity: 0,
    },
    "100%": {
      opacity: 1,
    },
  },
  "@keyframes changeHeight": {
    "0%": {
      fontSize: "0rem",
    },
    "100%": {
      display: "1rem",
    },
  },

  itemEdit: {
    marginBlock: "1%",
    display: "flex",
    width: "90%",
    marginLeft: "auto",
    marginRight: "auto",
    alignItems: "center",
    justifyContent: "space-between",
    background: "#f5f5f5",
    padding: "8px",
    border: "1px solid #ccc",
    borderRadius: "5px",
    boxShadow: "0px 5px 9px 0px #a5a4a4",
    animation: "$slideInFromTop 500ms ease-in ",
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
  editingBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    animation: "$fadein 300ms ease-out",
    gap: "2%",
    [theme.breakpoints.down("xs")]: {
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "flex-start",
    },
  },
  todoInfo: {
    display: "flex",

    justifyContent: "space-around",
    flexDirection: "row",
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
    },
  },
  textField: {
    marginBottom: "8px",
    [theme.breakpoints.down("sm")]: {
      marginBottom: "0",
      marginRight: "8px",
    },
  },
  todoInfoText: {
    fontSize: "1rem",
    fontFamily: "Exo-Regular",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9em !important",
      maxWidth: "50ch",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      fontSize: "0.6em !important",
      maxWidth: "15ch",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  statusText: {
    fontSize: "1rem",
    fontFamily: "Exo-Light",
    textAlign: "center",
    [theme.breakpoints.down("md")]: {
      fontSize: "0.7rem !important",
    },
    [theme.breakpoints.down("md")]: {
      fontSize: "0.7rem !important",
    },
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.6rem !important",
    },
  },
  deadline: {
    fontSize: "0.9rem",
    color: "#777",
    fontFamily: "Exo-Medium",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.4em !important",
    },
  },
  editingInputs: {
    paddingBlock: "1px",
  },
  icon: {
    animation: "$changeHeight 200ms ease-out",
    fontSize: "2rem",
    [theme.breakpoints.down("sm")]: {
      fontSize: "1rem",
      paddingInline: "1px",
    },
  },
  editDelBlock: {
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
    },
  },
  editBox: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "space-around",

    [theme.breakpoints.down("lg")]: {
      width: "100%",
      flexDirection: "row",
    },
    [theme.breakpoints.down("sm")]: {
      width: "100%",
      flexDirection: "row",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
  },
}));
