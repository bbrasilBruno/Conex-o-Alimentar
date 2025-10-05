import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { emotions } from '../services/diaryService';

interface EmotionPickerProps {
  selectedEmotions: string[];
  onEmotionToggle: (emotion: string) => void;
  title: string;
}

const EmotionPicker: React.FC<EmotionPickerProps> = ({
  selectedEmotions,
  onEmotionToggle,
  title
}) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.emotionScroll}>
        <View style={styles.emotionContainer}>
          {emotions.map((emotion) => {
            const isSelected = selectedEmotions.includes(emotion.name);
            return (
              <TouchableOpacity
                key={emotion.id}
                style={[
                  styles.emotionTag,
                  { backgroundColor: isSelected ? emotion.color : '#F8F9FA' },
                  { borderColor: emotion.color }
                ]}
                onPress={() => onEmotionToggle(emotion.name)}
              >
                <Text style={[
                  styles.emotionText,
                  { color: isSelected ? '#333' : '#6C757D' }
                ]}>
                  {emotion.name}
                </Text>
              </TouchableOpacity>
            );
          })}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#495057',
    marginBottom: 8,
  },
  emotionScroll: {
    marginHorizontal: -5,
  },
  emotionContainer: {
    flexDirection: 'row',
    paddingHorizontal: 5,
  },
  emotionTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
    marginRight: 8,
    borderWidth: 1,
  },
  emotionText: {
    fontSize: 14,
    fontWeight: '400',
  },
});

export default EmotionPicker;