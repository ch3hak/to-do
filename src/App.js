import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { query, collection, onSnapshot, updateDoc, doc, addDoc } from "firebase/firestore";
import { db } from "./firebase";

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  const createTodo = async (e) => {
    e.preventDefault(e)
    if(input === '') {
      alert('enter a valid to-do')
      return
    }
    await addDoc(collection(db, 'todos'), {
      text: input,
      completed: false,
    })
  }

  useEffect(() => {
    const q = query(collection(db, 'todos'))
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [] 
      querySnapshot.forEach(doc => {
        todosArr.push({...doc.data(), id: doc.id})
      });
      setTodos(todosArr)
    })
    return () => unsubscribe()
  }, [])

  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, 'todos', todo.id), {
      completed: !todo.completed
    })
  }


  return (
    <div>
      <div>
        <h3>To-do</h3>

        <form onSubmit={createTodo}>
          <input 
            value={input} 
            onChange={(e) => setInput(e.target.value)} 
            type="text" 
            placeholder="Add Task" 
          />
          <button>+</button>
        </form>
        <ul>
          {todos.map((todo, index)=> (
            <Todo key={index} todo={todo} toggleComplete={toggleComplete}/>
          ))}
        
        </ul>
        <p>2 Tasks</p>
      </div>
    </div>
  );
}

export default App;
