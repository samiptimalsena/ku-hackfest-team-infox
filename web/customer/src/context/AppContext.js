import React, { createContext, useState } from "react";

const AppContext = createContext();
const { Provider } = AppContext;

const AppProvider = ({ children }) => {
  const [showAlert, setShowAlert] = useState(false);
  const [severity, setSeverity] = useState("");
  const [message, setMessage] = useState("");
  const [walletKey, setWalletKey] = useState(
    localStorage.getItem("walletKey") || ""
  );
  const handleAlert = (
    obj = {
      type: "error",
      message: "Something went wrong!",
    }
  ) => {
    setShowAlert(true);
    setSeverity(obj.type);
    setMessage(obj.message);
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
      }}
    >
      {children}
    </Provider>
  );
};

export { AppContext, AppProvider };
