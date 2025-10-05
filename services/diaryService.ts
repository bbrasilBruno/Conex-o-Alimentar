import { EmotionalEntry, Emotion, NutriMessage, EducationalContent, DatabaseEntry } from '../types';
import { supabase } from '../lib/supabase';

// Mock emotions data
export const emotions: Emotion[] = [
  { id: '1', name: 'Calmo', color: '#A8E6CF', category: 'positive' },
  { id: '2', name: 'Ansioso', color: '#FFB6C1', category: 'challenging' },
  { id: '3', name: 'Feliz', color: '#87CEEB', category: 'positive' },
  { id: '4', name: 'Triste', color: '#DDA0DD', category: 'challenging' },
  { id: '5', name: 'Grato', color: '#F0E68C', category: 'positive' },
  { id: '6', name: 'Estressado', color: '#FFA07A', category: 'challenging' },
  { id: '7', name: 'Neutro', color: '#D3D3D3', category: 'neutral' },
  { id: '8', name: 'Esperançoso', color: '#98FB98', category: 'positive' },
  { id: '9', name: 'Confuso', color: '#F5DEB3', category: 'neutral' },
  { id: '10', name: 'Culpado', color: '#FFDAB9', category: 'challenging' },
];

// Nutri messages for different contexts
export const nutriMessages: NutriMessage[] = [
  {
    id: '1',
    message: 'Olá! Que bom ter você aqui hoje. Lembre-se: não há julgamento neste espaço, apenas acolhimento. 🌱',
    type: 'welcome'
  },
  {
    id: '2', 
    message: 'Você está sendo corajoso ao explorar sua relação com a comida. Isso é um grande passo! 💚',
    type: 'encouragement'
  },
  {
    id: '3',
    message: 'Como você se sentiu ao registrar essa refeição? Há algo que gostaria de explorar mais?',
    type: 'reflection'
  },
  {
    id: '4',
    message: 'Está tudo bem sentir o que você está sentindo. Você não está sozinho nesta jornada. 🤗',
    type: 'support'
  }
];

// Educational content
export const educationalContent: EducationalContent[] = [
  {
    id: '1',
    title: 'Alimentação Intuitiva: Reconectando com seu Corpo',
    type: 'article',
    content: 'A alimentação intuitiva é uma abordagem que nos ensina a confiar nos sinais naturais do nosso corpo...',
    tags: ['alimentação intuitiva', 'autoconhecimento'],
  },
  {
    id: '2',
    title: 'Meditação da Gratidão pelo Corpo',
    type: 'meditation',
    content: 'Uma prática gentil para desenvolver uma relação mais amorosa com seu corpo...',
    duration: 10,
    tags: ['meditação', 'body positivity'],
  },
  {
    id: '3',
    title: 'Exercício: Identificando a Fome Física vs Emocional',
    type: 'exercise',
    content: 'Este exercício ajuda a distinguir entre diferentes tipos de fome...',
    duration: 15,
    tags: ['fome emocional', 'exercício prático'],
  }
];

// Helper functions to convert between app and database formats
const convertToEmotionalEntry = (dbEntry: DatabaseEntry): EmotionalEntry => ({
  id: dbEntry.id,
  date: new Date(dbEntry.date),
  mealType: dbEntry.meal_type,
  foods: dbEntry.foods,
  hungerLevel: dbEntry.hunger_level,
  satisfactionLevel: dbEntry.satisfaction_level,
  emotionsBefore: dbEntry.emotions_before,
  emotionsAfter: dbEntry.emotions_after,
  thoughts: dbEntry.thoughts || '',
  context: dbEntry.context || '',
  location: dbEntry.location || '',
  companions: dbEntry.companions || '',
  photo: dbEntry.photo_url || undefined,
  createdAt: new Date(dbEntry.created_at),
  updatedAt: new Date(dbEntry.updated_at),
});

const convertToDatabaseEntry = (entry: Omit<EmotionalEntry, 'id' | 'createdAt' | 'updatedAt'>): Omit<DatabaseEntry, 'id' | 'created_at' | 'updated_at'> => ({
  user_id: null, // Will be set by RLS policies
  date: entry.date.toISOString(),
  meal_type: entry.mealType,
  foods: entry.foods,
  hunger_level: entry.hungerLevel,
  satisfaction_level: entry.satisfactionLevel,
  emotions_before: entry.emotionsBefore,
  emotions_after: entry.emotionsAfter,
  thoughts: entry.thoughts,
  context: entry.context,
  location: entry.location,
  companions: entry.companions,
  photo_url: entry.photo || null,
});

// Service functions
export const DiaryService = {
  // Get all entries from Supabase
  getAllEntries: async (): Promise<EmotionalEntry[]> => {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .select('*')
        .order('date', { ascending: false });

      if (error) {
        console.error('Error fetching entries:', error);
        return DiaryService.getMockEntries(); // Fallback to mock data
      }

      return data.map(convertToEmotionalEntry);
    } catch (error) {
      console.error('Network error:', error);
      return DiaryService.getMockEntries(); // Fallback to mock data
    }
  },

  // Create new entry in Supabase
  createEntry: async (entry: Omit<EmotionalEntry, 'id' | 'createdAt' | 'updatedAt'>): Promise<EmotionalEntry> => {
    try {
      const dbEntry = convertToDatabaseEntry(entry);
      
      const { data, error } = await supabase
        .from('diary_entries')
        .insert([dbEntry])
        .select()
        .single();

      if (error) {
        console.error('Error creating entry:', error);
        // Fallback: create local entry
        return {
          ...entry,
          id: Date.now().toString(),
          createdAt: new Date(),
          updatedAt: new Date(),
        };
      }

      return convertToEmotionalEntry(data);
    } catch (error) {
      console.error('Network error:', error);
      // Fallback: create local entry
      return {
        ...entry,
        id: Date.now().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
      };
    }
  },

  // Update entry in Supabase
  updateEntry: async (id: string, updates: Partial<EmotionalEntry>): Promise<EmotionalEntry | null> => {
    try {
      const { data, error } = await supabase
        .from('diary_entries')
        .update({
          ...updates,
          updated_at: new Date().toISOString(),
        })
        .eq('id', id)
        .select()
        .single();

      if (error) {
        console.error('Error updating entry:', error);
        return null;
      }

      return convertToEmotionalEntry(data);
    } catch (error) {
      console.error('Network error:', error);
      return null;
    }
  },

  // Delete entry from Supabase
  deleteEntry: async (id: string): Promise<boolean> => {
    try {
      const { error } = await supabase
        .from('diary_entries')
        .delete()
        .eq('id', id);

      if (error) {
        console.error('Error deleting entry:', error);
        return false;
      }

      return true;
    } catch (error) {
      console.error('Network error:', error);
      return false;
    }
  },

  // Mock data for fallback
  getMockEntries: (): EmotionalEntry[] => {
    const mockEntries: EmotionalEntry[] = [
      {
        id: '1',
        date: new Date(),
        mealType: 'breakfast',
        foods: ['Aveia com frutas', 'Chá de camomila'],
        hungerLevel: 6,
        satisfactionLevel: 8,
        emotionsBefore: ['Ansioso', 'Neutro'],
        emotionsAfter: ['Calmo', 'Grato'],
        thoughts: 'Foi uma manhã tranquila. Consegui comer sem pressa.',
        context: 'Casa, assistindo notícias',
        location: 'Cozinha',
        companions: 'Sozinho',
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ];
    return mockEntries;
  },

  getRandomNutriMessage: (type?: NutriMessage['type']) => {
    const filtered = type ? nutriMessages.filter(m => m.type === type) : nutriMessages;
    return filtered[Math.floor(Math.random() * filtered.length)];
  }
};