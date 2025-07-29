"use client"

import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react'
import TodoList from './TodoList'

const TodoDetails = ({ id }) => {
  const [todo, setTodo] = useState({})

  async function getTask() {
    try {
      const response = await axios.get(`/api/todos/${id}`);
      console.log(response);
      setTodo(response.data);
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  }

  function deleteTask(id) {
    return;
  }

  function completeTask(id) {
    return;
  }

  useEffect(() => {
    getTask();
  }, [])

  return (
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-6 py-12'>
      <div className='bg-white shadow-md rounded-lg p-8 w-full max-w-2xl space-y-6'>
        <h1 className='text-3xl font-bold text-gray-800 break-words'>{todo.title}</h1>
        <p className='text-gray-700 text-lg whitespace-pre-wrap'>{todo.description}</p>

        <div className='flex justify-between items-center gap-6'>
          <button className='bg-red-500 text-white px-6 py-3 rounded-lg hover:bg-red-600 transition-colors font-medium' 
            onClick={() => deleteTask(todo.id)}>
            Delete
          </button>

          <button className='bg-green-500 text-white px-6 py-3 rounded-lg hover:bg-green-600 transition-colors font-medium' 
            onClick={() => completeTask(todo.id)}>
            Complete Task
          </button>
        </div>

        <Link href={"../"} className="block">
          <button className='w-full bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition-colors font-medium'>
            Back to Main Page
          </button>
        </Link>
      </div>
    </div>
  )
}

export default TodoDetails