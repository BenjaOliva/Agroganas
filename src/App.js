import React, { useEffect } from 'react';
import { createBrowserRouter, Navigate, RouterProvider } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { getProducts } from './services/firebase';
import '@fontsource/nunito';
import { AuthProvider } from './contexts/AuthContext.js';
import { routes } from './config/routes';

const router = createBrowserRouter([
  ...routes,
  {
    // Fallback route - No Match redirect to landing ( " / " )
    path: '*',
    element: <Navigate to={'/'} />,
  },
]);

const App = () => {
  const dispatch = useDispatch();
  const isDev = true;
  useEffect(() => {
    const getData = async () => {
      const data = await getProducts();
      console.log('test');
      return data;
    };
    if (!isDev) {
      getData()
        .then((res) => dispatch({ type: 'END_LOADING', data: res }))
        .then((res) => console.log(res));
    }
  }, []);

  return (
    <AuthProvider>
      <div style={{ WebkitTapHighlightColor: 'transparent' }}>
        <RouterProvider router={router} />
      </div>
    </AuthProvider>
  );
};

export default App;
