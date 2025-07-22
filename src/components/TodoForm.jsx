import React from 'react'

const TodoForm = ({ setTitle, setDescription, createTask }) => {
  return (
    <div>
      <div>
        <input type="text" placeholder='Enter task here...' onChange={setTitle} />
        <input type="text" placeholder='Enter task description here' onChange={setDescription}/>
        <button onClick={createTask}>+</button>
      </div>
    </div>
  )
}

export default TodoForm