import React, {useEffect, useState} from 'react';
import {
  SafeAreaView,
  Text,
  StatusBar,
  View,
} from 'react-native';
import useGlobal from './src/core/global';
import  './src/core/fontawesome'
import { NavigationContainer, DefaultTheme } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import SplashScreen from './src/screens/Splash';
import Signin from './src/screens/Signin';
import Signup from './src/screens/Signup';
import MessageScreen from './src/screens/Message';
import SearchScreen from './src/screens/Search';
import Home from './src/screens/Home';

const LightTheme = {
  ...DefaultTheme,
  colors: {
    ...DefaultTheme.colors,
    background: 'white',
  }
}

const Stack = createNativeStackNavigator()

function App() {
  const initialized = useGlobal(state => state.initialized);
  const authenticated = useGlobal(state => state.authenticated);
  const init = useGlobal(state => state.init);

  useEffect(() => {
    init()
  }, [])

  return (
    <NavigationContainer theme={LightTheme}>
      <StatusBar barStyle="dark-content" />
      <Stack.Navigator>
        {!initialized ? (
          <>
            <Stack.Screen name="Splash" component={SplashScreen} />
          </>
        ) : !authenticated ? (
          <>
            <Stack.Screen name="SignIn" component={Signin} />
            <Stack.Screen name="SignUp" component={Signup} />
          </>
        ) : (
          <>
            <Stack.Screen name="Home" component={Home} />
            <Stack.Screen name="Messages" component={MessageScreen} 
              options={{headerBackVisible: false}} 
            />
            <Stack.Screen name="Search" component={SearchScreen} 
              options={{headerShown: false}} 
            />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
