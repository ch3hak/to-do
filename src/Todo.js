import React from 'react'

const style = {
  textComplete: {
    textDecoration: "line-through"
  }
}

const Todo = ({todo}) => {
  return (
    <li>
      <div>
        <input type="checkbox" checked={todo.completed ? 'checked' : ''} />
        <p style={todo.completed ? style.textComplete : {}}>{todo.text}</p>
      </div>
      <button>-</button>
    </li>
  )
}

export default Todo;