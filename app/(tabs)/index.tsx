import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NutriMascot from '../../components/NutriMascot';
import DiaryEntryCard from '../../components/DiaryEntryCard';
import { useDiary } from '../../hooks/useDiary';
import { DiaryService } from '../../services/diaryService';

export default function HomeScreen() {
  const insets = useSafeAreaInsets();
  const { getTodaysEntries } = useDiary();
  const [nutriMessage, setNutriMessage] = useState('');
  
  const todaysEntries = getTodaysEntries();

  useEffect(() => {
    const message = DiaryService.getRandomNutriMessage('welcome');
    setNutriMessage(message.message);
  }, []);

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour < 12) return 'Bom dia';
    if (hour < 18) return 'Boa tarde';
    return 'Boa noite';
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#F8F9FA', '#FFFFFF']}
        style={styles.gradient}
      >
        <ScrollView 
          style={styles.scrollView}
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          {/* Welcome Section */}
          <View style={styles.welcomeSection}>
            <Text style={styles.greeting}>{getGreeting()}! 🌱</Text>
            <NutriMascot message={nutriMessage} size="large" />
          </View>

          {/* Quick Actions */}
          <View style={styles.quickActions}>
            <TouchableOpacity 
              style={styles.addButton}
              onPress={() => router.push('/add-entry')}
            >
              <MaterialIcons name="add" size={24} color="#FFFFFF" />
              <Text style={styles.addButtonText}>Registrar Refeição</Text>
            </TouchableOpacity>
          </View>

          {/* Today's Summary */}
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Hoje</Text>
            {todaysEntries.length > 0 ? (
              <View style={styles.todayStats}>
                <View style={styles.statItem}>
                  <MaterialIcons name="restaurant" size={20} color="#87CEEB" />
                  <Text style={styles.statNumber}>{todaysEntries.length}</Text>
                  <Text style={styles.statLabel}>
                    {todaysEntries.length === 1 ? 'refeição' : 'refeições'}
                  </Text>
                </View>
                <View style={styles.statItem}>
                  <MaterialIcons name="favorite" size={20} color="#A8E6CF" />
                  <Text style={styles.statNumber}>
                    {Math.round(
                      todaysEntries.reduce((sum, entry) => sum + entry.satisfactionLevel, 0) / 
                      todaysEntries.length
                    )}
                  </Text>
                  <Text style={styles.statLabel}>satisfação média</Text>
                </View>
              </View>
            ) : (
              <View style={styles.emptyState}>
                <MaterialIcons name="eco" size={48} color="#DDD" />
                <Text style={styles.emptyText}>
                  Ainda não há registros para hoje.{'\n'}
                  Que tal começar registrando sua próxima refeição?
                </Text>
              </View>
            )}
          </View>

          {/* Recent Entries */}
          {todaysEntries.length > 0 && (
            <View style={styles.section}>
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Registros de Hoje</Text>
                <TouchableOpacity onPress={() => router.push('/(tabs)/diary')}>
                  <Text style={styles.seeAllText}>Ver todos</Text>
                </TouchableOpacity>
              </View>
              
              {todaysEntries.slice(0, 3).map((entry) => (
                <DiaryEntryCard 
                  key={entry.id} 
                  entry={entry}
                  onPress={() => {
                    // Navigate to entry detail in future iteration
                  }}
                />
              ))}
            </View>
          )}

          {/* Gentle Reminder */}
          <View style={styles.reminderSection}>
            <LinearGradient
              colors={['#A8E6CF', '#87CEEB']}
              style={styles.reminderCard}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <MaterialIcons name="psychology" size={24} color="#FFFFFF" />
              <Text style={styles.reminderText}>
                Lembre-se: não há certo ou errado. Cada registro é um passo na sua jornada de autoconhecimento.
              </Text>
            </LinearGradient>
          </View>
        </ScrollView>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  gradient: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 20,
  },
  welcomeSection: {
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 16,
  },
  greeting: {
    fontSize: 24,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 10,
    textAlign: 'center',
  },
  quickActions: {
    paddingHorizontal: 16,
    marginBottom: 20,
  },
  addButton: {
    backgroundColor: '#87CEEB',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  section: {
    marginBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 12,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#495057',
  },
  seeAllText: {
    fontSize: 14,
    color: '#87CEEB',
    fontWeight: '500',
  },
  todayStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 16,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#495057',
    marginTop: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6C757D',
    textAlign: 'center',
    marginTop: 2,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 40,
    paddingHorizontal: 32,
  },
  emptyText: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 24,
    marginTop: 12,
  },
  reminderSection: {
    paddingHorizontal: 16,
    marginTop: 10,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
  },
  reminderText: {
    flex: 1,
    color: '#FFFFFF',
    fontSize: 14,
    lineHeight: 20,
    marginLeft: 12,
    fontWeight: '400',
  },
});