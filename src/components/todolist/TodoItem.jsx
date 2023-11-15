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

const TodoItem = ({ todo, todos, trash, setTodos }) => {
  const classes = useStyles();
  const [isEditing, setEditing] = useState(false);
  const [editedTodo, setEditedTodo] = useState({
    ...todo,
  });

  const handleEditToggle = () => {
    setEditing(!isEditing);
    setEditedTodo({
      ...todo,
    });
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

    setTodos({ trash, todos: updatedTodos });
  };

  const onDelete = () => {
    setTodos({
      trash: trash.some((el) => el.id === todo.id) ? trash : [...trash, todo],
      todos: todos.filter((item) => item.id !== todo.id),
    });
  };

  const handleSave = () => {
    const updatedTodos = todos.map((item) =>
      item.id === todo.id ? editedTodo : item
    );

    setTodos({ trash, todos: updatedTodos });
    setEditing(false);
  };

  const handleEditDate = (e) => {
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
          checked={todo.status !== "Completed" ? false : true}
          onChange={handleCheck}
          sx={{
            [`&, &.${checkboxClasses.checked}`]: {
              color: "#00d900",
            },
          }}
        />
      )}
      {!isEditing && (
        <Typography className={classes.statusText}>
          Status : {todo.status}
        </Typography>
      )}
      <Box className={classes.todoInfo}>
        <Box className={classes.editBox}>
          {isEditing ? (
            <>
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                className={classes.editingInputs}
                value={editedTodo.title}
                onChange={(e) =>
                  setEditedTodo({ ...editedTodo, title: e.target.value })
                }
              />
              <TextField
                fullWidth
                size="small"
                variant="outlined"
                className={classes.editingInputs}
                value={editedTodo.description}
                onChange={(e) =>
                  setEditedTodo({ ...editedTodo, description: e.target.value })
                }
              />
            </>
          ) : (
            <Typography className={classes.todoInfoText}>
              {todo.title}
            </Typography>
          )}
          {isEditing ? (
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
          ) : (
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
      <>
        {isEditing ? (
          <IconButton onClick={handleSave} color="primary" title="Save">
            <SaveIcon />
          </IconButton>
        ) : (
          <Box className={classes.editDelBlock}>
            <IconButton onClick={handleEditToggle} color="primary" title="Edit">
              <EditIcon className={classes.icon} />
            </IconButton>
            <IconButton onClick={onDelete} color="secondary" title="Delete">
              <DeleteIcon className={classes.icon} />
            </IconButton>
          </Box>
        )}
      </>
    </Box>
  );
};

export default TodoItem;

let useStyles = makeStyles((theme) => ({
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

    [theme.breakpoints.down("md")]: {
      width: "90%",
    },
    [theme.breakpoints.down("sm")]: {
      padding: "4px",
      width: "100%",
    },
  },

  todoInfo: {
    display: "flex",
    justifyContent: "space-around",
    flexGrow: 1,
    [theme.breakpoints.down("sm")]: {
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
    [theme.breakpoints.down("md")]: {
      fontSize: "0.9em !important",
      maxWidth: "50ch",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
    [theme.breakpoints.down("xs")]: {
      fontSize: "0.6em !important",
      maxWidth: "15ch",
      overflow: "hidden",
      whiteSpace: "nowrap",
      textOverflow: "ellipsis",
    },
  },
  statusText: {
    fontSize: "1rem",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.7em !important",
    },
  },
  deadline: {
    fontSize: "0.9rem",
    color: "#777",
    textAlign: "center",
    [theme.breakpoints.down("sm")]: {
      fontSize: "0.8em !important",
    },
  },
  editingInputs: {
    paddingBlock: "10px",
  },
  icon: {
    [theme.breakpoints.down("sm")]: {
      fontSize: "medium",
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
    width: "80%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-around",
    flexDirection: "row",
    [theme.breakpoints.down("lg")]: {
      width: "100%",
    },
    [theme.breakpoints.down("xs")]: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      width: "100%",
    },
  },
}));
