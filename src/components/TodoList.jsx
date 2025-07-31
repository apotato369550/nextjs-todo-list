"use client"

import { useEffect, useState } from "react" 
import TodoForm from "./TodoForm"
import TodoItem from "./TodoItem"
import axios from "axios"

const TodoList = () => {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");

    function getTasks() {
        console.log("Getting/updating tasks");
        axios.get('/api/todos')
            .then(response => {
                // console.log(response);
                setTodos(response.data);
            })
            .catch((error) => {
                console.log(error);
            })
    }

    function completeTask(id) {
        console.log("completing task" + id);
        axios.put(`/api/todos/${id}`, {
            completed: true,
        }).then(response => {
            console.log(response.data);
            setTodos([...todos, response.data]);
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
            getTasks();
            console.log(response.data);
            setTodos([...todos, response.data]);
        }).catch(error => {
            console.error(error);
        })
    }

    function deleteTask(id) {
        console.log("Deleting task: " + id);
        axios.put(`/api/todos/${id}`, {
            deleted: true,
        }).then(response => {
            getTasks();
            console.log(response.data);
            setTodos([...todos, response.data]);
        }).catch(error => {
            console.error(error);
        })
    }

    // test if the thingy works

    function createTask() {
        console.log("Creating task: ");
        console.log(title);
        console.log(description);
        axios.post(`api/todos`, {
            title: title,
            description: description
        }).then(response => {
            getTasks();
            console.log(response.data);
        }).catch(error => {
            console.error(error);
        })
        return;
    }

    useEffect(() => {
        getTasks()
    }, [])

    return (
        <div className="min-h-screen bg-gray-100 py-10 px-4">
            <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">next.js Todo List :DD</h1>

            <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
                <TodoForm setTitle={setTitle} setDescription={setDescription} createTask={createTask} />
            </div>

            <div className="mt-8 space-y-4 max-w-xl mx-auto">
                {todos.map(todo => {
                    console.log(todo);
                    if (!todo.deleted) {
                        return <TodoItem key={todo.id} todo={todo} completeTask={completeTask} uncompleteTask={uncompleteTask} deleteTask={deleteTask}/>
                    }
                })}
            </div>
        </div>
    )
}

export default TodoList