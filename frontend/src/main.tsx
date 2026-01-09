import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { createBrowserRouter, RouterProvider } from 'react-router';
import './index.css';
import AppLayout from './layouts/app-layout.tsx';
import AuthLayout from './layouts/auth-layout.tsx';
import Auth from './pages/auth.tsx';
import { store } from './store/index.ts';
import Diaries from './pages/diary.tsx';
import Home from './pages/home.tsx';
import Add from './pages/add.tsx';
import Profile from './pages/profile.tsx';
import DiaryUpdate from './pages/diary-update.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    Component: AppLayout,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'diaries',
        element: <Diaries />,
      },
      {
        path: 'auth',
        element: <Auth />,
      },
      {
        Component: AuthLayout,
        children: [
          {
            path: 'add',
            element: <Add />,
          },
          {
            path: 'profile',
            element: <Profile />,
          },
          {
            path: 'post/:id',
            element: <DiaryUpdate />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </StrictMode>
);
