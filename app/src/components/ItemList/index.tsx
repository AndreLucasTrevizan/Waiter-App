import React from 'react';

import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';
import { ItemData } from '../../pages/Order';

interface ItemListProps {
  data: ItemData,
  handleRemoveItem: (item: ItemData) => void;
}

export default function ItemList({
  data,
  handleRemoveItem
}: ItemListProps) {
  return (
    <View style={styles.item}>
        <View style={styles.itemInfo}>
          <Text style={styles.itemText}>{data.amount}x - {data.product_id.name}</Text>
          {data.description !== '' && <Text style={styles.itemDescription}>{data.description}</Text>}
        </View>
        <TouchableOpacity onPress={() => handleRemoveItem(data)}>
          <Feather name='trash-2' size={25} color='#F59A73' />
        </TouchableOpacity>
      </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#FFF',
    borderRadius: 5,
    backgroundColor: '#FFFFFF',
    marginBottom: 15
  },
  itemInfo: {
    flex: 1
  },
  itemText: {
    color: '#323232',
    fontSize: 18
  },
  itemDescription: {
    color: '#323232',
    marginLeft: 35
  }
});
