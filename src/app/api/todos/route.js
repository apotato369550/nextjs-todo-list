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
        {
          headers: {
            'Content-type': 'application/json'
          }
        }
      );
  } catch (error) {
    // continue here
    // actually, i think it's advisable to speedrun this section ngl
    // learning deeply aint that helpful :VV
  }

  /*
  const todos = getJsonTodos();

  return new Response(JSON.stringify(todos), {
    headers: { 'Content-Type': 'application/json' }
  });
  */
}

export async function POST(request) {
  const body = await request.json();

  // call get todos function
  const todos = getJsonTodos();

  // create new todo object
  const newTodo = {
    id: Date.now().toString(),
    title: body.title,
    description: body.description,
    completed: false,
    deleted: false
  };

  // update todo with ellipsis and assign to variable
  const updatedTodos = [...todos, newTodo];

  // call saveTodo function (to be made)
  if (saveJsonTodos(updatedTodos)) {
    return new Response(JSON.stringify(newTodo), {
      status: 200,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  } else {
    return new Response(JSON.stringify({
      error: 'Failed to save todo...'
    }), {
      status: 500,
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }
  

  // return a response object <-- look into how its done
}