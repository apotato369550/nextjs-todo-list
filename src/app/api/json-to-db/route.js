import { supabase } from '@/utils/supabaseClient';
import { getTodos as getJsonTodos } from '@/lib/todos';

export async function GET() {
  try {
    const localTodos = getJsonTodos();

    // Optional: clear the table first (be careful with this!)
    // await supabase.from('supabase-todo-list').delete().neq('id', '');

    const { data, error } = await supabase
      .from('todos')
      .upsert(localTodos, { onConflict: ['id'] }); // Merge on `id`

    if (error) throw error;

    return new Response(
      JSON.stringify({ message: 'Supabase updated from JSON', data }),
      { headers: { 'Content-Type': 'application/json' }, status: 200 }
    );
  } catch (error) {
    console.error('Error syncing to Supabase:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { 'Content-Type': 'application/json' }, status: 500 }
    );
  }
}
