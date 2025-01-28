import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://jkizhhyuhksmsdndzfra.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImpraXpoaHl1aGtzbXNkbmR6ZnJhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDY0NzQ1NzAsImV4cCI6MjAyMjA1MDU3MH0.Wd_jqQHZAEYGPGVgEEhFc_KPuOXEuGQGGXNvYVKJGXw';

export const supabase = createClient(supabaseUrl, supabaseKey);