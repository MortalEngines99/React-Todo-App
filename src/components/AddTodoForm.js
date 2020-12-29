import { useEffect, useState } from "react"
import "../styles/AddTodoForm.css"

//Import libs
import { v4 as uuidv4 } from "uuid";

const AddTodoForm = ({ addNewTodo }) => {

    const [todoInput, setTodoInput] = useState("");
    const [btnDisabled, setBtnDisabled] = useState(true)

    useEffect(() => {
        if(todoInput.trim() === "")
            setBtnDisabled(true);
        else
            setBtnDisabled(false);

    },[todoInput])

    const handleSubmit = (e) => {
        e.preventDefault();
    
        addNewTodo({
            id: uuidv4(),
            task: todoInput,
            completed: false
        })

        setTodoInput("");
    }

    return (
        <form className="AddTodoForm">
            <input 
            className="AddTodoForm-input AddTodoForm-input__todo"
            placeholder="Enter todo"
            value={todoInput}
            onChange={e => setTodoInput(e.target.value)}
            maxLength={250}
            />

            <button 
            disabled={btnDisabled}
            className={`AddTodoForm-input AddTodoForm-addBtn ${btnDisabled ? "AddTodoForm-addBtn__disabled" : ""}`}
            onClick={handleSubmit}
            >Add todo</button>
        </form>
    )
}

export default AddTodoForm
