import React, { useState } from 'react';
import { 
  View, 
  Text, 
  TextInput,
  StyleSheet, 
  ScrollView, 
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform
} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import EmotionPicker from '../components/EmotionPicker';
import HungerScale from '../components/HungerScale';
import NutriMascot from '../components/NutriMascot';
import { useDiary } from '../hooks/useDiary';
import { DiaryService } from '../services/diaryService';

export default function AddEntryScreen() {
  const insets = useSafeAreaInsets();
  const { addEntry } = useDiary();

  const [mealType, setMealType] = useState<'breakfast' | 'lunch' | 'dinner' | 'snack'>('breakfast');
  const [foods, setFoods] = useState('');
  const [hungerLevel, setHungerLevel] = useState(5);
  const [satisfactionLevel, setSatisfactionLevel] = useState(5);
  const [emotionsBefore, setEmotionsBefore] = useState<string[]>([]);
  const [emotionsAfter, setEmotionsAfter] = useState<string[]>([]);
  const [thoughts, setThoughts] = useState('');
  const [context, setContext] = useState('');
  const [location, setLocation] = useState('');
  const [companions, setCompanions] = useState('');

  const handleEmotionToggleBefore = (emotion: string) => {
    setEmotionsBefore(prev => 
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleEmotionToggleAfter = (emotion: string) => {
    setEmotionsAfter(prev => 
      prev.includes(emotion)
        ? prev.filter(e => e !== emotion)
        : [...prev, emotion]
    );
  };

  const handleSave = () => {
    const foodArray = foods.split(',').map(f => f.trim()).filter(f => f.length > 0);
    
    if (foodArray.length === 0) {
      return; // Could show validation message
    }

    addEntry({
      date: new Date(),
      mealType,
      foods: foodArray,
      hungerLevel,
      satisfactionLevel,
      emotionsBefore,
      emotionsAfter,
      thoughts,
      context,
      location,
      companions,
    });

    router.back();
  };

  const mealTypes = [
    { key: 'breakfast', label: 'Café da manhã', icon: 'wb-sunny' },
    { key: 'lunch', label: 'Almoço', icon: 'restaurant' },
    { key: 'dinner', label: 'Jantar', icon: 'restaurant-menu' },
    { key: 'snack', label: 'Lanche', icon: 'local-cafe' },
  ];

  const encouragementMessage = DiaryService.getRandomNutriMessage('encouragement');

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <MaterialIcons name="arrow-back" size={24} color="#495057" />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>Nova Entrada</Text>
          <TouchableOpacity onPress={handleSave} style={styles.saveButton}>
            <Text style={styles.saveButtonText}>Salvar</Text>
          </TouchableOpacity>
        </View>

        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Message */}
          <View style={styles.welcomeSection}>
            <NutriMascot message={encouragementMessage.message} size="small" />
          </View>

          {/* Meal Type Selection */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Tipo de Refeição</Text>
            <View style={styles.mealTypeGrid}>
              {mealTypes.map((meal) => (
                <TouchableOpacity
                  key={meal.key}
                  style={[
                    styles.mealTypeButton,
                    mealType === meal.key && styles.selectedMealType
                  ]}
                  onPress={() => setMealType(meal.key as any)}
                >
                  <MaterialIcons 
                    name={meal.icon as any} 
                    size={20} 
                    color={mealType === meal.key ? '#FFFFFF' : '#6C757D'} 
                  />
                  <Text style={[
                    styles.mealTypeText,
                    mealType === meal.key && styles.selectedMealTypeText
                  ]}>
                    {meal.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>

          {/* Foods */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>O que você comeu?</Text>
            <Text style={styles.sectionSubtitle}>
              Descreva livremente, sem se preocupar com quantidades exatas
            </Text>
            <TextInput
              style={styles.textInput}
              value={foods}
              onChangeText={setFoods}
              placeholder="Ex: Aveia com banana, Chá de camomila..."
              multiline
              numberOfLines={3}
              textAlignVertical="top"
            />
          </View>

          {/* Hunger and Satisfaction */}
          <View style={styles.section}>
            <HungerScale
              title="Nível de Fome Antes de Comer"
              subtitle="Como estava sua fome antes desta refeição?"
              value={hungerLevel}
              onValueChange={setHungerLevel}
            />
            
            <HungerScale
              title="Nível de Satisfação Depois de Comer"
              subtitle="Como você se sentiu após a refeição?"
              value={satisfactionLevel}
              onValueChange={setSatisfactionLevel}
            />
          </View>

          {/* Emotions */}
          <View style={styles.section}>
            <EmotionPicker
              title="Como você se sentia ANTES de comer?"
              selectedEmotions={emotionsBefore}
              onEmotionToggle={handleEmotionToggleBefore}
            />
            
            <EmotionPicker
              title="Como você se sentia DEPOIS de comer?"
              selectedEmotions={emotionsAfter}
              onEmotionToggle={handleEmotionToggleAfter}
            />
          </View>

          {/* Thoughts */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Pensamentos e Reflexões</Text>
            <Text style={styles.sectionSubtitle}>
              O que passou pela sua mente durante ou após a refeição?
            </Text>
            <TextInput
              style={[styles.textInput, styles.multilineInput]}
              value={thoughts}
              onChangeText={setThoughts}
              placeholder="Compartilhe seus pensamentos sem julgamento..."
              multiline
              numberOfLines={4}
              textAlignVertical="top"
            />
          </View>

          {/* Context */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Contexto da Refeição</Text>
            
            <View style={styles.contextGroup}>
              <Text style={styles.contextLabel}>Onde você estava?</Text>
              <TextInput
                style={styles.contextInput}
                value={location}
                onChangeText={setLocation}
                placeholder="Ex: Cozinha, restaurante, trabalho..."
              />
            </View>

            <View style={styles.contextGroup}>
              <Text style={styles.contextLabel}>Com quem você estava?</Text>
              <TextInput
                style={styles.contextInput}
                value={companions}
                onChangeText={setCompanions}
                placeholder="Ex: Sozinho, família, amigos..."
              />
            </View>

            <View style={styles.contextGroup}>
              <Text style={styles.contextLabel}>O que estava acontecendo?</Text>
              <TextInput
                style={[styles.contextInput, styles.multilineInput]}
                value={context}
                onChangeText={setContext}
                placeholder="Ex: Assistindo TV, conversando, trabalhando..."
                multiline
                numberOfLines={2}
                textAlignVertical="top"
              />
            </View>
          </View>

          {/* Gentle Reminder */}
          <View style={styles.reminderCard}>
            <MaterialIcons name="favorite" size={20} color="#A8E6CF" />
            <Text style={styles.reminderText}>
              Lembre-se: não há respostas certas ou erradas. Este é um espaço seguro para explorar sua relação com a comida.
            </Text>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
  },
  backButton: {
    padding: 4,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
  },
  saveButton: {
    backgroundColor: '#87CEEB',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  saveButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingVertical: 16,
  },
  section: {
    paddingHorizontal: 16,
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 6,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 12,
    lineHeight: 20,
  },
  mealTypeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  mealTypeButton: {
    flex: 1,
    minWidth: '45%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 12,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  selectedMealType: {
    backgroundColor: '#87CEEB',
    borderColor: '#87CEEB',
  },
  mealTypeText: {
    fontSize: 14,
    color: '#6C757D',
    marginLeft: 8,
    fontWeight: '500',
  },
  selectedMealTypeText: {
    color: '#FFFFFF',
  },
  textInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#495057',
    minHeight: 48,
  },
  multilineInput: {
    minHeight: 80,
  },
  contextGroup: {
    marginBottom: 16,
  },
  contextLabel: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 6,
    fontWeight: '500',
  },
  contextInput: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E9ECEF',
    borderRadius: 12,
    padding: 12,
    fontSize: 16,
    color: '#495057',
    minHeight: 44,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  reminderText: {
    flex: 1,
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
    marginLeft: 12,
    fontStyle: 'italic',
  },
});