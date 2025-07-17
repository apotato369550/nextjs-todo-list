import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'todos.json');

export function getTodos() {
  const file = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(file);
}
