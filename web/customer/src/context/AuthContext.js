import React, { createContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import publicFetch from '../utils/fetch';

const AuthContext = createContext();
const { Provider } = AuthContext;

const AuthProvider = ({ children }) => {
  const history = useNavigate();

  const token = localStorage.getItem('token');
  const userInfo = localStorage.getItem('userInfo');
  const expiresAt = localStorage.getItem('expiresAt');

  const [authState, setAuthState] = useState({
    token,
    expiresAt,
    userInfo: userInfo ? JSON.parse(userInfo) : {}
  });

  // eslint-disable-next-line no-shadow
  const setAuthInfo = ({ token, userInfo, expiresAt }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('userInfo', JSON.stringify(userInfo));
    localStorage.setItem('expiresAt', expiresAt);

    setAuthState({
      token,
      userInfo,
      expiresAt
    });
  };

  const logout = async () => {
    try {
      localStorage.removeItem('token');
      localStorage.removeItem('userInfo');
      localStorage.removeItem('expiresAt');
      setAuthState({});
      history.push('/login');
    } catch (err) {
      // eslint-disable-next-line no-console
      throw console.error(err);
    }
  };

  const isAuthenticated = () => {
    if (!authState.expiresAt) {
      return false;
    }
    return new Date() < new Date(authState.expiresAt * 1000);
  };

  const isAdmin = () => authState.userInfo.role === 'admin';

  const getAccessToken = () => localStorage.getItem('token');

  const getNewToken = async () => {
    try {
      const { data } = await publicFetch.get('/token/refresh');
      setAuthState({ ...authState, token: data.token });
      // eslint-disable-next-line no-empty
    } catch (err) {}
  };

  //   const getNewTokenForRequest = async (failedRequest) => {
  //     const { data } = await publicFetch.get("/token/refresh");

  //     failedRequest.response.config.headers.Authorization = `Bearer ${data.token}`;

  //     localStorage.setItem("token", data.token);

  //     return Promise.resolve();
  //   };

  return (
    <Provider
      value={{
        authState,
        setAuthState: (authInfo) => setAuthInfo(authInfo),
        logout,
        isAuthenticated,
        isAdmin,
        getNewToken,
        getAccessToken
        // getNewTokenForRequest,
      }}
    >
      {children}
    </Provider>
  );
};

export { AuthContext, AuthProvider };
