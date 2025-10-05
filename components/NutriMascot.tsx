import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Animated, { 
  useSharedValue, 
  useAnimatedStyle, 
  withRepeat, 
  withTiming,
  withSequence
} from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

interface NutriMascotProps {
  message?: string;
  size?: 'small' | 'medium' | 'large';
}

const NutriMascot: React.FC<NutriMascotProps> = ({ message, size = 'medium' }) => {
  const scale = useSharedValue(1);
  const opacity = useSharedValue(0.8);

  React.useEffect(() => {
    // Gentle breathing animation
    scale.value = withRepeat(
      withSequence(
        withTiming(1.05, { duration: 2000 }),
        withTiming(1, { duration: 2000 })
      ),
      -1,
      true
    );
    
    opacity.value = withRepeat(
      withSequence(
        withTiming(1, { duration: 1500 }),
        withTiming(0.8, { duration: 1500 })
      ),
      -1,
      true
    );
  }, []);

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [{ scale: scale.value }],
    opacity: opacity.value,
  }));

  const sizeStyles = {
    small: { width: 40, height: 40 },
    medium: { width: 60, height: 60 },
    large: { width: 80, height: 80 }
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[animatedStyle, sizeStyles[size]]}>
        <LinearGradient
          colors={['#A8E6CF', '#87CEEB', '#98FB98']}
          style={[styles.mascot, sizeStyles[size]]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.face}>
            <View style={styles.eyes}>
              <View style={[styles.eye, styles.leftEye]} />
              <View style={[styles.eye, styles.rightEye]} />
            </View>
            <View style={styles.mouth} />
          </View>
        </LinearGradient>
      </Animated.View>
      
      {message && (
        <View style={styles.messageContainer}>
          <Text style={styles.messageText}>{message}</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    marginVertical: 10,
  },
  mascot: {
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  face: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  eyes: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  eye: {
    width: 6,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 3,
    marginHorizontal: 3,
  },
  leftEye: {
    marginRight: 8,
  },
  rightEye: {
    marginLeft: 8,
  },
  mouth: {
    width: 12,
    height: 6,
    backgroundColor: '#333',
    borderRadius: 6,
    borderTopLeftRadius: 0,
    borderTopRightRadius: 0,
  },
  messageContainer: {
    backgroundColor: '#F8F9FA',
    padding: 12,
    borderRadius: 12,
    marginTop: 8,
    maxWidth: 250,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  messageText: {
    color: '#495057',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
    fontWeight: '400',
  },
});

export default NutriMascot;