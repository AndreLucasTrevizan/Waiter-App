import { createContext, useEffect, useState } from 'react';

import { destroyCookie } from 'nookies';
import Router from 'next/router';
import { api } from '../services/apiClient';

import { setCookie, parseCookies } from 'nookies';

import { toast } from 'react-toastify';

interface AuthContextData {
  user: UserProps,
  isAuthenticated: boolean;
  signIn: (data: SignInFormData) => Promise<void>;
  signOut: () => void;
  loading: boolean;
}

export interface SignInFormData {
  email: string;
  password: string;
}

export interface UserProps {
  _id: string;
  name: string;
  email: string;
  createdAt: Date;
  updatedAt: Date;
}

export const AuthContext = createContext({} as AuthContextData);

export const signOut = () => {
  try {
    destroyCookie(undefined, '@nextauth.token');
    Router.push('/');
  } catch (error) {
    console.log('Erro ao fazer sign out');
  }
};

export default function AuthProvider({ children }){
  const [user, setUser] = useState<UserProps>();
  const [loading, setLoading] = useState(false);
  const isAuthenticated = !!user;

  useEffect(() => {
    async function loadData() {
      try {        
        // tentar pegar algo no cookie
        const { '@nextauth.token': token } = parseCookies();

        if (token) {
          const response = await api.get('/users/me');

          setUser({ ...response.data });
        }
        
      } catch (error) {
        console.log(`Erro ao buscar informações do usuário`);
        toast.error('Ops, algo deu errado ao buscar informações do usuário');
        signOut();
      }
    }

    loadData();
  }, [ ]);

  const signIn = async (data: SignInFormData) => {
    setLoading(true);

    try {
      const response = await api.post('/login', data);

      setCookie(undefined, '@nextauth.token', response.data.token, {
        maxAge: 60 * 60 * 24 * 30, // Expira em 1 mês
        path: '/' //Quais caminhos terão acesso ao cookie (/ são todos)
      });

      setUser({
        _id: response.data._id,
        name: response.data.name,
        email: response.data.email,
        createdAt: response.data.createdAt,
        updatedAt: response.data.updatedAt
      });

      api.defaults.headers['Authroization'] = `Bearer ${response.data.token}`;

      toast.success(`Bem vindo ${response.data.name}`);
      setLoading(false);
      Router.push('/dashboard');
    } catch (error) {
      setLoading(false);
      console.log(`Erro ao logar: ${error}`);
      toast.error(`Erro ao fazer login`);
    }
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      signIn,
      signOut
    }}>
      { children }
    </AuthContext.Provider>
  );
}
