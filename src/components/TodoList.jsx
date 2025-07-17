"use client"

import { useEffect, useState } from "react" 
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"

const TodoList = () => {
    const [todos, setTodos] = useState([]);

    function getTasks() {
        console.log("Getting/updating tasks");
        axios.get('/api/todos')
            .then(response => {
                console.log(response);
                setTodos(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div>
        <h1>next.js Todo List :DD</h1>
        <TodoForm />
        {todos.map(todo => {
            console.log(todo);
            return <TodoItem key={todo.key} todo={todo} />
        })}
        </div>
    )
}

export default TodoList