import React from 'react'
import Link from 'next/link'
import axios from 'axios'
import { useState, useEffect } from 'react'

const TodoDetails = ({ id }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");
  const [deleted, setDeleted] = useState("");

  function getTask() {
    axios.get("/api/todos/" + id)
      .then(response => {
        console.log(response);

      })
  }

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

export default TodoDetails