import React from "react";
import Form from "../form/Form";
import ListOfTodos from "./ListOfTodos";

function Todos() {
  return (
    <React.Fragment>
      <Form />
      <ListOfTodos />
    </React.Fragment>
  );
}

export default Todos;
