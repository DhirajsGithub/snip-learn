import React from 'react';
import 'react-native-gesture-handler';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';
import { store } from './src/store/store';
import { NavigationContainer } from '@react-navigation/native';
import { MainNavigator } from './src/navigation/MainNavigator';

const App = () => {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <SafeAreaView 
          style={{ flex: 1 }} 
          edges={['top', 'left', 'right']} // ← Fixes notch issues
        >
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </SafeAreaView>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;