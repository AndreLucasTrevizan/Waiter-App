import React, { useState } from 'react';

import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Toast from 'react-native-toast-message';
import { api } from '../../services/api';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { useNavigation } from '@react-navigation/native';
import { StackRoutesProps } from '../../routes/auth.routes';

export default function Home() {
  const [loading, setLoading] = useState(false);
  const [table, setTable] = useState('');

  const { navigate } = useNavigation<NativeStackNavigationProp<StackRoutesProps>>();

  const handleOpeningTable = async () => {
    setLoading(true);

    try {
      if (table === '') {
        Toast.show({
          type: 'error',
          text1: 'Preencha o número da mesa',
        });
        setLoading(false);
        return;  
      }

      const response = await api.post('/orders', { table });
      
      setTable('');
      setLoading(false);
      navigate('Order', { table, order_id: response.data._id });
    } catch (error) {
      setLoading(false);
      console.log(`Erro ao abrir mesa: ${error}`  );
      Toast.show({
        type: 'error',
        text1: 'Ops',
        text2: 'Erro ao abrir mesa'
      });
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Abrir Mesa</Text>
      <TextInput
        placeholder='Digite o número da mesa'
        keyboardType='numeric'
        style={styles.input}
        placeholderTextColor='#FFFFFF'
        value={table}
        onChangeText={(text) => setTable(text)}
      />
      <TouchableOpacity style={styles.button} onPress={() => handleOpeningTable()}>
        {loading ? (
          <ActivityIndicator color={'#FFFFFF'} size={25} />
        ) : (
          <Text style={styles.buttonText}>Abrir</Text>
        )}
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
    fontSize: 30,
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
