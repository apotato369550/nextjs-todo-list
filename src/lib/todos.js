import fs from 'fs';
import path from 'path';

const filePath = path.join(process.cwd(), 'src', 'data', 'todos.json');

export function getTodos() {
  const file = fs.readFileSync(filePath, 'utf8');
  return JSON.parse(file);
}

export function saveTodos(updatedTodos) {
  // open file, append maybe. then save it
  try {
    const data = JSON.stringify(updatedTodos, null, 2);
    fs.writeFileSync(filePath, data, 'utf8');
    return true;
  } catch (error) {
    console.log("Failed to save todos: ", error);
    return false
  }
}