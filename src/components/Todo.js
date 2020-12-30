import { useRef, useState, useEffect } from "react";
import "../styles/Todo.css";

const Todo = ({ id, task, completed, toggleTodo, removeTodo, updateTodo }) => {

    const [editing, setEditing] = useState(false);
    const [editFormValue, setEditFormValue] = useState(task);
    const [editBtnDisabled, setEditBtnDisabled] = useState(false);

    const editBtnRef = useRef(null);
    const editFormRef = useRef(null);

    useEffect(() => {
        if(editFormValue.trim() === "")
            setEditBtnDisabled(true);
        else
            setEditBtnDisabled(false);
    },[editFormValue])

    useEffect(() => {
        if(editing){
            editFormRef.current.focus();
        }
    }, [editing])

    return (

        <li className="Todo" 
        onClick={() => toggleTodo(id)}>

            <div className={`Todo-text ${completed ? "Todo__completed" : "" }`}
            >
                
                {
                !editing ?
                    task
                :
                <form 
                
                onSubmit={(e) => {
                    e.preventDefault();
                    editBtnRef.current.click();
                }}>
                    <input 
                    ref={editFormRef}
                    className="Todo-editForm"
                    value={editFormValue}
                    onChange={(e) => setEditFormValue(e.target.value)}
                    onClick={(e) => e.stopPropagation()}
                    />
                </form>
                }

            </div>


            {/* Show edit button if user is NOT currently editing */}
            {!editing &&

                <button className="Todo-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditing(!editing);
                    }} >
                    🖊
            </button>

            }

            {/* Show tick button if user is currently editing */}
            {editing &&

                <button ref={editBtnRef} 
                    className={`Todo-btn ${editBtnDisabled ? "Todo-btn__disabled" : ""}`}
                    disabled={editBtnDisabled}
                    onClick={(e) => {
                        e.stopPropagation();
                        updateTodo(id, editFormValue);
                        setEditing(!editing);
                    }} >
                    ✔
            </button>

            }
            {/* Show cancel button if user is currently editing */}
            {editing &&

                <button
                    className="Todo-btn"
                    onClick={(e) => {
                        e.stopPropagation();
                        setEditFormValue(task);
                        setEditing(!editing);
                    }} >
                    🚫
            </button>

            }

            <button className="Todo-btn" 
            onClick={(e) => {
                e.stopPropagation();
                removeTodo(id);
            }} >
                ❌
            </button>

        </li>
    )
}

export default Todo
