// create path to backup supabase storage to local storage (seed)
import { supabase } from '@/utils/supabaseClient';
import { getTodos as getJsonTodos, saveTodos as saveJsonTodos } from '@/lib/todos';

export async function GET() {
    try {
        const { data: dbTodos, error } = await supabase
            .from('todos')
            .select('*')
            .order('created_at', { ascending: false });

        if (error) throw error;

        const jsonTodos = getJsonTodos();

        // Merge logic: keep the most recently updated version of each todo
        const mergedTodos = [];
        const allIds = new Set([
            ...jsonTodos.map(t => t.id),
            ...dbTodos.map(t => t.id)
        ]);

        for (const id of allIds) {
            const local = jsonTodos.find(t => t.id === id);
            const remote = dbTodos.find(t => t.id === id);

            if (!local) {
                mergedTodos.push(remote); // exists only in DB
            } else if (!remote) {
                mergedTodos.push(local); // exists only locally
            } else {
                mergedTodos.push(
                    new Date(local.last_updated) > new Date(remote.last_updated)
                        ? local
                        : remote
                );
            }
        }

        // Save merged version locally
        saveJsonTodos(mergedTodos);

        return new Response(JSON.stringify(mergedTodos), {
            headers: { 'Content-Type': 'application/json' }
        });

    } catch (error) {
        console.warn("Supabase failed. Using JSON fallback.");
        const data = getJsonTodos();
        return new Response(JSON.stringify(data), {
            headers: { 'Content-Type': 'application/json' }
        });
    }
}
