import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Customer from './Pages/Customer';
import Admin from './Pages/Admin';
import Seller from './Pages/SellerOrder';
import Order from './Pages/CustomerOrder';

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
      <Route path="/seller/orders" component={ Seller } />
      <Route path="/customer/orders" component={ Order } />
    </Switch>
  );
}

export default App;
