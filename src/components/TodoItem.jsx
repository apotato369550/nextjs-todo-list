import React from 'react'
import Link from 'next/link'

const TodoItem = ({ todo, deleteTask }) => {
  return (
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <button onClick={() => deleteTask(todo.id)}>X</button>
    </div>
  )
}

export default TodoItem