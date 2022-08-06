import React, { createContext, useContext } from 'react';
import axios from 'axios';
// import createAuthRefreshInterceptor from "axios-auth-refresh";
import { AuthContext } from './AuthContext';

const FetchContext = createContext();
const { Provider } = FetchContext;

const FetchProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: process.env.REACT_APP_API_URL
  });

  authAxios.interceptors.request.use(
    (config) => {
      // eslint-disable-next-line no-param-reassign
      config.headers.Authorization = `Bearer ${authContext.getAccessToken()}`;
      return config;
    },
    (error) => Promise.reject(error)
  );

  //   createAuthRefreshInterceptor(authAxios, authContext.getNewTokenForRequest, {
  //     skipWhileRefreshing: false,
  //   });

  return (
    <Provider
      value={{
        authAxios
      }}
    >
      {children}
    </Provider>
  );
};

export { FetchContext, FetchProvider };
