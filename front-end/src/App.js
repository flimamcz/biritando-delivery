import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Customer from './Pages/Customer';
import Admin from './Pages/Admin';
import Checkout from './Pages/Checkout';
import Order from './Pages/Order';
import OrderDetail from './Pages/OrderDetail';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Customer } />
      <Route path="/admin/manage" component={ Admin } />
      <Route path="/customer/checkout" component={ Checkout } />
      <Route exact path="/customer/orders" component={ Order } />
      <Route exact path="/customer/orders/:id" component={ OrderDetail } />
      <Route exact path="/seller/orders" component={ Order } />
      <Route exact path="/seller/orders/:id" component={ OrderDetail } />
    </Switch>
  );
}

export default App;
