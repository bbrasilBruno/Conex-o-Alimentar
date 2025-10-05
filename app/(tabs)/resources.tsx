import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import NutriMascot from '../../components/NutriMascot';
import { educationalContent } from '../../services/diaryService';

export default function ResourcesScreen() {
  const insets = useSafeAreaInsets();

  const getIconForType = (type: string) => {
    switch (type) {
      case 'article': return 'article';
      case 'meditation': return 'self-improvement';
      case 'exercise': return 'fitness-center';
      default: return 'help-outline';
    }
  };

  const getTypeLabel = (type: string) => {
    switch (type) {
      case 'article': return 'Artigo';
      case 'meditation': return 'Meditação';
      case 'exercise': return 'Exercício';
      default: return 'Recurso';
    }
  };

  const supportContacts = [
    {
      title: 'Centro de Valorização da Vida (CVV)',
      subtitle: 'Apoio emocional e prevenção do suicídio',
      phone: '188',
      available: '24h todos os dias'
    },
    {
      title: 'CAPS - Centro de Atenção Psicossocial',
      subtitle: 'Atendimento em saúde mental',
      phone: 'Busque a unidade mais próxima',
      available: 'Horário comercial'
    },
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
            message="Aqui você encontra ferramentas e conhecimentos para nutrir sua jornada de autoconhecimento. 📚✨" 
            size="medium"
          />
        </View>

        {/* Educational Content */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Conteúdo Educativo</Text>
          <Text style={styles.sectionSubtitle}>
            Materiais cuidadosamente selecionados para apoiar sua relação com a alimentação
          </Text>
          
          {educationalContent.map((content) => (
            <TouchableOpacity key={content.id} style={styles.contentCard}>
              <View style={styles.contentHeader}>
                <MaterialIcons 
                  name={getIconForType(content.type) as any} 
                  size={24} 
                  color="#87CEEB" 
                />
                <View style={styles.contentInfo}>
                  <View style={styles.contentTitleRow}>
                    <Text style={styles.contentTitle}>{content.title}</Text>
                    <View style={styles.contentTypebadge}>
                      <Text style={styles.contentTypeText}>
                        {getTypeLabel(content.type)}
                      </Text>
                    </View>
                  </View>
                  {content.duration && (
                    <Text style={styles.contentDuration}>
                      ⏱️ {content.duration} minutos
                    </Text>
                  )}
                </View>
              </View>
              
              <Text style={styles.contentPreview} numberOfLines={2}>
                {content.content}
              </Text>
              
              <View style={styles.contentTags}>
                {content.tags.map((tag, index) => (
                  <View key={index} style={styles.tag}>
                    <Text style={styles.tagText}>{tag}</Text>
                  </View>
                ))}
              </View>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Tips */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Dicas Rápidas</Text>
          
          {[
            {
              icon: 'schedule',
              title: 'Pause antes de comer',
              description: 'Respire fundo 3 vezes e pergunte: "Como estou me sentindo agora?"'
            },
            {
              icon: 'favorite',
              title: 'Pratique a autocompaixão',
              description: 'Trate-se com a mesma gentileza que você daria a um bom amigo.'
            },
            {
              icon: 'hearing',
              title: 'Escute seu corpo',
              description: 'Seus sinais de fome e saciedade são únicos e válidos.'
            },
            {
              icon: 'eco',
              title: 'Celebre pequenos progressos',
              description: 'Cada momento de consciência é uma vitória a ser celebrada.'
            },
          ].map((tip, index) => (
            <View key={index} style={styles.tipCard}>
              <MaterialIcons name={tip.icon as any} size={24} color="#A8E6CF" />
              <View style={styles.tipContent}>
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDescription}>{tip.description}</Text>
              </View>
            </View>
          ))}
        </View>

        {/* Support Contacts */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Apoio Profissional</Text>
          <Text style={styles.sectionSubtitle}>
            Se você precisa de apoio adicional, estas são opções confiáveis:
          </Text>
          
          {supportContacts.map((contact, index) => (
            <View key={index} style={styles.contactCard}>
              <MaterialIcons name="support-agent" size={24} color="#DDA0DD" />
              <View style={styles.contactInfo}>
                <Text style={styles.contactTitle}>{contact.title}</Text>
                <Text style={styles.contactSubtitle}>{contact.subtitle}</Text>
                <View style={styles.contactDetails}>
                  <Text style={styles.contactPhone}>📞 {contact.phone}</Text>
                  <Text style={styles.contactAvailable}>🕒 {contact.available}</Text>
                </View>
              </View>
            </View>
          ))}
        </View>

        {/* Disclaimer */}
        <View style={styles.disclaimerCard}>
          <MaterialIcons name="info-outline" size={20} color="#6C757D" />
          <View style={styles.disclaimerContent}>
            <Text style={styles.disclaimerTitle}>Importante Lembrar</Text>
            <Text style={styles.disclaimerText}>
              Este aplicativo é uma ferramenta de apoio ao autoconhecimento. Para questões relacionadas a transtornos alimentares, sempre busque acompanhamento de profissionais especializados em saúde mental e nutrição.
            </Text>
          </View>
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
  contentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  contentHeader: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  contentInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contentTitleRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    marginBottom: 4,
  },
  contentTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    flex: 1,
    marginRight: 8,
  },
  contentTypeBadge: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  contentTypeText: {
    fontSize: 12,
    color: '#6C757D',
    fontWeight: '500',
  },
  contentDuration: {
    fontSize: 12,
    color: '#87CEEB',
    fontWeight: '500',
  },
  contentPreview: {
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
    marginBottom: 12,
  },
  contentTags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  tag: {
    backgroundColor: '#F8F9FA',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 12,
    marginRight: 6,
    marginBottom: 4,
    borderWidth: 1,
    borderColor: '#E9ECEF',
  },
  tagText: {
    fontSize: 12,
    color: '#495057',
  },
  tipCard: {
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
  tipContent: {
    flex: 1,
    marginLeft: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  tipDescription: {
    fontSize: 14,
    color: '#6C757D',
    lineHeight: 20,
  },
  contactCard: {
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
  contactInfo: {
    flex: 1,
    marginLeft: 12,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#495057',
    marginBottom: 4,
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#6C757D',
    marginBottom: 8,
  },
  contactDetails: {
    gap: 4,
  },
  contactPhone: {
    fontSize: 14,
    color: '#87CEEB',
    fontWeight: '500',
  },
  contactAvailable: {
    fontSize: 12,
    color: '#6C757D',
  },
  disclaimerCard: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    backgroundColor: '#FFF3CD',
    padding: 16,
    borderRadius: 16,
    marginHorizontal: 16,
    borderWidth: 1,
    borderColor: '#FED7AA',
  },
  disclaimerContent: {
    flex: 1,
    marginLeft: 12,
  },
  disclaimerTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#856404',
    marginBottom: 4,
  },
  disclaimerText: {
    fontSize: 13,
    color: '#856404',
    lineHeight: 18,
  },
});