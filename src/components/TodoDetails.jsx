"use client"

import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react'
import TodoList from './TodoList'

const TodoDetails = ({ id }) => {
  /*
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");
  const [deleted, setDeleted] = useState("");
  */
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
    <div className='min-h-screen bg-gray-100 flex items-center justify-center px-4 py-8'>
      <div className='bg-white shadow-md rounded-lg p-6 w-full max-w-xl space-y-4'>
        <h1 className='text-2xl font-bold text-gray-800'>{todo.title}</h1>
        <p className='text-gray-700'>{todo.description}</p>

        <div className='flex justify-between gap-4'>
          <button className='bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition' onClick={() => deleteTask(todo.id)}>X</button>

          <button className='bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition' onClick={() => completeTask(todo.id)}>Complete Task</button>
        </div>
        <Link href={"../"}>
          <button>Go back to main page</button>
        </Link>
      </div>
    </div>
  )
}

export default TodoDetails