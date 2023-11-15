import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import { makeStyles } from "@material-ui/core/styles";
import React, { useState } from "react";

const Form = ({ todos, setTodos }) => {
  const classes = useStyles();
  const [formData, setFormData] = useState({
    todoTitle: "",
    todoDescription: "",
    todoDate: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    let todoStatusCheck =
      new Date().getTime() > new Date(formData.todoDate)?.getTime()
        ? "Overdue"
        : "Pending";

    let newTodo = {
      id: Math.random().toString(),
      status: todoStatusCheck,
      title: formData.todoTitle,
      description: formData.todoDescription,
      date: formData.todoDate,
    };

    setTodos({ ...todos, todos: [...todos?.todos, newTodo] });
    setFormData({
      todoTitle: "",
      todoDescription: "",
      todoDate: "",
    });
  };

  return (
    <form className={classes.root} onSubmit={handleSubmit}>
      <TextField
        required
        id="todoTitle"
        name="todoTitle"
        label="Todo title"
        variant="outlined"
        value={formData.todoTitle}
        onChange={handleChange}
      />
      <TextField
        id="todoDescription"
        name="todoDescription"
        label="Description"
        variant="outlined"
        value={formData.todoDescription}
        onChange={handleChange}
      />
      <TextField
        id="dateField"
        name="todoDate"
        label="Date"
        type="date"
        variant="outlined"
        InputLabelProps={{
          shrink: true,
        }}
        value={formData.todoDate}
        onChange={handleChange}
      />
      <Button type="submit" variant="contained" color="primary">
        Add Todo
      </Button>
    </form>
  );
};

export default Form;

let useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
    display: "flex",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "0 auto",
    justifyContent: "center",
    marginTop: "4vh",
    maxWidth: "80vw",
  },
}));
