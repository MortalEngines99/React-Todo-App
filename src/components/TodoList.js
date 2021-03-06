import { useState, useEffect } from "react";
import "../styles/TodoList.css";

// Features which can be implemented in the future
// TODO Add animations to smooth the add, updated and delete actions
// TODO Add a very simple dark mode function

// Import external libs && functions
// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from "uuid";
import Toast from "./Toast/Toast";


// Import components
import Todo from "./Todo";
import AddTodoForm from "./AddTodoForm";

const TodoList = () => {

    const originalTodos = [
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
    ]

    const [todos, setTodos] = useState(originalTodos);

    useEffect(() => {
        const storedTodos = localStorage.getItem("todos");
        
        if(storedTodos !== null){

            const todosFromStorage = JSON.parse(localStorage.getItem("todos"));
            
            setTodos(todosFromStorage);
            Toast("success", "Tasks synced from localStorage",{duration:5000});
        }

    },[])

    useEffect(() => {

        if(todos.length !== 0)
            localStorage.setItem("todos", JSON.stringify(todos));

    }, [todos])

    const clearLocalStorage = () => {
        localStorage.clear();
        Toast("success", "Local Storage cleared, refresh the page to view the default tasks", {duration:3000});
        setTodos([]);
    };


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

            <button className="TodoList-resetBtn" onClick={() => clearLocalStorage()}>Clear Local Storage</button>

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
