import React, { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';
import AppRouter from './app.routes';
import AuthRouter from './auth.routes';

import {
  View,
  ActivityIndicator,
  StyleSheet
} from 'react-native';

export default function Routes() {
  const { isAuthenticated, loading } = useContext(AuthContext);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color='#4B9093' size={40} />
      </View>
    );
  }
  
  return (
    isAuthenticated ? <AuthRouter /> : <AppRouter />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
});
