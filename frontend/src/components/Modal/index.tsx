import styles from './styles.module.scss';

import { MdShoppingCart } from 'react-icons/md';
import { FiX } from 'react-icons/fi';
import { Orders } from '../../pages/dashboard';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../../services/apiClient';

interface ModalProps {
  handleCloseModal: () => void;
  order_id: string,
  table: string,
}

interface OrderItems {
  _id: string,
  amount: number,
  description?: string,
  product_id: {
    _id: string,
    name: string,
  },
  order_id: string,
  createdAt: Date,
  updatedAt: Date
}

export default function Modal({
  handleCloseModal,
  order_id,
  table
}: ModalProps) {
  const [items, setItems] = useState<OrderItems[] | []>([]);

  useEffect(() => {
    async function loadData() {
      try {
        const response = await api.get('/items', { params: { order_id } });

        setItems(response.data);
      } catch (error) {
        console.log(`Erro ao buscar items do pedido: ${error}`);
        toast.error('Erro ao buscar items do pedido');
      }
    }

    loadData();
  }, []);

  const handleFinishOrder = async () => {
    try {
      await api.patch('/orders/finish', {}, { params: { order_id } });

      toast.success('Pedido finalizado com sucesso');
      handleCloseModal();
    } catch (error) {
      console.log(`Erro ao finalizar pedido: ${error}`);
      toast.error('Erro ao finalizar pedido');
    }
  };

  return (
    <div className={styles.modal}>
      <div className={styles.modalOverlay} onClick={handleCloseModal}></div>
      <div className={styles.modalContent}>
        <div className={styles.modalHeader}>
          <h3>Mesa {table}</h3>
          <FiX
            size={25}
            color='#4B9093'
            className={styles.closeIcon}
            onClick={handleCloseModal}
          />
        </div>
        {items.length > 0 && (
          items.map((item: OrderItems) => (
            <div className={styles.itemDetails} key={item._id}>
              <span>{item.amount}x - <strong>{item.product_id.name}</strong></span>
              {item.description && <small>{item?.description}</small>}
            </div>
          ))
        )}
        <div className={styles.modalActions}>
          <button onClick={handleFinishOrder}>
            Concluir
            <MdShoppingCart
              size={20}
              color='#FFF'
              style={{
                marginLeft: '1rem', 
              }}
            />
          </button>
        </div>
      </div>
    </div>
  );
};
