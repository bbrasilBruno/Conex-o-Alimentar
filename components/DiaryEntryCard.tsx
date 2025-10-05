import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { EmotionalEntry } from '../types';
import { MaterialIcons } from '@expo/vector-icons';

interface DiaryEntryCardProps {
  entry: EmotionalEntry;
  onPress?: () => void;
}

const DiaryEntryCard: React.FC<DiaryEntryCardProps> = ({ entry, onPress }) => {
  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getMealIcon = (mealType: EmotionalEntry['mealType']) => {
    const icons = {
      breakfast: 'wb-sunny',
      lunch: 'restaurant',
      dinner: 'restaurant-menu',
      snack: 'local-cafe'
    };
    return icons[mealType];
  };

  const getMealLabel = (mealType: EmotionalEntry['mealType']) => {
    const labels = {
      breakfast: 'Café da manhã',
      lunch: 'Almoço', 
      dinner: 'Jantar',
      snack: 'Lanche'
    };
    return labels[mealType];
  };

  return (
    <TouchableOpacity style={styles.card} onPress={onPress}>
      <View style={styles.header}>
        <View style={styles.mealInfo}>
          <MaterialIcons 
            name={getMealIcon(entry.mealType) as any} 
            size={20} 
            color="#87CEEB" 
          />
          <Text style={styles.mealType}>{getMealLabel(entry.mealType)}</Text>
        </View>
        <Text style={styles.time}>{formatTime(entry.date)}</Text>
      </View>

      <View style={styles.foodSection}>
        <Text style={styles.foodText}>
          {entry.foods.join(', ')}
        </Text>
      </View>

      {entry.emotionsBefore.length > 0 && (
        <View style={styles.emotionSection}>
          <Text style={styles.emotionLabel}>Sentimentos antes:</Text>
          <View style={styles.emotionTags}>
            {entry.emotionsBefore.map((emotion, index) => (
              <View key={index} style={styles.emotionTag}>
                <Text style={styles.emotionTagText}>{emotion}</Text>
              </View>
            ))}
          </View>
        </View>
      )}

      {entry.thoughts && (
        <View style={styles.thoughtsSection}>
          <Text style={styles.thoughtsText} numberOfLines={2}>
            "{entry.thoughts}"
          </Text>
        </View>
      )}

      <View style={styles.scaleSection}>
        <View style={styles.scaleItem}>
          <Text style={styles.scaleLabel}>Fome:</Text>
          <Text style={styles.scaleValue}>{entry.hungerLevel}/10</Text>
        </View>
        <View style={styles.scaleItem}>
          <Text style={styles.scaleLabel}>Satisfação:</Text>
          <Text style={styles.scaleValue}>{entry.satisfactionLevel}/10</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginVertical: 6,
    marginHorizontal: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F1F3F4',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  mealInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  mealType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginLeft: 8,
  },
  time: {
    fontSize: 14,
    color: '#6C757D',
  },
  foodSection: {
    marginBottom: 12,
  },
  foodText: {
    fontSize: 15,
    color: '#343A40',
    lineHeight: 22,
  },
  emotionSection: {
    marginBottom: 10,
  },
  emotionLabel: {
    fontSize: 13,
    color: '#6C757D',
    marginBottom: 4,
  },
  emotionTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  emotionTag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  emotionTagText: {
    fontSize: 12,
    color: '#495057',
  },
  thoughtsSection: {
    marginBottom: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#F1F3F4',
  },
  thoughtsText: {
    fontSize: 14,
    color: '#6C757D',
    fontStyle: 'italic',
    lineHeight: 20,
  },
  scaleSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  scaleItem: {
    alignItems: 'center',
  },
  scaleLabel: {
    fontSize: 12,
    color: '#ADB5BD',
    marginBottom: 2,
  },
  scaleValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#87CEEB',
  },
});

export default DiaryEntryCard;