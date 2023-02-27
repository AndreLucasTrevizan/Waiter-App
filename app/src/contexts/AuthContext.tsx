import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { api } from '../services/api';
import AsyncStorage from '@react-native-async-storage/async-storage';

interface SignInFormData {
  email: string,
  password: string,
}

interface AuthContextData {
  user: IUser | null,
  isAuthenticated: boolean,
  loading: boolean,
  signIn: (credentials: SignInFormData) => Promise<void>,
}

interface AuthProviderProps {
  children: ReactNode
};

export interface IUser {
  _id: string,
  name: string,
  email: string,
  token: string,
}

export const AuthContext = createContext({} as AuthContextData);

export default function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] =  useState<IUser | null>(null);
  const [loading, setLoading] = useState(false);

  const isAuthenticated = !!user;

  useEffect(() => {
    async function getUser() {
      setLoading(true);

      const storage = await AsyncStorage.getItem('@app.auth.token');

      const token: string = JSON.parse(storage || '');

      if (token) {
        try {
          const response = await api.get('/users/me', { headers: {
            Authorization: `Bearer ${token}`,
          } });

          api.defaults.headers.common['Authorization'] = `Bearer ${token}`;

          setUser({
            _id: response.data?._id,
            name: response.data?.name,
            email: response.data?.email,
            token
          });

          setLoading(false);
        } catch (error) {
          setLoading(false);
          setUser(null);
        }
      } else {
        setLoading(false);
        setUser(null);
      }
    }

    getUser();

  }, []);
  
  const signIn = async (data: SignInFormData) => {
    setLoading(true);

    try {
      const response = await api.post('/login', data);

      await AsyncStorage.setItem('@app.auth.token', JSON.stringify(response.data.token));

      api.defaults.headers.common['Authorization'] = `Bearer ${response.data.token}`;

      let user_data = {
        _id: response.data?._id,
        name: response.data?.name,
        email: response.data?.email,
        token: response.data?.token
      };

      setUser(user_data);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      toast.error('Erro ao fazer login');
    }
  };
  
  return (
    <AuthContext.Provider value={{
      user,
      isAuthenticated,
      loading,
      signIn
    }}>
      { children }
    </AuthContext.Provider>
  );
}
