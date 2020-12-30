import { useState } from "react";
import "../styles/TodoList.css";

// Import external libs
// https://www.npmjs.com/package/uuid
import { v4 as uuidv4 } from "uuid";

// Import components
import Todo from "./Todo";
import AddTodoForm from "./AddTodoForm";

const TodoList = () => {

    const [todos, setTodos] = useState([
        {
            id: uuidv4(),
            task: "👆 Enter your first todo above",
            completed:false
        },
        {
            id: uuidv4(),
            task: "Click a task to complete it",
            completed:false
        },
    ]);

    const addNewTodo = newTodo => setTodos([
        ...todos,
        newTodo
    ]);

    const removeTodo = id => setTodos([...todos.filter(todo => todo.id !== id)])

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
    }

    return (
        <div className="TodoList">

            <AddTodoForm addNewTodo={addNewTodo} />

            <ul className="TodoList-todos">

                {todos.length !== 0 ?
                    todos.map((todo) => (
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
                    <p>No todos created</p>
                }

            </ul>
        </div>
    )
}

export default TodoList
