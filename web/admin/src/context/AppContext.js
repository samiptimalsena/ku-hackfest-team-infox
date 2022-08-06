import React, { createContext, useState } from 'react';

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState('');
  const [message, setMessage] = useState('');
  const [walletKey, setWalletKey] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [loggedInWithGoogle, setLoggedInWithGoogle] = useState(false);
  const handleAlert = (
    obj = {
      type: 'error',
      message: 'Something went wrong!'
    }
  ) => {
    setShowAlert(true);
    setSeverity(obj.type);
    setMessage(obj.message);
  };

  const isAuthenticated = () => {
    if (name && email && loggedInWithGoogle) return true;
    if (walletKey) return true;
    return false;
  };

  return (
    <Provider
      value={{
        handleAlert,
        showAlert,
        setShowAlert,
        severity,
        message,
        walletKey,
        setWalletKey,
        name,
        setName,
        email,
        setEmail,
        loggedInWithGoogle,
        setLoggedInWithGoogle,
        isAuthenticated
      }}
    >
      {children}
    </Provider>
  );
};

export { AppContext, AppProvider };
