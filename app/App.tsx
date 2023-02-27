import React, { useState } from 'react';

import { StatusBar } from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import Routes from './src/routes';
import AuthProvider from './src/contexts/AuthContext';

import Toast from 'react-native-toast-message';
import { BaseToast } from 'react-native-toast-message/lib/src/components/BaseToast';
import { BaseToastProps, ToastConfig } from 'react-native-toast-message/lib/src/types';
import { ErrorToast } from 'react-native-toast-message/lib/src/components/ErrorToast';

const toastConfig: ToastConfig = {
  /*
    Overwrite 'success' type,
    by modifying the existing `BaseToast` component
  */
  success: (props) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: 'green' }}
      contentContainerStyle={{ paddingHorizontal: 15 }}
      text1Style={{
        fontSize: 17,
        fontWeight: '400'
      }}
    />
  ),
  /*
    Overwrite 'error' type,
    by modifying the existing `ErrorToast` component
  */
  error: (props) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17
      }}
      text2Style={{
        fontSize: 15
      }}
    />
  ),
};

export default function App() {
  return (
    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#4B9093' barStyle={'light-content'} />
        <Routes />
        <Toast config={toastConfig} />
      </AuthProvider>
    </NavigationContainer>
  );
}