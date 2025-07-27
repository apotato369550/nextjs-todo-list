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
    <div>
      <h1>{todo.title}</h1>
      <p>{todo.description}</p>
      <button onClick={() => deleteTask(todo.id)}>X</button>
      <button onClick={() => completeTask(todo.id)}>Complete Task</button>
      <Link href={"../"}>
        <button>Go back to main page</button>
      </Link>
    </div>
  )
}

export default TodoDetails