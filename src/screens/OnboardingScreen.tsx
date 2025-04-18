// src/screens/OnboardingScreen.tsx
import React, {useRef, useState} from 'react';
import {View, Text, StyleSheet, Pressable} from 'react-native';
import LottieView from 'lottie-react-native';
import {useNavigation} from '@react-navigation/native';
import {RootStackParamList} from '../navigation/MainNavigator';
import {StackNavigationProp} from '@react-navigation/stack';
import {COLORS} from '../theme';
import AppFlowBottomSheet, {
  AppFlowBottomSheetRef,
} from '../components/AppFlowBottomSheet';

type OnboardingNavProp = StackNavigationProp<RootStackParamList, 'Onboarding'>;

const OnboardingScreen = () => {
  const animationRef = useRef<LottieView>(null);
  const navigation = useNavigation<OnboardingNavProp>();
  return (
    <View style={styles.container}>
      {/* Animated Header */}

      <LottieView
        ref={animationRef}
        source={require('../assets/animations/welcome.json')}
        autoPlay
        loop={false}
        style={styles.animation}
        onAnimationFinish={() => animationRef.current?.play()}
      />

      <Text style={styles.title}>Learn Smarter, Not Harder</Text>
      <Text style={styles.subtitle}>
        We curate just 5-8 techniques tailored to your goals
      </Text>

      {/* Swipe Tutorial */}
      <LottieView
        source={require('../assets/animations/swipe.json')}
        autoPlay
        loop
        style={styles.swipeAnimation}
      />

      {/* Get Started Button */}
      <Pressable
        style={({pressed}) => [styles.button, {opacity: pressed ? 0.8 : 1}]}
        onPress={() => navigation.navigate('HobbySelect')}>
        <Text style={styles.buttonText}>Get Started</Text>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: COLORS.bg1,
  },
  animation: {
    width: 300,
    height: 300,
  },
  swipeAnimation: {
    width: 200,
    height: 100,
    marginVertical: 30,
  },
  title: {
    textAlign: 'center',
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: COLORS.title,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    color: COLORS.subtitle,
    paddingHorizontal: 40,
  },
  button: {
    backgroundColor: COLORS.action,
    paddingVertical: 15,
    paddingHorizontal: 40,
    borderRadius: 30,
    marginTop: 40,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
    fontSize: 18,
  },
});

export default OnboardingScreen;
