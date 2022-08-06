// routes
import { Alert, Snackbar } from '@mui/material';
import { useContext } from 'react';
import Router from './routes';
// theme
import ThemeConfig from './theme';
import GlobalStyles from './theme/globalStyles';
// components
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider } from './context/AuthContext';
import { FetchProvider } from './context/FetchContext';
import { AppContext } from './context/AppContext';

// ----------------------------------------------------------------------

export default function App() {
  const appContext = useContext(AppContext);
  return (
    <ThemeConfig>
      <ScrollToTop />
      <GlobalStyles />
      <Snackbar
        open={appContext.showAlert}
        autoHideDuration={6000}
        onClose={() => appContext.setShowAlert(false)}
      >
        <Alert
          onClose={() => appContext.setShowAlert(false)}
          severity={appContext.severity}
          sx={{ width: '100%' }}
        >
          {appContext.message}
        </Alert>
      </Snackbar>
      <AuthProvider>
        <FetchProvider>
          <Router />
        </FetchProvider>
      </AuthProvider>
    </ThemeConfig>
  );
}
