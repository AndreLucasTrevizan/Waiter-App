import { GetServerSideProps } from 'next';
import Head from 'next/head';
import { useState } from 'react';
import Header from '../../components/ui/Header';
import { setupApiClient } from '../../services/api';
import { canSSRAuth } from '../../utils/canSSRAuth';
import styles from './style.module.scss';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm  } from 'react-hook-form';
import { toast } from 'react-toastify';
import { api } from '../../services/apiClient';

export interface CategoriesListData {
  _id: string;
  name: string;
}

interface CategoriesProps {
  categoriesList: CategoriesListData[];
}

interface CreateCategoryProps {
  name: string;
}

export default function Categories({
  categoriesList
}: CategoriesProps) {
  const [categories, setCategories] = useState(categoriesList || []);
  const [loading, setLoading] = useState(false);

  const schema = yup.object().shape({
    name: yup.string().required('Nome é obrigatório').min(5, 'Nome muito curto'),
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors }
  } = useForm<CreateCategoryProps>({
    resolver: yupResolver(schema)
  });

  const createCategory = async (data: CreateCategoryProps) => {
    setLoading(true);
    try {
      const response = await api.post('/categories', data);

      const new_category = {
        _id: response.data?._id,
        name: response.data?.name,
      };

      setCategories(old_categories => [...old_categories, new_category]);
      toast.success('Categoria cadastrada com sucesso');
      reset();
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(`Erro ao cadastrar categoria: ${error}`);
      toast.error(`Erro ao cadastrar categoria ${data.name}`);
    }
  };

  return (
    <>
      <Head>
        <title>Categorias - Waiter</title>
      </Head>

      <div>
        <Header />
        <div className={styles.centeredContainer}>
          <h1>Categorias</h1>

          <form className={styles.formLogin} onSubmit={handleSubmit(createCategory)}>
            <input
              type='text'
              placeholder='Digite o nome da categoria'
              className={errors.name ? styles.invalidInput : styles.input}
              {...register('name')}
            />
            {errors.name && <small>{errors.name.message}</small>}
            <div>
              <button>{loading ? 'Cadastrando' : 'Cadastrar'}</button>
            </div>
          </form>
          <div className={styles.categoriesList}>
            {categories.length > 0 && <h2>Categorias cadastradas</h2>}
            {categories.length > 0 ? (
              <ul>
                {categories.map(category => (
                  <li key={category._id}>{category.name}</li>
                ))}
              </ul>
            ) : (
              <h2 className={styles.emptyCategoriesTitle}>Nenhuma categoria cadastrada</h2>
            )}
          </div>
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
      categoriesList: response.data,
    }
  }
});
