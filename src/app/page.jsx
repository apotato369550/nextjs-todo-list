import TodoForm from "@/components/TodoForm";
import TodoItem from "@/components/TodoItem";

import { useEffect, useState } from "react";

const Home = () => {
  const [todos, setTodos] = useState([])

  useEffect(() => {
    fetch('api/todos')
      .then(response => response.json())
      .then(data = setTodos(data))
  }, [])

  return (
    <div>
      <h1>next.js Todo List :DD</h1>
      <TodoForm />
      {todos.map(todo => {
        <TodoItem key={todo.key} todo={todo} />
      })}
    </div>
  )
}

export default Home