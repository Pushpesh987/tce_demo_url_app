// lib/supabase.js
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://uavzfnozsepdkxrwduia.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVhdnpmbm96c2VwZGt4cndkdWlhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDEwMDY3OTcsImV4cCI6MjAxNjU4Mjc5N30.AgPbSgQhIV2ujbSjiFH2TYaOAuaUTkv9iASKLQXF9Tg';
export const supabase = createClient(supabaseUrl, supabaseKey);
