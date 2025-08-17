import React, { useEffect } from 'react';
import 'react-native-gesture-handler';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {store} from './src/store/store';
import {NavigationContainer} from '@react-navigation/native';
import {MainNavigator} from './src/navigation/MainNavigator';
import Orientation from 'react-native-orientation-locker';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { StatusBar, Text, View } from 'react-native';
import { COLORS } from './src/theme';



const App = () => {
  console.log("App rendered!");
  return (
    <View>
      <Text style={{color: "black"}}>Hello Wefdfb!</Text>
    </View>
  );
};


export default App;
