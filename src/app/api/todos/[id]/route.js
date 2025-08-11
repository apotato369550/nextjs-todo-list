// import { getTodos, saveTodos } from "@/lib/todos";
import { getTodos as getJsonTodos, saveTodos as saveJsonTodos } from '@/lib/todos';
import { supabase } from '@/utils/supabaseClient'

export async function GET(_, { params }) {
    // continue with this
    // logic: try -> db, catch -> json fallback
    // synchronize after put and post.

    try {
        const { data, error } = await supabase
        .from('todos')
        .select('*')
        .eq('id', params?.id)
        .single();

        if (error) {
            throw error;
        }

        if (!data) {
            return new Response(
            JSON.stringify({ error: "Todo not found..." }), 
            { status: 404 }
            );
        }

        return new Response(
            JSON.stringify(data),
            { headers: { 'Content-type': 'application/json'  } }
        );
    } catch (error) {
        console.warn("Supabase failed. Using JSON fallback.");
        const todos = getJsonTodos();
        const todoId = String(params?.id);
        // find todo using filtering
        const todo = todos.find(t => t.id === todoId);

        // if todo not found, return a bad response object 404
        if (!todo) {
            return new Response(JSON.stringify({ error: "Todo not found..." }), { status: 404 })
        }
        
        return new Response(
            JSON.stringify(todo),
            { headers: { 'Content-type': 'application/json'  } }
        );
    }
}

export async function PUT(request, { params }) {
    try {
        const body = await request.json();

        const { data, error } = await supabase
            .from('todos')
            .update(body)
            .eq('id', params?.id)
            .select()
            .single();

        if (error) {
            throw error;
        }

        if (!data) {
            return new Response(
                JSON.stringify({ error: "Todo not found..." }), 
                { status: 404 }
            );
        }

        return new Response(
            JSON.stringify(data),
            { headers: { 'Content-type': 'application/json' } }
        );

    } catch (error) {
        console.warn("Supabase failed. Using JSON fallback.");
        // JSON fallback
        const body = await request.json();
        const todos = getJsonTodos();
        const todoIndex = todos.findIndex(t => t.id === params?.id);

        if (todoIndex === -1) {
            return new Response(
                JSON.stringify({ error: "Todo not found..." }),
                { status: 404 }
            );
        }

        const updatedTodo = {
            ...todos[todoIndex],
            ...body
        };

        todos[todoIndex] = updatedTodo;
        const success = saveJsonTodos(todos);

        if (!success) {
            return new Response(
                JSON.stringify({ error: "Failed to update todo..." }),
                { status: 500 }
            );
        }

        return new Response(
            JSON.stringify(updatedTodo),
            { headers: { 'Content-type': 'application/json' } }
        );
    }
}