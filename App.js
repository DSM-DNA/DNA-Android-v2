/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import AsyncStorage from '@react-native-community/async-storage';
import React from 'react';
import { useEffect, useState } from 'react';
import { AuthProvider } from './AuthContext';
import NavController from './components/NavController';

export default () => {
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const preLoad = async () => {
    const isLoggedIn = await AsyncStorage.getItem("isLoggedIn")
    (!isLoggedIn || isLoggedIn === "false") ? setIsLoggedIn(false) : setIsLoggedIn(true);
  };

  useEffect(() => {
    preLoad();
  }, []);

  return (
    <AuthProvider isLoggedIn={isLoggedIn}>
      <NavController />
    </AuthProvider>
  )
};
