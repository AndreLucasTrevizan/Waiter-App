import styles from '../../styles/home.module.scss';

import Head from "next/head";
import { GetServerSideProps } from 'next';
import { canSSRGuest } from '../utils/canSSRGuests';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import { useForm } from 'react-hook-form';
import { AuthContext, SignInFormData } from '../contexts/AuthContext';
import { useContext } from 'react';

export default function Home() {
  const { signIn } = useContext(AuthContext);

  const schema = yup.object().shape({
    email: yup.string().required('Email é obrigatório').email('Insira um email válido'),
    password: yup.string().required('Senha é obrigatória').min(8, 'Senha muito curta')
  });

  const {
    register,
    reset,
    formState: { errors },
    handleSubmit
  } = useForm<SignInFormData>({
    resolver: yupResolver(schema),
  });

  return (
    <>
      <Head>
        <title>Faça seu login - Waiter</title>
      </Head>

      <div className={styles.containerCenter}>
        <div className={styles.login}>
          <h1>Waiter</h1>
          <form onSubmit={handleSubmit(signIn)}>
            <input
              placeholder='Digite seu email'
              type='email'
              className={errors.email ? styles.invalidInput : styles.input}
              {...register('email')}
            />
            {errors.email && <small>{errors.email.message}</small>}
            <input
              placeholder='Digite sua senha'
              type='password'
              className={errors.password ? styles.invalidInput : styles.input}
              {...register('password')}
            />
            {errors.password && <small>{errors.password.message}</small>}
            <div>
              <button>Acessar</button>
            </div>
          </form>
        </div>
      </div>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
});
