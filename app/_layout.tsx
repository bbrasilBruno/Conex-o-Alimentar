import React from 'react';
import { Stack } from 'expo-router';
import { DiaryProvider } from '../contexts/DiaryContext';
import { StatusBar } from 'expo-status-bar';
import { Platform } from 'react-native';

export default function RootLayout() {
  return (
    <DiaryProvider>
      <StatusBar style="dark" backgroundColor="#F8F9FA" />
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: '#F8F9FA',
          },
          headerTintColor: '#495057',
          headerTitleStyle: {
            fontWeight: '600',
          },
          headerShadowVisible: false,
        }}
      >
        <Stack.Screen 
          name="(tabs)" 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="add-entry" 
          options={{ 
            title: 'Nova Entrada',
            presentation: Platform.OS === 'ios' ? 'modal' : 'card'
          }} 
        />
      </Stack>
    </DiaryProvider>
  );
}