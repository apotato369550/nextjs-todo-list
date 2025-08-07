import { supabase } from '@/utils/supabaseClient';
import { getTodos as getJsonTodos, saveTodos as saveJsonTodos } from '@/lib/todos';

// figure out routes????

export async function GET() {
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

export async function POST(request) {
  try {
    const body = await request.json();

    const { data, error } = await supabase
      .from('todos')
      .insert([{ title: body.title, description: body.description }])
      .select()
      .single()
    
    if (error) {
      throw error;
    }
    return new Response(
      JSON.stringify(data),
      { status: 201, headers: { 'Content-type': 'application/json'  } }
    )
  } catch (error) {
    // do stuff here
    console.log(error);
    const todos = getJsonTodos();
    const newTodo = {
      id: Date.now().toString(),
      title: body.title,
      description: body.description,
      completed: false,
      deleted: false
    };

    saveJsonTodos([...todos, newTodo]);

    return new Response(
      JSON.stringify(data),
      { status: 201, headers: { 'Content-type': 'application/json'  } }
    )
  }
}