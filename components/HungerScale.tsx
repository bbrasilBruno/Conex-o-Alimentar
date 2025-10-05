import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

interface HungerScaleProps {
  value: number;
  onValueChange: (value: number) => void;
  title: string;
  subtitle: string;
}

const HungerScale: React.FC<HungerScaleProps> = ({
  value,
  onValueChange,
  title,
  subtitle
}) => {
  const scaleLabels = {
    1: 'Muito baixo',
    5: 'Moderado', 
    10: 'Muito alto'
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.subtitle}>{subtitle}</Text>
      
      <View style={styles.scaleContainer}>
        {Array.from({ length: 10 }, (_, i) => i + 1).map((num) => (
          <TouchableOpacity
            key={num}
            style={[
              styles.scaleButton,
              value === num && styles.selectedScale
            ]}
            onPress={() => onValueChange(num)}
          >
            <Text style={[
              styles.scaleText,
              value === num && styles.selectedScaleText
            ]}>
              {num}
            </Text>
          </TouchableOpacity>
        ))}
      </View>
      
      <View style={styles.labelContainer}>
        <Text style={styles.labelText}>{scaleLabels[1]}</Text>
        <Text style={styles.labelText}>{scaleLabels[5]}</Text>
        <Text style={styles.labelText}>{scaleLabels[10]}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: 15,
  },
  title: {
    fontSize: 16,
    fontWeight: '500',
    color: '#495057',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 12,
  },
  scaleContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  scaleButton: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F8F9FA',
    borderWidth: 1,
    borderColor: '#DEE2E6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedScale: {
    backgroundColor: '#A8E6CF',
    borderColor: '#87CEEB',
  },
  scaleText: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '400',
  },
  selectedScaleText: {
    color: '#333',
    fontWeight: '600',
  },
  labelContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  labelText: {
    fontSize: 12,
    color: '#ADB5BD',
    textAlign: 'center',
    flex: 1,
  },
});

export default HungerScale;