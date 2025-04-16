import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './src/navigation/MainNavigator';
import Orientation from 'react-native-orientation-locker';


const App = () => {
  useEffect(() => {
    Orientation.lockToPortrait(); 
  }, []);
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </Provider>
    </SafeAreaProvider>
  );
};

export default App;
