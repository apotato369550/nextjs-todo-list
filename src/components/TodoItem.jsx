import React from 'react'
import Link from 'next/link'

const TodoItem = ({ todo, deleteTask }) => {
  return (
    <div>
      <h1>{todo.title}</h1>
      <button onClick={() => deleteTask(todo.id)}>X</button>
      <Link href={"/todos/" + todo.id}>
        <button>View Todo</button>
      </Link>
    </div>
  )
}

export default TodoItem