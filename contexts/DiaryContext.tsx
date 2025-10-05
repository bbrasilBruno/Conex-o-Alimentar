import React, { createContext, ReactNode, useState, useEffect } from 'react';
import { EmotionalEntry } from '../types';
import { DiaryService } from '../services/diaryService';

interface DiaryContextType {
  entries: EmotionalEntry[];
  loading: boolean;
  addEntry: (entry: Omit<EmotionalEntry, 'id' | 'createdAt' | 'updatedAt'>) => Promise<void>;
  updateEntry: (id: string, updates: Partial<EmotionalEntry>) => Promise<void>;
  deleteEntry: (id: string) => Promise<void>;
  getTodaysEntries: () => EmotionalEntry[];
  refreshEntries: () => Promise<void>;
}

export const DiaryContext = createContext<DiaryContextType | undefined>(undefined);

export function DiaryProvider({ children }: { children: ReactNode }) {
  const [entries, setEntries] = useState<EmotionalEntry[]>([]);
  const [loading, setLoading] = useState(true);

  // Load entries on mount
  useEffect(() => {
    loadEntries();
  }, []);

  const loadEntries = async () => {
    setLoading(true);
    try {
      const fetchedEntries = await DiaryService.getAllEntries();
      setEntries(fetchedEntries);
    } catch (error) {
      console.error('Error loading entries:', error);
      // Fallback to mock data
      setEntries(DiaryService.getMockEntries());
    } finally {
      setLoading(false);
    }
  };

  const addEntry = async (entryData: Omit<EmotionalEntry, 'id' | 'createdAt' | 'updatedAt'>) => {
    try {
      const newEntry = await DiaryService.createEntry(entryData);
      setEntries(prev => [newEntry, ...prev]);
    } catch (error) {
      console.error('Error adding entry:', error);
    }
  };

  const updateEntry = async (id: string, updates: Partial<EmotionalEntry>) => {
    try {
      const updatedEntry = await DiaryService.updateEntry(id, updates);
      if (updatedEntry) {
        setEntries(prev => prev.map(entry => 
          entry.id === id ? updatedEntry : entry
        ));
      }
    } catch (error) {
      console.error('Error updating entry:', error);
    }
  };

  const deleteEntry = async (id: string) => {
    try {
      const success = await DiaryService.deleteEntry(id);
      if (success) {
        setEntries(prev => prev.filter(entry => entry.id !== id));
      }
    } catch (error) {
      console.error('Error deleting entry:', error);
    }
  };

  const getTodaysEntries = () => {
    const today = new Date();
    return entries.filter(entry => {
      const entryDate = new Date(entry.date);
      return entryDate.toDateString() === today.toDateString();
    });
  };

  const refreshEntries = async () => {
    await loadEntries();
  };

  return (
    <DiaryContext.Provider value={{
      entries,
      loading,
      addEntry,
      updateEntry,
      deleteEntry,
      getTodaysEntries,
      refreshEntries
    }}>
      {children}
    </DiaryContext.Provider>
  );
}