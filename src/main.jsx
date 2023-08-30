import './css/index.css'
import React from 'react'
import ReactDOM from 'react-dom/client'
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import { HelmetProvider } from 'react-helmet-async';
import NotFound from './pages/Error.jsx'
import Layout from './components/Layout.jsx';
import Home from './pages/Home.jsx'
import Profile from './pages/Profile.jsx';
import SignUp from './pages/SignUp.jsx';
import SignIn from './pages/SignIn.jsx';
import ReduxProvider from './redux/provider';

// aca se manejan la rutas, quedaria moverlo a un archivo aparte.

// helmet se utiliza para cambiar el titulo de cada pagina
// pero para eso necesito envolver la app con su provider

const router = createBrowserRouter([
  {
    element: <Layout/>,
    children: [
      {
        path: "/",
        element: <Home/>,
      },
      {
        path: "/ingresar",
        element: <SignIn/>,
      },
      {
        path: "/unirme",
        element: <SignUp/>,
      },
      {
        path: "/:perfil",
        element: <Profile/>,
      },
      {
        path: "*",
        element: <NotFound />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ReduxProvider>
      <HelmetProvider>
      <RouterProvider router={router}/>
      </HelmetProvider>
      </ReduxProvider>
  </React.StrictMode>
)
