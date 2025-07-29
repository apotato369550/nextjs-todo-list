import { getTodos, saveTodos } from "@/lib/todos";

export async function GET(_, { params }) {
    const todos = getTodos();
    const todoId = String(params.id);
    // find todo using filtering
    const todo = todos.find(t => t.id === todoId);

    // if todo not found, return a bad response object 404
    if (!todo) {
        return new Response({ error: "Todo not found..." }, { status: 404 })
    }


    // otherwise, return 200
    return new Response(
        JSON.stringify(todo),
        {
            status: 200,
            headers: { 'Content-Type': 'application/json' }
        }
    );
}

export async function PUT(request, { params }) {
    // get body using await
    const body = await request.json();
    // get todos using getTodos()
    const todos = getTodos();
    // get index using findIndex with condition
    const todoIndex = todos.findIndex(t => t.id === params.id);

    // if index == -1, return a new response object 404 todo not found
    if (index === -1) {
        return new Response(
            { error: "Todo not found..." },
            { status: 404 }
        );
    }

    // create an updated todo using ellipses
    const updatedTodo = {
        ...todos[todoIndex],
        ...body // this part overrides any fields...
    }

    // change todo using index
    todos[todoIndex] = updatedTodo;

    // save todo store in success variable
    const success = saveTodos(todos);
    
    // if not successfully saved, failed to update todo, return 500
    if (!success) {
        // if failed to save, failed to delete, return 500
        return new Response(
            { error: "Failed to update todo..." },
            { status: 500 }
        );

    } 

    // otherwise, all is well, return updated todo and status 200
    return new Response(
        JSON.stringify(updatedTodo),
        { status: 200 }
    );
}