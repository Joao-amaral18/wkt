import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export const getExerciseHistory = async (exerciseName) => {
    const { data, error } = await supabase
        .from('workout_logs')
        .select('*')
        .eq('exercise_name', exerciseName)
        .order('created_at', { ascending: false })
        .limit(10); // Fetch enough to cover all sets of the last session

    if (error) {
        console.error('Error fetching history:', error);
        return [];
    }
    return data;
};
