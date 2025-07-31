import React from 'react'
import Link from 'next/link'

const TodoItem = ({ todo, completeTask, uncompleteTask, deleteTask }) => {
  return (
    <div className='bg-white shadow p-4 rounded flex justify-between items-center w-full max-w-4xl mx-auto my-2'>
      <div className='flex-1'>
        <p className='text-lg font-medium'>{todo.title}</p>
      </div>

      <div className='flex space-x-3'>

        {todo.completed ? (
          <button 
            className='bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => uncompleteTask(todo.id)}
          >
            Undo
          </button>
        ) : (
          <button 
            className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
            onClick={() => completeTask(todo.id)}
          >
            Complete Task
          </button>
        )}

        <button 
          className='bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded'
          onClick={() => deleteTask(todo.id)}
        >
          X
        </button>

        <Link href={"/todos/" + todo.id}>
          <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
            View Todo
          </button>
        </Link>
      </div>
    </div>
  )
}

export default TodoItem