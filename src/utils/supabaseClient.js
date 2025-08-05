import { createClient } from "@supabase/supabase-js";
import dotenv from 'dotenv';
import path from 'path'

// config dotenv
dotenv.config({ path: path.resolve(__dirname, '../.env' ) })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);