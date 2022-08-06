import { Navigate, useRoutes } from "react-router-dom";
// layouts
import { useContext } from "react";
import DashboardLayout from "./layouts/dashboard";
import LogoOnlyLayout from "./layouts/LogoOnlyLayout";

import Login from "./pages/Login";
import NotFound from "./pages/Page404";
import Explore from "./pages/Explore";
import MyNfts from "./pages/MyNfts";
import { AppContext } from "./context/AppContext";

// ----------------------------------------------------------------------

const PrivateRoute = ({ children }) => {
  const app = useContext(AppContext);
  return app.walletKey ? children : <Navigate to="/login" />;
};

export default function Router() {
  return useRoutes([
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      children: [
        {
          element: <Navigate to="/dashboard/nfts" replace />,
        },
        {
          path: "nfts",
          element: (
            <PrivateRoute>
              <MyNfts />
            </PrivateRoute>
          ),
        },
      ],
    },
    {
      path: "/",
      element: <LogoOnlyLayout />,
      children: [
        { path: "explore", element: <Explore /> },
        { path: "login", element: <Login /> },
        // { path: 'register', element: <Register /> },
        { path: "404", element: <NotFound /> },
        { path: "/", element: <Navigate to="/dashboard" /> },
        { path: "*", element: <Navigate to="/404" /> },
      ],
    },
    { path: "*", element: <Navigate to="/404" replace /> },
  ]);
}
