// create path to backup supabase storage to local storage (seed)
import { supabase } from '@/utils/supabaseClient';
import { getTodos as getJsonTodos, saveTodos as saveJsonTodos } from '@/lib/todos';


export async function GET() {
    try {
        // Get todos from Supabase
        const { data, error } = await supabase
            .from('supabase-todo-list')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) {
            throw error;
        }

        // Sync Supabase data to local storage
        await saveJsonTodos(data);

        return new Response(
            JSON.stringify(data),
            { headers: { 'Content-type': 'application/json' } }
        );
    } catch (error) {
        console.warn("Supabase failed. Using JSON fallback.");
        const data = getJsonTodos();
        return new Response(
            JSON.stringify(data),
            { headers: { 'Content-type': 'application/json' } }
        );
    }
}