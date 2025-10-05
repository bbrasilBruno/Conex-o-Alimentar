import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, FlatList, ActivityIndicator, RefreshControl } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { router } from 'expo-router';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import DiaryEntryCard from '../../components/DiaryEntryCard';
import NutriMascot from '../../components/NutriMascot';
import { useDiary } from '../../hooks/useDiary';
import { EmotionalEntry } from '../../types';

export default function DiaryScreen() {
  const insets = useSafeAreaInsets();
  const { entries, loading, refreshEntries } = useDiary();
  const [filter, setFilter] = useState<'all' | 'today' | 'week'>('all');
  const [refreshing, setRefreshing] = useState(false);

  const getFilteredEntries = (): EmotionalEntry[] => {
    const now = new Date();
    
    switch (filter) {
      case 'today':
        return entries.filter(entry => {
          const entryDate = new Date(entry.date);
          return entryDate.toDateString() === now.toDateString();
        });
      
      case 'week':
        const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
        return entries.filter(entry => {
          const entryDate = new Date(entry.date);
          return entryDate >= weekAgo;
        });
      
      default:
        return entries;
    }
  };

  const filteredEntries = getFilteredEntries();

  const handleRefresh = async () => {
    setRefreshing(true);
    await refreshEntries();
    setRefreshing(false);
  };

  const renderEntry = ({ item }: { item: EmotionalEntry }) => (
    <DiaryEntryCard entry={item} />
  );

  const renderEmptyState = () => (
    <View style={styles.emptyState}>
      <NutriMascot 
        message="Seus registros aparecerão aqui. Cada entrada é um passo importante na sua jornada." 
        size="medium"
      />
      <TouchableOpacity 
        style={styles.addFirstButton}
        onPress={() => router.push('/add-entry')}
      >
        <MaterialIcons name="add" size={20} color="#FFFFFF" />
        <Text style={styles.addFirstButtonText}>Fazer Primeiro Registro</Text>
      </TouchableOpacity>
    </View>
  );

  const renderLoadingState = () => (
    <View style={styles.loadingState}>
      <ActivityIndicator size="large" color="#87CEEB" />
      <Text style={styles.loadingText}>Carregando seus registros...</Text>
      <NutriMascot 
        message="Estou organizando seus registros com muito carinho." 
        size="small"
      />
    </View>
  );

  if (loading) {
    return (
      <View style={[styles.container, { paddingTop: insets.top }]}>
        {renderLoadingState()}
      </View>
    );
  }

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      {/* Filter Tabs */}
      <View style={styles.filterContainer}>
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View style={styles.filterTabs}>
            {[
              { key: 'all', label: 'Todos' },
              { key: 'today', label: 'Hoje' },
              { key: 'week', label: 'Esta Semana' }
            ].map((tab) => (
              <TouchableOpacity
                key={tab.key}
                style={[
                  styles.filterTab,
                  filter === tab.key && styles.activeFilterTab
                ]}
                onPress={() => setFilter(tab.key as any)}
              >
                <Text style={[
                  styles.filterTabText,
                  filter === tab.key && styles.activeFilterTabText
                ]}>
                  {tab.label}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </View>

      {/* Entries List */}
      <FlatList
        data={filteredEntries}
        renderItem={renderEntry}
        keyExtractor={(item) => item.id}
        contentContainerStyle={[
          styles.listContainer,
          filteredEntries.length === 0 && styles.emptyListContainer
        ]}
        ListEmptyComponent={renderEmptyState}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={handleRefresh}
            colors={['#87CEEB']}
            tintColor="#87CEEB"
          />
        }
      />

      {/* Add Button */}
      {filteredEntries.length > 0 && (
        <TouchableOpacity 
          style={[styles.fab, { bottom: insets.bottom + 20 }]}
          onPress={() => router.push('/add-entry')}
        >
          <MaterialIcons name="add" size={28} color="#FFFFFF" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  filterContainer: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F1F3F4',
    paddingVertical: 12,
  },
  filterTabs: {
    flexDirection: 'row',
    paddingHorizontal: 16,
  },
  filterTab: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    marginRight: 12,
    backgroundColor: '#F8F9FA',
  },
  activeFilterTab: {
    backgroundColor: '#87CEEB',
  },
  filterTabText: {
    fontSize: 14,
    color: '#6C757D',
    fontWeight: '500',
  },
  activeFilterTabText: {
    color: '#FFFFFF',
  },
  listContainer: {
    paddingVertical: 8,
  },
  emptyListContainer: {
    flex: 1,
    justifyContent: 'center',
  },
  emptyState: {
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 32,
  },
  loadingText: {
    fontSize: 16,
    color: '#6C757D',
    marginTop: 16,
    marginBottom: 20,
    textAlign: 'center',
  },
  addFirstButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#87CEEB',
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    marginTop: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  addFirstButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  fab: {
    position: 'absolute',
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#87CEEB',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 6,
  },
});