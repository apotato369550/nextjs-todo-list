// import { getTodos, saveTodos } from "@/lib/todos";
import { getTodos as getJsonTodos, saveTodos as saveJsonTodos } from '@/lib/todos';
import { supabase } from '@/utils/supabaseClient'

export async function GET(_, { params }) {
    // continue with this
    // logic: try -> db, catch -> json fallback
    // synchronize after put and post.
    const todos = getTodos();
    const todoId = String(params?.id);
    // find todo using filtering
    const todo = todos.find(t => t.id === todoId);

    // if todo not found, return a bad response object 404
    if (!todo) {
        return new Response(JSON.stringify({ error: "Todo not found..." }), { status: 404 })
    }

    try {
        const { data, error } = await supabase
        .from('supabase-todo-list')
        .select('*')
        .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        return new Response(
            JSON.stringify(data),
            { headers: { 'Content-type': 'application/json'  } }
        );
    } catch (error) {
        console.warn("Supabase failed. Using JSON fallback.");
        const data = getJsonTodos();
        return new Response(
        JSON.stringify(data),
        { headers: { 'Content-type': 'application/json'  } }
        )
    }
}

export async function PUT(request, { params }) {
    // get body using await
    const body = await request.json();
    // get todos using getTodos()
    const todos = getTodos();
    // get index using findIndex with condition
    const todoIndex = todos.findIndex(t => t.id === params?.id);

    // if index == -1, return a new response object 404 todo not found
    // fixed todoindex bug (used index instead of todoIndex)
    if (todoIndex === -1) {
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