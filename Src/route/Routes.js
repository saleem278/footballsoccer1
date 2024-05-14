import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import BottomTab from './BottomTab';
import SingleMatch from '../screens/NormalScreen/SingleMatch';
import SingleNews from '../screens/NormalScreen/SingleNews';

const Stack = createNativeStackNavigator();

const Routes = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="BottomTab"
          component={BottomTab}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SingleMatch"
          component={SingleMatch}
          options={{headerShown: false}}
        />
        <Stack.Screen
          name="SingleNews"
          component={SingleNews}
          options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Routes;
