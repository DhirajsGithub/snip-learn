import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import HobbySelectScreen from '../screens/HobbySelectScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  HobbySelect: undefined;
  LevelSelect: { hobby: 'chess' | 'poker' | 'guitar' };
  LearningPath: { hobby: string; level: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="Onboarding"
      screenOptions={{
        headerShown: false,
        gestureEnabled: true,
        cardStyle: {backgroundColor: '#FFFFFF'},
        cardOverlayEnabled: false,
        animationTypeForReplace: 'push',
      }}>
      <Stack.Screen
        name="Onboarding"
        component={OnboardingScreen}
        options={{
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="HobbySelect"
        component={HobbySelectScreen}
        options={{
          gestureDirection: 'horizontal-inverted',
        }}
      />
    </Stack.Navigator>
  );
};
