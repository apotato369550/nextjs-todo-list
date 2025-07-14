import fs from 'fs';
import path from 'path';

export async function GET() {
  const filePath = path.join(process.cwd(), 'src', 'data', 'todos.json');
  const fileData = fs.readFileSync(filePath, 'utf8');
  const todos = JSON.parse(fileData);

  return new Response(JSON.stringify(todos), {
    headers: { 'Content-Type': 'application/json' }
  });
}
