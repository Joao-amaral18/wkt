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

export const getRecentActivity = async () => {
    const { data, error } = await supabase
        .from('workout_logs')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(20);

    if (error) {
        console.error('Error fetching recent activity:', error);
        return [];
    }
    return data;
};

export const getWeeklyStats = async () => {
    // Get start of week (Sunday)
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);

    const { data, error } = await supabase
        .from('workout_logs')
        .select('*')
        .gte('created_at', startOfWeek.toISOString());

    if (error) {
        console.error('Error fetching weekly stats:', error);
        return { sets: 0, volume: 0 };
    }

    const sets = data.length;
    const volume = data.reduce((acc, log) => acc + (log.weight * log.actual_reps), 0);

    return { sets, volume };
};
