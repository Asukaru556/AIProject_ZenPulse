import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useSubscription } from '../../context/SubscriptionContext';
import { useRouter } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../../constants/Colors';

export default function PaywallScreen() {
  const { setSubscribed } = useSubscription();
  const router = useRouter();

  const handlePurchase = () => {
    setSubscribed(true);
    router.replace('/(tabs)');
  };

  return (
    <LinearGradient colors={['#2E1A47', '#0F0E17']} style={styles.container}>
      <ScrollView contentContainerStyle={styles.content}>
        <TouchableOpacity onPress={() => router.back()} style={styles.close}>
          <Ionicons name="close" size={28} color="white" />
        </TouchableOpacity>

        <Text style={styles.title}>Unlock ZenPulse Premium</Text>
        
        <View style={styles.benefits}>
          {['Unlimited AI Affirmations', 'Exclusive Meditations', 'Offline Mode'].map((b) => (
            <View key={b} style={styles.benefitRow}>
              <Ionicons name="checkmark-circle" size={20} color={Colors.accent} />
              <Text style={styles.benefitText}>{b}</Text>
            </View>
          ))}
        </View>

        <TouchableOpacity style={[styles.plan, styles.activePlan]}>
          <Text style={styles.planTitle}>Annual Plan</Text>
          <Text style={styles.planPrice}>$49.99 / year</Text>
          <View style={styles.badge}><Text style={styles.badgeText}>BEST VALUE</Text></View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.plan}>
          <Text style={styles.planTitle}>Monthly Plan</Text>
          <Text style={styles.planPrice}>$9.99 / month</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buyButton} onPress={handlePurchase}>
          <Text style={styles.buyButtonText}>Try Free & Subscribe</Text>
        </TouchableOpacity>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  content: { padding: 30, paddingTop: 60, alignItems: 'center' },
  close: { alignSelf: 'flex-end', marginBottom: 20 },
  title: { fontSize: 32, fontWeight: 'bold', color: 'white', textAlign: 'center', marginBottom: 30 },
  benefits: { alignSelf: 'stretch', marginBottom: 40 },
  benefitRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 15 },
  benefitText: { color: 'white', marginLeft: 10, fontSize: 16 },
  plan: { width: '100%', padding: 20, borderRadius: 15, backgroundColor: Colors.card, marginBottom: 15, borderWidth: 1, borderColor: '#333' },
  activePlan: { borderColor: Colors.accent, borderWidth: 2 },
  planTitle: { color: 'white', fontWeight: 'bold' },
  planPrice: { color: Colors.textSecondary },
  badge: { position: 'absolute', top: -10, right: 10, backgroundColor: Colors.accent, paddingHorizontal: 8, borderRadius: 5 },
  badgeText: { fontSize: 10, fontWeight: 'bold' },
  buyButton: { backgroundColor: Colors.primary, width: '100%', padding: 18, borderRadius: 30, marginTop: 20 },
  buyButtonText: { color: 'white', fontWeight: 'bold', textAlign: 'center', fontSize: 18 }
});