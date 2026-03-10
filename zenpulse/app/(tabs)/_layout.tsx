import React from 'react';
import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; // Используем более универсальные иконки
import { Colors } from '../../constants/Colors'; // Твой кастомный конфиг цветов
import { useSubscription } from '../../context/SubscriptionContext';

export default function TabLayout() {
  const { isSubscribed } = useSubscription();

  return (
    <Tabs
      screenOptions={{
        // Фиксируем темную тему для Zen-эффекта
        tabBarActiveTintColor: Colors.primary,
        tabBarInactiveTintColor: '#888',
        tabBarStyle: {
          backgroundColor: Colors.background,
          borderTopColor: '#222',
          paddingBottom: 5,
        },
        headerShown: false, // В мобилках лучше кастомные заголовки
      }}>
      
      <Tabs.Screen
        name="index"
        options={{
          title: 'Meditations',
          tabBarIcon: ({ color }) => (
            <Ionicons name="leaf-outline" size={24} color={color} />
          ),
        }}
      />

      {/* Важно: Если в папке (tabs) НЕТ файла two.tsx, 
        удаляем или комментируем этот блок ниже 
      */}
      {/* <Tabs.Screen
        name="two"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => (
            <Ionicons name="person-outline" size={24} color={color} />
          ),
        }}
      /> 
      */}
    </Tabs>
  );
}