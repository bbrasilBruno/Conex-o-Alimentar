import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NutriMascot from '../../components/NutriMascot';
import { useDiary } from '../../hooks/useDiary';

export default function InsightsScreen() {
  const insets = useSafeAreaInsets();
  const { entries } = useDiary();

  const getInsights = () => {
    if (entries.length === 0) {
      return {
        totalEntries: 0,
        averageHunger: 0,
        averageSatisfaction: 0,
        mostCommonEmotions: [],
        streakDays: 0
      };
    }

    const totalEntries = entries.length;
    const averageHunger = entries.reduce((sum, entry) => sum + entry.hungerLevel, 0) / totalEntries;
    const averageSatisfaction = entries.reduce((sum, entry) => sum + entry.satisfactionLevel, 0) / totalEntries;

    // Get most common emotions
    const emotionCounts: { [key: string]: number } = {};
    entries.forEach(entry => {
      [...entry.emotionsBefore, ...entry.emotionsAfter].forEach(emotion => {
        emotionCounts[emotion] = (emotionCounts[emotion] || 0) + 1;
      });
    });

    const mostCommonEmotions = Object.entries(emotionCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([emotion]) => emotion);

    return {
      totalEntries,
      averageHunger: Math.round(averageHunger * 10) / 10,
      averageSatisfaction: Math.round(averageSatisfaction * 10) / 10,
      mostCommonEmotions,
      streakDays: Math.min(totalEntries, 7) // Simplified streak calculation
    };
  };

  const insights = getInsights();

  const reflectionPrompts = [
    "O que você notou sobre seus padrões alimentares esta semana?",
    "Como seu corpo tem se comunicado com você ultimamente?",
    "Quais emoções aparecem mais frequentemente nos seus registros?",
    "Em que momentos você se sente mais conectado(a) com sua fome e saciedade?",
    "Que pequena mudança você gostaria de experimentar na sua relação com a comida?"
  ];

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        {/* Welcome Section */}
        <View style={styles.welcomeSection}>
          <NutriMascot 
            message="Vamos refletir juntos sobre sua jornada? Cada padrão descoberto é um presente para seu autoconhecimento." 
            size="medium"
          />
        </View>

        {entries.length === 0 ? (
          <View style={styles.emptyState}>
            <MaterialIcons name="eco" size={48} color="#DDD" />
            <Text style={styles.emptyTitle}>Suas Reflexões Aparecerão Aqui</Text>
            <Text style={styles.emptyText}>
              Comece registrando suas refeições e emoções para descobrir padrões únicos da sua jornada alimentar.
            </Text>
          </View>
        ) : (
          <>
            {/* Statistics Cards */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sua Jornada em Números</Text>
              
              <View style={styles.statsGrid}>
                <View style={styles.statCard}>
                  <MaterialIcons name="restaurant" size={24} color="#87CEEB" />
                  <Text style={styles.statNumber}>{insights.totalEntries}</Text>
                  <Text style={styles.statLabel}>registros realizados</Text>
                </View>

                <View style={styles.statCard}>
                  <MaterialIcons name="favorite" size={24} color="#A8E6CF" />
                  <Text style={styles.statNumber}>{insights.averageSatisfaction}</Text>
                  <Text style={styles.statLabel}>satisfação média</Text>
                </View>

                <View style={styles.statCard}>
                  <MaterialIcons name="psychology" size={24} color="#DDA0DD" />
                  <Text style={styles.statNumber}>{insights.streakDays}</Text>
                  <Text style={styles.statLabel}>dias de prática</Text>
                </View>
              </View>
            </View>

            {/* Emotions Insights */}
            {insights.mostCommonEmotions.length > 0 && (
              <View style={styles.section}>
                <Text style={styles.sectionTitle}>Emoções Mais Presentes</Text>
                <View style={styles.emotionsCard}>
                  {insights.mostCommonEmotions.map((emotion, index) => (
                    <View key={emotion} style={styles.emotionItem}>
                      <View style={styles.emotionBadge}>
                        <Text style={styles.emotionRank}>{index + 1}</Text>
                      </View>
                      <Text style={styles.emotionName}>{emotion}</Text>
                    </View>
                  ))}
                </View>
              </View>
            )}

            {/* Body Signals */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Sinais do Corpo</Text>
              <View style={styles.bodySignalsCard}>
                <View style={styles.signalItem}>
                  <Text style={styles.signalLabel}>Nível médio de fome</Text>
                  <View style={styles.signalBar}>
                    <View style={[
                      styles.signalFill, 
                      { width: `${(insights.averageHunger / 10) * 100}%` }
                    ]} />
                  </View>
                  <Text style={styles.signalValue}>{insights.averageHunger}/10</Text>
                </View>

                <View style={styles.signalItem}>
                  <Text style={styles.signalLabel}>Nível médio de satisfação</Text>
                  <View style={styles.signalBar}>
                    <View style={[
                      styles.signalFill, 
                      { 
                        width: `${(insights.averageSatisfaction / 10) * 100}%`,
                        backgroundColor: '#A8E6CF'
                      }
                    ]} />
                  </View>
                  <Text style={styles.signalValue}>{insights.averageSatisfaction}/10</Text>
                </View>
              </View>
            </View>
          </>
        )}

        {/* Reflection Prompts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Perguntas para Reflexão</Text>
          <Text style={styles.sectionSubtitle}>
            Escolha uma pergunta que ressoa com você hoje:
          </Text>
          
          {reflectionPrompts.map((prompt, index) => (
            <View key={index} style={styles.promptCard}>
              <MaterialIcons name="lightbulb-outline" size={20} color="#87CEEB" />
              <Text style={styles.promptText}>{prompt}</Text>
            </View>
          ))}
        </View>

        {/* Gentle Reminder */}
        <View style={styles.reminderCard}>
          <MaterialIcons name="self-improvement" size={24} color="#6C757D" />
          <Text style={styles.reminderText}>
            Lembre-se: não existe padrão "certo" ou "errado". Cada descoberta sobre si mesmo é valiosa e merece ser celebrada com gentileza.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
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
  section: {
    marginBottom: 24,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 8,
  },
  sectionSubtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 16,
    lineHeight: 20,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: 60,
    paddingHorizontal: 32,
  },
  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#495057',
    marginTop: 16,
    marginBottom: 8,
  },
  emptyText: {
    fontSize: 16,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 24,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  statCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  statNumber: {
    fontSize: 24,
    fontWeight: '700',
    color: '#495057',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6C757D',
    textAlign: 'center',
    lineHeight: 16,
  },
  emotionsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  emotionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  emotionBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  emotionRank: {
    fontSize: 12,
    fontWeight: '600',
    color: '#FFFFFF',
  },
  emotionName: {
    fontSize: 16,
    color: '#495057',
    fontWeight: '500',
  },
  bodySignalsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  signalItem: {
    marginBottom: 16,
  },
  signalLabel: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  signalBar: {
    height: 8,
    backgroundColor: '#F1F3F4',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 4,
  },
  signalFill: {
    height: '100%',
    backgroundColor: '#87CEEB',
    borderRadius: 4,
  },
  signalValue: {
    fontSize: 12,
    color: '#495057',
    fontWeight: '500',
    textAlign: 'right',
  },
  promptCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  promptText: {
    flex: 1,
    fontSize: 15,
    color: '#495057',
    lineHeight: 22,
    marginLeft: 12,
  },
  reminderCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#F8F9FA',
    padding: 20,
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