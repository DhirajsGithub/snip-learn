import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './src/navigation/MainNavigator';
import Orientation from 'react-native-orientation-locker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { COLORS } from './src/theme';



const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait(); 
  }, []);
  return (
    <SafeAreaProvider>
      <StatusBar backgroundColor={COLORS.bg1} barStyle="dark-content" />
      <Provider store={store}>
        <NavigationContainer>
          <GestureHandlerRootView style={{ flex: 1 }}>
          <MainNavigator />
          </GestureHandlerRootView>
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
