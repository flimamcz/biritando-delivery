import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Customer from './Pages/Customer';
import Admin from './Pages/Admin';
import CustomerOrdersDetails from './Pages/CustomerOrdersDetails';
import SellerOrdersDetails from './Pages/SellerOrdersDetails';

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
      <Route path="/customer/orders/:id" component={ CustomerOrdersDetails } />
      <Route path="/seller/orders/:id" component={ SellerOrdersDetails } />
    </Switch>
  );
}

export default App;
