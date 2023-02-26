import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Screen1 from './components/Screen1';
import Screen2 from './components/Screen2';

const Stack = createStackNavigator();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Users" component={Screen1} />
        <Stack.Screen name="Your Profile" component={Screen2} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
