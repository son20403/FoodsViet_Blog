import React, { Suspense } from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import 'react-loading-skeleton/dist/skeleton.css'
import { Provider } from 'react-redux'
import store from './sagas/configureStore'
import { ThemeProvider } from '@material-tailwind/react'
import App from './App'
import ScrollToTop from './layout/common/ScrollToTop'
import LoadingPage from './layout/loading/LoadingPage'
ReactDOM.createRoot(document.getElementById('root')).render(
  <>
    <BrowserRouter>
      <ScrollToTop />
      <Provider store={store}>
        <ThemeProvider>
          <Suspense fallback={<LoadingPage></LoadingPage>}>
            <App />
          </Suspense>
        </ThemeProvider>
      </Provider>
    </BrowserRouter>
    <ToastContainer autoClose={1000} style={{ zIndex: '9999999' }}></ToastContainer>
  </>
)

