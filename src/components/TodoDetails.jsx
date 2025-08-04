"use client"

import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

const TodoDetails = ({ id }) => {
  const [todo, setTodo] = useState({})
  const router = useRouter();

  async function getTask() {
    try {
      const response = await axios.get(`/api/todos/${id}`);
      console.log(response);
      setTodo(response.data);
    } catch (error) {
      console.error('Error fetching todo:', error);
    }
  }

  function completeTask(id) {
    console.log("completing task" + id);
    axios.put(`/api/todos/${id}`, {
      completed: true,
    }).then(response => {
      console.log(response.data);
      getTask();
    }).catch(error => {
      console.error(error);
    })
  }

  // create "uncomplete" function
  function uncompleteTask(id) {
    console.log("uncompleting task" + id);
    axios.put(`/api/todos/${id}`, {
      completed: false,
    }).then(response => {
      console.log(response.data);
      getTask();
    }).catch(error => {
      console.error(error);
    })
  }

  function deleteTask(id) {
    console.log("Deleting task: " + id);
    axios.put(`/api/todos/${id}`, {
      deleted: true,
    }).then(response => {
      console.log(response.data);
      router.push("/");
    }).catch(error => {
      console.error(error);
    })
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