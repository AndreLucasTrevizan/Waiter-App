import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity
} from 'react-native';

import { useRoute, RouteProp, useNavigation } from '@react-navigation/native';
import { api } from '../../services/api';
import { ItemData } from '../Order';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackRoutesProps } from '../../routes/auth.routes';

type RouteDetailsParams = {
  Details: {
    order_id: string;
  }
}

type DetailsRouteProps = RouteProp<RouteDetailsParams, 'Details'>;

export interface OrderItems {
  _id: string,
  amount: string,
  product_id: {
    _id: string,
    name: string,
  },
  description?: string,
  order_id: string
};

interface ItemDetail {
  data: OrderItems
}

function ItemDetail({
  data 
}: ItemDetail) {
  return (
    <View style={styles.item}>
      <Text style={styles.itemText}>{data.amount}x - {data.product_id.name}</Text>
      {data.description && <Text>{data.description}</Text>}
    </View>
  );
}

export default function Details() {
  const { navigate } = useNavigation<NativeStackNavigationProp<StackRoutesProps>>();
  const { params } = useRoute<DetailsRouteProps>();

  const [items, setItems] = useState<OrderItems[] | []>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/items', { params: { order_id: params.order_id } });

        setItems(response.data);
      } catch (error) {
        console.log(`Erro ao trazer items do pedido`);
      }
    }

    loadData();
  }, []);

  const handleConfirmOrder = async () => {
    try {
      await api.patch('/orders/confirm', {}, { params: {
        order_id: params.order_id,
      } });

      navigate('Home');
    } catch (error) {
      console.log(`Erro ao deletar item do pedido: ${error}`);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>Detalhes do pedido</Text>
      </View>

      <FlatList
        data={items}
        style={styles.listItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ItemDetail data={item} />}
      />

      <TouchableOpacity style={styles.button} onPress={handleConfirmOrder}>
        <Text style={styles.buttonText}>Confirmar Pedido</Text>
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
  titleArea: {
    width: '100%',
    paddingVertical: 15,
    justifyContent: 'flex-start'
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    color: '#FFF'
  },
  listItems: {
    width: '100%',
  },
  button: {
    width: '100%',
    height: 40,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#F59A73',
    borderRadius: 5
  },
  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFF'
  },
  item: {
    padding: 15,
    backgroundColor: '#FFFFFF',
    borderRadius: 4,
    marginBottom: 15
  },
  itemText: {
    fontSize: 20
  }
});
