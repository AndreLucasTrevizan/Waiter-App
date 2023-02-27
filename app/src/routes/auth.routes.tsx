import React from 'react';

import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Home from '../pages/Home';
import Order from '../pages/Order';
import Details from '../pages/Details';

export type StackRoutesProps = {
  Home: undefined,
  Order: {
    table: string,
    order_id: string
  },
  Details: {
    order_id: string
  }
};

const Stack = createNativeStackNavigator<StackRoutesProps>();

export default function AuthRouter() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name='Home'
        component={Home}
        options={{
          headerTransparent: true,
          title: 'Bem vindo ao Waiter App',
          headerTintColor: '#FFFFFF',
          headerTitleStyle: {
            fontSize: 25,
          },
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name='Order'
        component={Order}
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen
        name='Details'
        component={Details}
        options={{
          title: 'Voltar',
          headerTintColor: '#FFFFFF',
          headerStyle: {
            backgroundColor: '#F59A73'
          }
        }}
      />
    </Stack.Navigator>
  );
}
