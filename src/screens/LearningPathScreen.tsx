import React, {useEffect, useState} from 'react';
import {
  View,
  StyleSheet,
  SafeAreaView,
  Text,
  ActivityIndicator,
} from 'react-native';
import {useSelector, useDispatch} from 'react-redux';
import LottieView from 'lottie-react-native';
import ConfettiCannon from 'react-native-confetti-cannon';
import {COLORS} from '../theme';

const LearningPathScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const {selected: selectedHobby, level: selectedLevel, hobbyDetails} = useSelector(
    state => state.hobby,
  );
  
  const [isLoading, setIsLoading] = useState(true);
  const [showConfetti, setShowConfetti] = useState(false);
  const [learningPath, setLearningPath] = useState([]);
  
  // Placeholder for path generation - we'll implement this next
  useEffect(() => {
    // Simulate loading for now
    setTimeout(() => {
      setIsLoading(false);
      setShowConfetti(true);
    }, 3000);
  }, []);

  if (isLoading) {
    return (
      <SafeAreaView style={styles.loadingContainer}>
        <Text style={styles.loadingTitle}>Crafting your personalized learning path</Text>
        <Text style={styles.loadingSubtitle}>
          We're filtering out useless YouTube videos...
        </Text>
        <ActivityIndicator size="large" color={COLORS.action} style={styles.loader} />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      {showConfetti && (
        <ConfettiCannon 
          count={200} 
          origin={{x: -10, y: 0}} 
          autoStart={true} 
          fadeOut={true}
          onAnimationEnd={() => setShowConfetti(false)}
        />
      )}
      <Text style={styles.header}>
        Your 8-Step Path to {selectedLevel} {selectedHobby}
      </Text>
      
      {/* Will add technique cards here */}
      <Text>Learning path content will go here</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.bg1,
    padding: 16,
  },
  loadingContainer: {
    flex: 1,
    backgroundColor: COLORS.bg1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  loadingTitle: {
    fontSize: 22, 
    fontWeight: 'bold',
    color: COLORS.title,
    marginBottom: 8,
    textAlign: 'center',
  },
  loadingSubtitle: {
    fontSize: 16,
    color: COLORS.subtitle,
    marginBottom: 24,
    textAlign: 'center',
  },
  loader: {
    marginTop: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: COLORS.title,
    marginVertical: 16,
  },
});

export default LearningPathScreen;