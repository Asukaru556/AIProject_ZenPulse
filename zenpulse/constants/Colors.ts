export const Colors = {
  primary: '#6D5AD3', // Глубокий фиолетовый для "Zen"
  accent: '#FFD700',  // Золотой для Premium
  background: '#0F0E17', 
  card: '#1B1A23',
  text: '#FFFFFF',
  textSecondary: '#A7A9BE',
  locked: 'rgba(255, 255, 255, 0.1)',
};

export const MEDITATIONS = [
  { 
    id: '1', 
    title: 'Deep Sleep', 
    duration: '10 min', 
    isPremium: true, 
    image: require('../assets/images/deepSleepAi.png') 
  },
  { 
    id: '2', 
    title: 'Morning Energy', 
    duration: '5 min', 
    isPremium: true, 
    image: require('../assets/images/MorningEnergyAi.png')
  },
  { 
    id: '3', 
    title: 'Focus Boost', 
    duration: '15 min', 
    isPremium: false, 
    image: require('../assets/images/FocusBoostAi.png') 
  },
  { 
    id: '4', 
    title: 'Anxiety Relief', 
    duration: '12 min', 
    isPremium: false, 
    image: require('../assets/images/AnxietyReliefAi.png') 
  },
];