export interface EmotionalEntry {
  id: string;
  date: Date;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack';
  foods: string[];
  hungerLevel: number; // 1-10 scale
  satisfactionLevel: number; // 1-10 scale
  emotionsBefore: string[];
  emotionsAfter: string[];
  thoughts: string;
  context: string;
  location: string;
  companions: string;
  photo?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Emotion {
  id: string;
  name: string;
  color: string;
  category: 'positive' | 'neutral' | 'challenging';
}

export interface NutriMessage {
  id: string;
  message: string;
  type: 'welcome' | 'encouragement' | 'reflection' | 'support';
  context?: string;
}

export interface EducationalContent {
  id: string;
  title: string;
  type: 'article' | 'meditation' | 'exercise';
  content: string;
  duration?: number; // in minutes for meditations/exercises
  tags: string[];
}

// Supabase database types
export interface DatabaseEntry {
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
}