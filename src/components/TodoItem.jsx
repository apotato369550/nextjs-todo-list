import React from 'react'

const TodoItem = ({ todo }) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-4">{todo.title}</h1>
      <p className="text-base text-gray-600">{todo.description}</p>
    </div>
  )
}

export default TodoItem