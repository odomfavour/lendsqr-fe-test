import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
// import './index.css';
// import App from './App.tsx';
import './styles/main.scss';
import { RouterProvider } from 'react-router-dom';
import { router } from './routes/router.tsx';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
      <ToastContainer position="top-right" autoClose={3000} />
      {/* <App /> */}
    </QueryClientProvider>
  </StrictMode>
);
