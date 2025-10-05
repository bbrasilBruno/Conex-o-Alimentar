import { useContext } from 'react';
import { DiaryContext } from '../contexts/DiaryContext';

export function useDiary() {
  const context = useContext(DiaryContext);
  if (!context) {
    throw new Error('useDiary must be used within DiaryProvider');
  }
  return context;
}