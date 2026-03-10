import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useSubscription } from '../context/SubscriptionContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/Colors';

export default function MeditationCard({ item }: { item: any }) {
  const { isSubscribed } = useSubscription();
  const router = useRouter();
  const isLocked = item.isPremium && !isSubscribed;

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={() => isLocked ? router.push('/paywall' as any) : null}
      activeOpacity={0.8}
    >
      {/* Теперь используем локальное изображение из объекта item */}
      <Image source={item.image} style={[styles.image, { opacity: isLocked ? 0.4 : 0.7 }]} />
      
      <View style={styles.overlay}>
        <View style={styles.textContainer}>
          <Text style={styles.title}>{item.title}</Text>
          <Text style={styles.duration}>{item.duration}</Text>
        </View>
        
        {isLocked && (
          <View style={styles.lockBadge}>
            <Ionicons name="lock-closed" size={18} color="white" />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: { 
    height: 180, 
    borderRadius: 20, 
    overflow: 'hidden', 
    marginBottom: 20,
    backgroundColor: '#000', // Фон для эффекта затемнения
  },
  image: { 
    width: '100%', 
    height: '100%', 
    position: 'absolute' 
  },
  overlay: { 
    flex: 1,
    padding: 20, 
    justifyContent: 'flex-end', 
    flexDirection: 'row', 
    alignItems: 'flex-end',
    backgroundColor: 'rgba(0,0,0,0.2)' // Легкий градиент поверх для читаемости текста
  },
  textContainer: {
    flex: 1,
  },
  title: { 
    color: 'white', 
    fontSize: 22, 
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: -1, height: 1 },
    textShadowRadius: 10 
  },
  duration: { 
    color: Colors.textSecondary,
    fontSize: 14,
    fontWeight: '600'
  },
  lockBadge: { 
    backgroundColor: 'rgba(109, 90, 211, 0.9)', // Используем наш основной фиолетовый
    padding: 10, 
    borderRadius: 50, 
    marginLeft: 'auto' 
  }
});