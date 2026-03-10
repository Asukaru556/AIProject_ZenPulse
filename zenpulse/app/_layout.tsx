import { Stack } from 'expo-router';
import { SubscriptionProvider } from '../context/SubscriptionContext';
import { StatusBar } from 'expo-status-bar';

export default function RootLayout() {
  return (
    <SubscriptionProvider>
      <StatusBar style="light" />
      <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0F0E17' } }}>
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(auth)/paywall" options={{ presentation: 'modal' }} />
      </Stack>
    </SubscriptionProvider>
  );
}