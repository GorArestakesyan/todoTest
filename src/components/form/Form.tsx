import { makeStyles } from "@material-ui/core/styles";
import { Box } from "@mui/material";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import { useFormik } from "formik";
import React from "react";
import { useDispatch } from "react-redux";
import * as Yup from "yup";
import { addTodo } from "../../redux/todoSlice";

interface FormValues {
  todoTitle: string;
  todoDescription: string;
  todoDate: string;
}

const validationForForm = Yup.object().shape({
  todoTitle: Yup.string().required(),
  todoDescription: Yup.string().nullable(),
  todoDate: Yup.date().nullable(),
});

const Form: React.FC = () => {
  const classes = useStyles();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      todoTitle: "",
      todoDescription: "",
      todoDate: "",
    },
    validationSchema: validationForForm,
    onSubmit: (values: FormValues) => {
      const todoStatusCheck =
        new Date().getTime() > new Date(values.todoDate)?.getTime()
          ? "Overdue"
          : "Pending";

      const newTodo = {
        id: Math.random().toString(),
        status: todoStatusCheck,
        title: values.todoTitle,
        description: values.todoDescription,
        date: values.todoDate,
      };

      dispatch(addTodo(newTodo));
      formik.resetForm();
    },
  });

  return (
    <form className={classes.root} onSubmit={formik.handleSubmit}>
      <Box className={classes.inputsBox}>
        <TextField
          required
          InputProps={{
            classes: {
              input: classes.textInput,
            },
          }}
          id="todoTitle"
          name="todoTitle"
          label="Title"
          variant="outlined"
          size="small"
          value={formik.values.todoTitle}
          onChange={formik.handleChange}
          helperText={formik.touched.todoTitle && formik.errors.todoTitle}
        />
        <TextField
          id="todoDescription"
          name="todoDescription"
          label="Description"
          variant="outlined"
          size="small"
          InputProps={{
            classes: {
              input: classes.textInput,
            },
          }}
          value={formik.values.todoDescription}
          onChange={formik.handleChange}
          helperText={
            formik.touched.todoDescription && formik.errors.todoDescription
          }
        />
        <TextField
          id="dateField"
          name="todoDate"
          type="date"
          size="small"
          variant="outlined"
          InputProps={{
            classes: {
              input: classes.textInput,
            },
          }}
          InputLabelProps={{
            shrink: true,
          }}
          value={formik.values.todoDate}
          onChange={formik.handleChange}
          helperText={formik.touched.todoDate && formik.errors.todoDate}
        />
      </Box>
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
    flexDirection: "row",
    flexWrap: "wrap",
    alignItems: "center",
    margin: "0 auto",
    justifyContent: "center",
    marginTop: "4vh",
    maxWidth: "100%",
    [theme.breakpoints.down("lg")]: {
      flexDirection: "row",
    },
    [theme.breakpoints.down("sm")]: {
      flexDirection: "column",
    },
  },
  inputsBox: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    [theme.breakpoints.down("md")]: {
      flexDirection: "column",
    },
  },
  textInput: {
    fontFamily: "Exo-Light !important",
  },
}));
