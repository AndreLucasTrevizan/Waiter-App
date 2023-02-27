import React, { useEffect, useState } from 'react';

import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Modal,
  FlatList,
  TextInput,
  Keyboard
} from 'react-native';

import Feather from '@expo/vector-icons/Feather';
import { api } from '../../services/api';
import { RouteProp, useRoute } from '@react-navigation/native';
import ModalPicker from '../../components/ModalPicker';
import ItemList from '../../components/ItemList';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { StackRoutesProps } from '../../routes/auth.routes';
import { Toast } from 'react-native-toast-message/lib/src/Toast';

export interface CategoriesData {
  _id: string,
  name: string,
};

export interface ProductsData {
  _id: string,
  name: string,
  description?: string,
};

type RouteDetailsParams = {
  Order: {
    table: string | number;
    order_id: string;
  }
}

export interface ItemData {
  _id: string,
  amount: string,
  description?: string,
  product_id: {
    _id: string,
    name: string,
    description?: string
  },
  order_id: string
}

type OrderRouteProps = RouteProp<RouteDetailsParams, 'Order'>;

export default function Order() {
  const { navigate } = useNavigation<NativeStackNavigationProp<StackRoutesProps>>();
  const { params } = useRoute<OrderRouteProps>();

  const [categories, setCategories] = useState<CategoriesData[] | []>([]);
  const [categorySelected, setCategorySelected] = useState<CategoriesData | undefined>();
  const [products, setProducts] = useState<ProductsData[] | []>([]);
  const [productSelected, setProductSelected] = useState<ProductsData | undefined>();
  const [description, setDescription] = useState('');
  const [amount, setAmount] = useState('1');
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);
  const [modalProductVisible, setModalProductVisible] = useState(false);
  const [items, setItems] = useState<ItemData[] | []>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/categories');

        setCategories(response.data);
        setCategorySelected(response.data[0]);
      } catch (error) {
        console.log(`Erro ao buscar as categorias: ${error}`);
      }
    }

    loadData();
  }, []);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/products', { params: {
          category_id: categorySelected?._id
        } });

        setProducts(response.data);
        setProductSelected(response.data[0]);
      } catch (error) {
        console.log(`Erro ao buscar os produtos: ${error}`);
      }
    }

    loadData();
  }, [ categorySelected ]);

  const handleChangeCategory = (item: CategoriesData) => {
    setCategorySelected(item);
  }

  const handleChangeProduct = (item: ProductsData) => {
    setProductSelected(item);
  }

  const handleAddItem = async () => {
    try {
      if (amount === '') {
        Toast.show({
          type: 'error',
          text1: 'Preencha a quantidade'
        });
        return;
      }

      let data = {
        amount: Number(amount),
        product_id: productSelected?._id,
        order_id: params.order_id,
        description,
      };

      const response = await api.post('/items', data);
      
      let new_item = {
        _id: response.data._id,
        amount: response.data.amount,
        product_id: productSelected as ProductsData,
        order_id: response.data.order_id,
        description,
      };

      setItems(old_items => [...old_items, new_item]);
      setDescription('');
      Keyboard.dismiss();
    } catch (error) {
      console.log(`Erro ao cadastrar produto: ${error}`);
    }
  };

  const handleDeleteItem = async (selected_item: ItemData) => {
    try {
      const response = await api.delete('/items/remove', { params: {
        order_id: params.order_id,
        product_id: productSelected?._id,
      } });

      const new_items = items.filter(item => item._id !== selected_item._id);

      setItems(new_items); 
    } catch (error) {
      console.log(`Erro ao deletar item do pedido: ${error}`);
    }
  };

  const handleConfirmOrder = () => {
    navigate('Details', { order_id: params.order_id });
  };

  return (
    <View style={styles.container}>
      <View style={styles.titleArea}>
        <Text style={styles.title}>Mesa {params.table}</Text>
      </View>
      <TouchableOpacity style={styles.buttonSelect} onPress={() => setModalCategoryVisible(true)}>
        <Text style={styles.buttonText}>{categorySelected?.name}</Text>
        <Feather name='arrow-down' color='#FFF' size={18} />
      </TouchableOpacity>
      {products.length > 0 && (
        <TouchableOpacity style={styles.buttonSelect} onPress={() => setModalProductVisible(true)}>
          <Text style={styles.buttonText}>{productSelected?.name}</Text>
          <Feather name='arrow-down' color='#FFF' size={18} />
        </TouchableOpacity>
      )}
      <TextInput
        style={styles.textarea}
        multiline={true}
        numberOfLines={4}
        placeholderTextColor='#FFFFFF'
        placeholder='Digite a descrição'
        value={description}
        onChangeText={(text) => setDescription(text)}
      />
      <View style={styles.amountContainer}>
        <TouchableOpacity style={styles.buttonAmount} onPress={() => handleAddItem()}>
          <Text style={styles.buttonAmountText}>+</Text>
        </TouchableOpacity>
        <TextInput
          style={[styles.inputAmount]}
          placeholder='Digite a quantidade'
          keyboardType='numeric'
          value={amount}
          onChangeText={(text) => setAmount(text)}
        />
      </View>

      <TouchableOpacity style={styles.buttonAddItem} onPress={handleConfirmOrder}>
        <Text style={styles.buttonAddItemText}>Confirmar Pedido</Text>
      </TouchableOpacity>

      <FlatList
        data={items}
        style={styles.listItems}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => <ItemList handleRemoveItem={handleDeleteItem} data={item} />}
      />

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType='slide'
      >
        <ModalPicker
          handleCloseModal={() => setModalCategoryVisible(false)}
          options={categories}
          selectedItem={handleChangeCategory}
        />
      </Modal>

      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType='slide'
      >
        <ModalPicker
          handleCloseModal={() => setModalProductVisible(false)}
          options={products}
          selectedItem={handleChangeProduct}
        />
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#4B9093',
    padding: 15
  },
  buttonSelect: {
    height: 40,
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(171, 210, 211, 0.3)',
    width: '100%',
    marginBottom: 15,
    fontSize: 18,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textarea: {
    borderRadius: 5,
    paddingLeft: 15,
    paddingRight: 15,
    backgroundColor: 'rgba(171, 210, 211, 0.3)',
    width: '100%',
    marginBottom: 15,
    fontSize: 18,
    color: '#FFFFFF',
    textAlignVertical: 'top',
    paddingTop: 15,
  },
  buttonText: {
    fontSize: 18,
    color: '#FFFFFF'
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
  amountContainer: {
    width: '100%',
    flexDirection: 'row',
  },
  inputAmount: {
    height: 40,
    borderRadius: 5,
    paddingLeft: 15,
    color: '#FFFFFF',
    backgroundColor: 'rgba(171, 210, 211, 0.3)',
    fontSize: 18,
    marginLeft: 15,
    textAlign: 'center',
    flex: 3
  },
  buttonAmount: {
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F59A73',
    borderRadius: 5,
    flex: 1,
  },
  buttonAmountText: {
    fontSize: 25,
    color: '#FFFFFF'
  },
  buttonAddItem: {
    marginVertical: 15,
    height: 40,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F59A73',
    borderRadius: 5,
  },
  buttonAddItemText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF'
  },
  listItems: {
    width: '100%',
    flex: 1
  }
});
