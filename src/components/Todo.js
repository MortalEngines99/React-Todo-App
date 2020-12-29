import "../styles/Todo.css";

// @Todo
// -> Add delete btn

const Todo = ({ id, task, completed, toggleTodo, removeTodo }) => {
    return (

        <li className="Todo" 
        onClick={() => toggleTodo(id)}>

            <div className={`Todo-text ${completed ? "Todo__completed" : "" }`}>
                {task}
            </div>

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
