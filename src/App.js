import './App.css';
import { Toaster } from "react-hot-toast";

// Importing components 
import TodoList from "./components/TodoList";

function App() {
  return (
    <div className="App">

      <Toaster 
      position="top-right"
      toastOptions={{
          duration:2000,
          style: {
            background: '#363636',
            color: '#fff',
            zIndex: 1,
          },
          
      }}
      />

      <h1 className="App-title">Todo Application</h1>

      <TodoList />

    </div>
  );
}

export default App;
