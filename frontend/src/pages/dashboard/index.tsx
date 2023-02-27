import Head from 'next/head';
import { useState } from 'react';
import Modal from '../../components/Modal';
import Header from '../../components/ui/Header';
import styles from './styles.module.scss';

import { FiRefreshCcw } from 'react-icons/fi';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { setupApiClient } from '../../services/api';
import { toast } from 'react-toastify';
import { api } from '../../services/apiClient';
import { Oval } from 'react-loader-spinner';

interface DashboardProps {
  listOrders: Orders[]
}

export interface Orders {
  _id: string,
  table: string,
  status: boolean,
  draft: boolean,
  createdAt: Date,
  updatedAt: Date
};

export default function Dashboard({
  listOrders
}: DashboardProps) {
  const [orders, setOrders] = useState(listOrders || []);
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Orders | null>();
  const [modalVisible, setModalVisible] = useState(false);

  const handleModalVisible = () => {
    setModalVisible(false);
  }

  const handleShowModal = (order: Orders) => {
    setModalVisible(true);
    setSelectedOrder(order);
  }

  const refreshOrderList = async () => {
    setLoading(true);
    try {
      const response = await api.get('/orders');

      setOrders(response.data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(`Erro ao atualizar os pedidos: ${error}`);
      toast.error('Erro ao atualizar a lista de pedidos');
    }
  };

  return (
    <>
      <Head>
        <title>Painel Inicial - Waiter</title>
      </Head>

      <div>
        <Header />
        <div className={styles.centeredContainer}>
          <div className={styles.title}>
            <h1>Pedidos</h1>
            <FiRefreshCcw
              size={25}
              color='#4B9093'
              className={styles.refreshIcon}
              onClick={refreshOrderList}
            />
          </div>
          {loading && (
            <div
              style={{
                width: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignContent: 'center'
              }}
            >
              <Oval
                width={50}
                height={50}
                color='#4B9093'
                secondaryColor='#FFFFFF'
              />
            </div>
          )}
          {(orders.length > 0 && !loading) && (
            orders.map(order => (
              <div className={styles.order} key={order._id}>
                <div className={styles.tag}></div>
                <div className={styles.tagContent}>
                  <span onClick={() => handleShowModal(order)}>Mesa {order.table}</span>
                </div>
              </div>
            ))
          )}
          {(orders.length === 0 && !loading) && (
            <h2>Nenhum pedido em aberto</h2>
          )}
          {modalVisible && <Modal table={selectedOrder.table} order_id={selectedOrder._id} handleCloseModal={handleModalVisible} />}
        </div>
      </div>
    </>
  );
}

export const getServerSideProps = canSSRAuth(async (ctx) => {

  const api = setupApiClient(ctx);

  const response = await api.get('/orders');

  return {
    props: {
      listOrders: response.data,
    }
  }
});
