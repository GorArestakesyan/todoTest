import "./App.css";
import Header from "./components/header/Header";
import TodoList from "./components/todolist/TodoList";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Header />
      </header>
      <body>
        <TodoList />
      </body>
    </div>
  );
}

export default App;
