import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Tipos do banco de dados
export type Database = {
  public: {
    Tables: {
      diary_entries: {
        Row: {
          id: string;
          user_id: string | null;
          date: string;
          meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
          foods: string[];
          hunger_level: number;
          satisfaction_level: number;
          emotions_before: string[];
          emotions_after: string[];
          thoughts: string;
          context: string;
          location: string;
          companions: string;
          photo_url: string | null;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id?: string | null;
          date: string;
          meal_type: 'breakfast' | 'lunch' | 'dinner' | 'snack';
          foods: string[];
          hunger_level: number;
          satisfaction_level: number;
          emotions_before: string[];
          emotions_after: string[];
          thoughts?: string;
          context?: string;
          location?: string;
          companions?: string;
          photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string | null;
          date?: string;
          meal_type?: 'breakfast' | 'lunch' | 'dinner' | 'snack';
          foods?: string[];
          hunger_level?: number;
          satisfaction_level?: number;
          emotions_before?: string[];
          emotions_after?: string[];
          thoughts?: string;
          context?: string;
          location?: string;
          companions?: string;
          photo_url?: string | null;
          created_at?: string;
          updated_at?: string;
        };
      };
    };
  };
};