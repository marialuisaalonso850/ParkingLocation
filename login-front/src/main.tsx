import React, { useContext } from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import Login from './routes/Login.tsx'
import Signup from './routes/signup.tsx'
import Dashboard from './routes/dashboard.tsx'
import ProtectedRoute from './routes/protectedRaute.tsx'
import { AuthProvider } from './Autenticacion/AutProvider.tsx'
import Home from './routes/Home.tsx'
Home


const router = createBrowserRouter([
  {
    path: "/",
    element: <Login/>
  },
  {
    path: "/signup",
    element: <Signup/>
  },
  {
    path: "/Home",
    element: <Home/>
  },
  {
    path: "/",
    element: <ProtectedRoute/>,
    children:[
      {
        path: "/",
        element: <Home/>
      },
      {
        path: "/dashboard",
        element: <Dashboard/>
      }
    ]
  },
])
ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router}/>
    </AuthProvider>
  </React.StrictMode>,
)


