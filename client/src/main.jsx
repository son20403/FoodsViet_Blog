import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppRoutes from './routes/index.jsx'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
    <ToastContainer autoClose={1000} style={{ zIndex: '9999999' }}></ToastContainer>
  </>
)

