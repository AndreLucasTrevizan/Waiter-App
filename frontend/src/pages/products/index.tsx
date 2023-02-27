import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/ui/Header';
import { setupApiClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';
import { CategoriesListData } from '../categories';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import styles from './style.module.scss';
import { toast } from 'react-toastify';
import { api } from '../../services/apiClient';

interface ProductsProps {
  categoriesList: CategoriesListData[],
}

interface ProductsFormData {
  name: string,
  description?: string,
  category_id: string,
};

export default function Products({
  categoriesList
}: ProductsProps) {
  const [categories, setCategories] = useState(categoriesList || []);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required('O nome é obrigatório').min(3, 'Nome muito curto'),
    description: yup.string(),
    category_id: yup.string().required('Categoria é obrigatória')
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<ProductsFormData>({
    resolver: yupResolver(schema),
  });

  const handleCreateProduct = async (data: ProductsFormData) => {
    setLoading(true);

    try {
      await api.post('/products', data);

      reset();
      toast.success('Produto cadastrado com sucesso');
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(`Erro ao cadastrar produto: ${error}`);
      toast.error('Erro ao cadastrar produto');
    }
  };

  return (
    <>
      <Head>
        <title>Produtos - Waiter</title>
      </Head>

      <div>
        <Header />
        <div className={styles.centeredContainer}>
          <h1>Produtos</h1>

          <form className={styles.formLogin} onSubmit={handleSubmit(handleCreateProduct)}>
            <input
              type='text'
              placeholder='Digite o nome do produto'
              className={errors.name ? styles.invalidInput : styles.input}
              {...register('name')}
            />
            {errors.name && <small>{errors.name.message}</small>}
            <textarea
              className={errors.description ? styles.invalidTextarea : styles.textarea}
              placeholder='Digite a descrição'
              {...register('description')}
            />
            {errors.description && <small>{errors.description.message}</small>}
            {categories.length > 0 ? (
              <>
                <select
                  className={errors.category_id ? styles.invalidInput : styles.input}
                  {...register('category_id')}
                >
                  <option value='' defaultChecked>Selecione a categoria...</option>
                  {categories.map(category => (
                    <option value={category._id} key={category._id}>{category.name}</option>
                  ))}
                </select>
                {errors.category_id && <small>{errors.category_id.message}</small>}
              </>
            ) : ''}
            <div>
              <button>Cadastrar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = canSSRAuth(async (ctx) => {

  const api = setupApiClient(ctx);

  const response = await api.get('/categories');

  return {
    props: {
      categoriesList: response.data
    }
  }
});
