"use client"

import { useEffect, useState } from "react" 
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

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

    function deleteTask(id) {
        console.log("Deleting task: " + id);
        return;
    }

    function createTask() {
        console.log("Creating task: ");
        console.log(title);
        console.log(description);
        return;
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div>
        <h1>next.js Todo List :DD</h1>
        <TodoForm setTitle={setTitle} setDescription={setDescription} createTask={createTask} />
        {todos.map(todo => {
            console.log(todo);
            if (!todo.deleted) {
                return <TodoItem key={todo.key} todo={todo} deleteTask={deleteTask}/>
            }
        })}
        </div>
    )
}

export default TodoList