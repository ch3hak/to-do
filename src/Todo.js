import React from 'react'

const style = {
  textComplete: {
    textDecoration: "line-through"
  }
}

const Todo = ({todo, toggleComplete, deleteTodo}) => {
  return (
    <li>
      <div>
        <input onChange={() => toggleComplete(todo)} type="checkbox" checked={todo.completed ? 'checked' : ''} />
        <p onClick={() => toggleComplete(todo)} style={todo.completed ? style.textComplete : {}}>{todo.text}</p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>-</button>
    </li>
  )
}

export default Todo;