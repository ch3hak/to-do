import React, { useState, useEffect } from "react";
import Todo from "./Todo";
import { query, collection, onSnapshot } from "firebase/firestore";
import { db } from "./firebase";

function App() {

  const [todos, setTodos] = useState([])

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


  return (
    <div>
      <div>
        <h3>To-do</h3>

        <form>
          <input type="text" placeholder="Add Task" />
          <button>+</button>
        </form>
        <ul>
          {todos.map((todo, index)=> (
            <Todo key={index} todo={todo}/>
          ))}
        
        </ul>
        <p>2 Tasks</p>
      </div>
    </div>
  );
}

export default App;
