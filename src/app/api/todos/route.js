import { getTodos } from '@/lib/todos';

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

  // create new todo object

  // update todo with ellipsis and assign to variable

  // call saveTodo function (to be made)

  // return a response object <-- look into how its done
}