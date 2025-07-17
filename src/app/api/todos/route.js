import { getTodos } from '@/lib/todos';

// figure out routes????

export async function GET() {
  const todos = getTodos();

  return new Response(JSON.stringify(todos), {
    headers: { 'Content-Type': 'application/json' }
  });
}
