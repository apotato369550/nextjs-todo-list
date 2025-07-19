import { getTodos, saveTodos } from '@/lib/todos';

// figure out routes????

export async function GET() {
  const todos = getTodos();

  return new Response(JSON.stringify(todos), {
    headers: { 'Content-Type': 'application/json' }
  });
}

export async function POST(request) {
  const body = await request.json();

  // call get todos function
  const todos = getTodos();

  // create new todo object
  const newTodo = {
    id: Date.now().toString(),
    title: body.title,
    description: body.description,
    completed: false
  };

  // update todo with ellipsis and assign to variable
  const updatedTodos = [...todos, newTodo];

  // call saveTodo function (to be made)
  if (saveTodos(updatedTodos)) {
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