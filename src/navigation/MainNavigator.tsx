import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import OnboardingScreen from '../screens/OnboardingScreen';
import HobbySelectScreen from '../screens/HobbySelectScreen';
import LevelSelectScreen from '../screens/LevelSelectScreen';
import LearningPathScreen from '../screens/LearningPathScreen';
import TechniqueDetailScreen from '../screens/TechniqueDetailScreen';

export type RootStackParamList = {
  Onboarding: undefined;
  HobbySelect: undefined;
  LevelSelect: undefined;
  LearningPath: undefined;
  TechniqueDetail: {technique: any};
};

const Stack = createStackNavigator<RootStackParamList>();

export const MainNavigator = () => {
  return (
    <Stack.Navigator
      initialRouteName="LearningPath"
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
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="LevelSelect"
        component={LevelSelectScreen}
        options={{
          gestureDirection: 'horizontal',
        }}
      />
      <Stack.Screen
        name="LearningPath"
        component={LearningPathScreen}
        options={{
          gestureDirection: 'horizontal',
        }}
      />
       <Stack.Screen
        name="TechniqueDetail"
        component={TechniqueDetailScreen}
        options={{
          gestureDirection: 'horizontal',
        }}
      />
    </Stack.Navigator>
  );
};
