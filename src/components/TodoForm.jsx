import React from 'react'

const TodoForm = ({ setTitle, setDescription, createTask }) => {
  return (
    <div className="w-full">
      <div className="flex gap-2">
        <input 
          type="text" 
          placeholder='Enter task here...' 
          onChange={setTitle} 
          className="flex-grow border-2 border-gray-300 rounded-md px-3 py-2"
        />
        <input 
          type="text" 
          placeholder='Enter task description here' 
          onChange={setDescription}
          className="flex-grow border-2 border-gray-300 rounded-md px-3 py-2"
        />
        <button 
          className='bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded'
          onClick={createTask}
        >
          +
        </button>
      </div>
    </div>
  )
}

export default TodoForm