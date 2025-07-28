import React from 'react'
import Link from 'next/link'

const TodoItem = ({ todo, completeTask, deleteTask }) => {
  return (
    <div className='bg-white shadow p-4 rounded flex justify-between items-center'>
      <p className='text-lg font-medium'>{todo.title}</p>

      <div>
        <button className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded mx-4' onClick={() => deleteTask(todo.id)}>Complete Task</button>

        <button className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mx-4' onClick={() => deleteTask(todo.id)}>X</button>

        <Link href={"/todos/" + todo.id}>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mx-4'>View Todo</button>
        </Link>
      </div>
    </div>
  )
}

export default TodoItem