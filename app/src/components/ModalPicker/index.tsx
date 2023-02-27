import React from 'react';

import {
  View,
  Text,
  StyleSheet,
  Dimensions,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import { SafeAreaView } from "react-native-safe-area-context";
import { CategoriesData, ProductsData } from '../../pages/Order';

interface ModalPickerProps {
  options: CategoriesData[] | ProductsData[];
  handleCloseModal: () => void;
  selectedItem: (item: CategoriesData) => void;
};

const {
  width: WIDTH,
  height: HEIGHT
} = Dimensions.get('window');

export default function ModalPicker({
  options,
  handleCloseModal,
  selectedItem
}: ModalPickerProps) {
  
  const onPressItem = (item: CategoriesData | ProductsData) => {
    selectedItem(item);
    handleCloseModal();
  };

  const option = options.map((item, index) => (
    <TouchableOpacity key={index} style={styles.option} onPress={() => onPressItem(item)} >
      <Text style={styles.item}>{item.name}</Text>
    </TouchableOpacity>
  ));
  
  return (
    <TouchableOpacity style={styles.container} onPress={handleCloseModal}>
      <View style={styles.content}>
        <ScrollView>
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'rgba(171, 210, 211, 0.3)',
  },
  content: {
    width: WIDTH - 30,
    height: HEIGHT / 2,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#4B9093',
    borderRadius: 5,
  },
  option: {
    alignItems: 'flex-start',
    borderTopWidth: 0.8,
    borderTopColor: '#4B9093',
  },
  item: {
    margin: 15,
    fontSize: 15,
    fontWeight: 'bold',
    color: '#101026'
  }
});
