import { getTodos, saveTodos } from "@/lib/todos";

export async function GET(_, { params }) {
    const todos = getTodos();
    const todoId = params.id;
    // find todo using filtering

    // if todo not found, return a bad response object 404
    // otherwise, return 200
}

export async function DELETE(_, { params }) {
    const todos = getTodos();
    const todoId = params.id;
    // find todo using loops/filtering

    // check if the filtered todos length == the current todos length
    // if they're equal, todo does not exist, return 494
    // save the filtered todos
    // if failed to save, failed to delete, return 500

    // otherwise, all is well. return null object + status 204
}

export async function PUT(response, { params }) {
    // get body using await
    // get todos using getTodos()
    // get index using findIndex with condition

    // if index == -1, return a new response object 404 todo not found

    // create an updated todo using ellipses

    // change todo using index
    // save todo store in success variable
    // if not successfully saved, failed to update todo, return 500

    // otherwise, all is well, return updated todo and status 200
}