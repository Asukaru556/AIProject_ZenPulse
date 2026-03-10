import { View, Text, FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useSubscription } from '../../context/SubscriptionContext';
import { MEDITATIONS, Colors } from '../../constants/Colors';
import MeditationCard from '../../components/MeditationCard';
import { useState, useEffect, useRef } from 'react';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
export default function HomeScreen() {
  const { isSubscribed } = useSubscription();
  const router = useRouter();
  
  const [aiText, setAiText] = useState('How are you feeling today?');
  const [displayedText, setDisplayedText] = useState('');
  const [loading, setLoading] = useState(false);
  
  const typingIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Исправленная функция печати без ошибок
  const typeText = (fullText: string) => {
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    setDisplayedText(''); 
    let index = 0;
    
    typingIntervalRef.current = setInterval(() => {
      // Используем slice для безопасности, чтобы буквы не путались
      setDisplayedText((prev) => fullText.slice(0, index + 1)); 
      index++;
      
      if (index >= fullText.length) {
        if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
      }
    }, 40);
  };

  useEffect(() => {
    typeText(aiText);
    return () => { if (typingIntervalRef.current) clearInterval(typingIntervalRef.current); };
  }, []);

  const generateAffirmation = (mood: string) => {
    setLoading(true);
    setDisplayedText(''); 
    if (typingIntervalRef.current) clearInterval(typingIntervalRef.current);
    
    setTimeout(() => {
      const texts: Record<string, string> = {
        'happy': 'Your joy is a lighthouse for others and brightens the world.',
        'sad': 'Every storm passes, and you are stronger than you know right now.',
        'zen': 'The universe breathes with you in this perfect, silent moment.'
      };
      
      const selectedText = texts[mood];
      setLoading(false);
      typeText(selectedText); 
    }, 1000);
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: Colors.background }}>
      <View style={styles.header}>
        {/* НОВЫЙ ЗАГОЛОВОК: Название + Кнопка Premium */}
        <View style={styles.titleRow}>
          <Text style={styles.greeting}>ZenPulse AI</Text>
          
          <TouchableOpacity 
            onPress={() => router.push('/paywall' as any)}
            activeOpacity={0.8}
          >
            <LinearGradient
              colors={[Colors.accent, '#F39C12']} // Золотой градиент
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.premiumBtn}
            >
              <Ionicons name="star" size={16} color="#4A3B00" style={{ marginRight: 6 }} />
              <Text style={styles.premiumText}>Go Premium</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
        
        <View style={styles.aiBox}>
          <Text style={styles.aiText}>
            {loading ? 'Thinking...' : displayedText}
          </Text>
          
          <View style={styles.moods}>
            {['happy', 'sad', 'zen'].map((m) => (
              <TouchableOpacity key={m} onPress={() => generateAffirmation(m)} style={styles.moodBtn}>
                <Text style={{ fontSize: 24 }}>{m === 'happy' ? '😊' : m === 'sad' ? '😔' : '🧘'}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <FlatList
        data={MEDITATIONS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <MeditationCard item={item} />}
        contentContainerStyle={{ padding: 20 }}
        ListHeaderComponent={<Text style={styles.sectionTitle}>Daily Meditations</Text>}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  header: { padding: 20 },
  titleRow: { 
    flexDirection: 'row', 
    justifyContent: 'space-between', 
    alignItems: 'center', 
    marginBottom: 25 
  },
  greeting: { fontSize: 28, fontWeight: 'bold', color: 'white' },
  
  // КРАСИВАЯ КНОПКА PREMIUM
  premiumBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
    borderRadius: 25,
    shadowColor: Colors.accent,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5
  },
  premiumText: {
    color: '#4A3B00', // Темный золотой для контраста
    fontWeight: 'bold',
    fontSize: 14,
    textTransform: 'uppercase',
    letterSpacing: 0.5
  },

  aiBox: { 
    backgroundColor: Colors.card, 
    padding: 20, 
    borderRadius: 24, 
    borderLeftWidth: 4, 
    borderLeftColor: Colors.primary 
  },
  aiText: { 
    color: 'white', 
    fontSize: 16, 
    fontStyle: 'italic', 
    lineHeight: 22,
    minHeight: 44, // Чтобы контейнер не прыгал при очистке текста
    marginBottom: 15
  },
  moods: { 
    flexDirection: 'row', 
    justifyContent: 'space-around',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.05)',
    paddingTop: 15
  },
  moodBtn: { padding: 5 },
  sectionTitle: { color: 'white', fontSize: 20, fontWeight: 'bold', marginBottom: 15 }
});