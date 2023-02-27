import React, { useContext, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity
} from 'react-native';
import { AuthContext } from '../../contexts/AuthContext';

export default function SignIn() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuthContext);
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Waiter App</Text>
      <TextInput
        placeholder='Digite seu email'
        value={email}
        onChangeText={(text) => setEmail(text)}
        style={styles.input}
        placeholderTextColor='#FFFFFF'
      />
      <TextInput
        placeholder='Digite sua senha'
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
        style={styles.input}
        placeholderTextColor='#FFFFFF'
      />
      <TouchableOpacity style={styles.button} onPress={() => signIn({ email, password })}>
        <Text style={styles.buttonText}>Acessar</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4B9093',
    padding: 15
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 15,
    paddingBottom: 15,
    borderBottomWidth: 1,
    width: '100%',
    textAlign: 'center',
    borderBottomColor: '#FFFFFF'
  },
  input: {
    height: 40,
    borderRadius: 5,
    paddingLeft: 15,
    color: '#FFFFFF',
    backgroundColor: 'rgba(171, 210, 211, 0.3)',
    width: '100%',
    marginBottom: 15,
    fontSize: 18
  },
  button: {
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59A73',
    width: '100%',
    borderRadius: 5
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: 'bold'
  }
});
