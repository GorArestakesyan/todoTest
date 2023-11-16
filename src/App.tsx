import { ThemeProvider, createTheme } from "@mui/material/styles";
import React from "react";
import { Provider } from "react-redux";
import "./App.css";
import Header from "./components/header/Header";
import TodoList from "./components/todolist/Todos";
import store from "./redux/store";

const theme = createTheme({
  typography: {
    fontFamily: ["Exo-Regular", "Exo-Medium", "Exo-Light"].join(","),
  },
});
function App() {
  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <div className="App">
          <header className="App-header">
            <Header />
          </header>
          <div className="bodyContainer">
            <TodoList />
          </div>
        </div>
      </ThemeProvider>
    </Provider>
  );
}

export default App;
