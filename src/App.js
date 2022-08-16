import React, { useEffect } from 'react';
import { Route, Switch, Redirect, BrowserRouter } from 'react-router-dom';
import AuthLayout from './layouts/Auth.js';
import AdminLayout from './layouts/Admin.js';
import Ecommerce from './layouts/Ecommerce';
import { useDispatch } from 'react-redux';
import { getProducts } from './services/firebase';
import '@fontsource/nunito';
import { AuthProvider } from './contexts/AuthContext.js';
import PrivateRoute from './components/PrivateRoute.js';

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
    <BrowserRouter>
      <AuthProvider>
        <Switch>
          <Route path={`/auth`} component={AuthLayout} />
          <PrivateRoute path={`/admin`} component={AdminLayout} />
          <Route path={`/`} component={Ecommerce} />
          <Redirect from="*" to={'/'} />
        </Switch>
      </AuthProvider>
    </BrowserRouter>
  );
};

export default App;
