import { useState } from "react";
import "../styles/TodoList.css";

// TODO Add Toast Notifications on add, updated and delete using https://react-hot-toast.com/
// TODO Add LocalStorage support with message showing if tasks were loaded from local storage or not
// TODO Add animations to smooth the add, updated and delete actions
// TODO Add a very simple dark mode function

// Import external libs && functions
// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from "uuid";
import Toast from "./Toaster/Toast";


// Import components
import Todo from "./Todo";
import AddTodoForm from "./AddTodoForm";

const TodoList = () => {

    const [todos, setTodos] = useState([
        {
            id: uuidv4(),
            task: "👆 Enter your first task above",
            completed:false
        },
        {
            id: uuidv4(),
            task: "Click on a task to complete it",
            completed:false
        },
        {
            id: uuidv4(),
            task: "Click ❌ to remove this task 👉",
            completed:false
        },
        {
            id: uuidv4(),
            task: "Click 🖊 to edit this task 👉",
            completed:false
        },
    ]);

    const addNewTodo = newTodo => {
        setTodos([...todos, newTodo]);
        Toast("success", "Task added");
        
    }

    const removeTodo = id => {
        setTodos([...todos.filter(todo => todo.id !== id)]);
        Toast("success", "Task removed");
    }

    const toggleTodo = id => {

        // Implementation taken from MDN
        // https://developer.mozilla.org/en-US/docs/Learn/Tools_and_testing/Client-side_JavaScript_frameworks/React_interactivity_events_state#Completing_a_task
        const updatedTodos = todos.map(todo => {
            if(todo.id === id)
                return {...todo, completed: !todo.completed}

            return todo;
        })

        setTodos(updatedTodos)

    }

    const updateTodo = (id, updatedTask) => {
        const updatedTodos = todos.map((todo) => {
            if(todo.id === id)
                return {...todo, task: updatedTask}
            
            return todo
        })

        setTodos(updatedTodos);
        Toast("success", "Task updated");
    }

    return (
        <div className="TodoList">

            <AddTodoForm addNewTodo={addNewTodo} />

            <ul className="TodoList-todos">

                <h3>Active Tasks</h3>

                {
                    todos.filter(todo => !todo.completed).length !== 0 ?

                        todos.filter(todo => !todo.completed).map(todo => (
                            <Todo
                                key={todo.id}
                                id={todo.id}
                                task={todo.task}
                                completed={todo.completed}
                                toggleTodo={toggleTodo}
                                removeTodo={removeTodo}
                                updateTodo={updateTodo} />
                        ))

                        :
                        <p>No active tasks</p>
                }


                <h3>Completed Tasks</h3>

                {
                    todos.filter(todo => todo.completed).length !== 0 ?

                    todos.filter(todo => todo.completed).map(todo => (
                        <Todo
                            key={todo.id}
                            id={todo.id}
                            task={todo.task}
                            completed={todo.completed}
                            toggleTodo={toggleTodo}
                            removeTodo={removeTodo}
                            updateTodo={updateTodo} />
                    ))

                    : 
                    <p>No completed tasks</p>

                }             

            </ul>
        </div>
    )
}

export default TodoList
