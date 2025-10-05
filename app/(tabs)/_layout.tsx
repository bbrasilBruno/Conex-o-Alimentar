import React from 'react';
import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function TabLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#87CEEB',
        tabBarInactiveTintColor: '#ADB5BD',
        tabBarStyle: {
          backgroundColor: '#FFFFFF',
          borderTopColor: '#F1F3F4',
          borderTopWidth: 1,
          height: Platform.select({
            ios: insets.bottom + 60,
            android: insets.bottom + 60,
            default: 70
          }),
          paddingTop: 8,
          paddingBottom: Platform.select({
            ios: insets.bottom + 8,
            android: insets.bottom + 8,
            default: 8
          }),
          paddingHorizontal: 16,
        },
        tabBarLabelStyle: {
          fontSize: 12,
          fontWeight: '500',
        },
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
      <Tabs.Screen
        name="index"
        options={{
          title: 'Início',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
          headerTitle: 'Conexão Alimentar'
        }}
      />
      <Tabs.Screen
        name="diary"
        options={{
          title: 'Diário',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="book" size={size} color={color} />
          ),
          headerTitle: 'Meu Diário'
        }}
      />
      <Tabs.Screen
        name="insights"
        options={{
          title: 'Reflexões',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="insights" size={size} color={color} />
          ),
          headerTitle: 'Autoconhecimento'
        }}
      />
      <Tabs.Screen
        name="resources"
        options={{
          title: 'Recursos',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="library-books" size={size} color={color} />
          ),
          headerTitle: 'Apoio e Aprendizado'
        }}
      />
    </Tabs>
  );
}