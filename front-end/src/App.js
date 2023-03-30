import React from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import './App.css';
import Login from './Pages/Login';
import Register from './Pages/Register';
import Customer from './Pages/Customer';

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Redirect to="/login" />
      </Route>
      <Route path="/login" component={ Login } />
      <Route path="/register" component={ Register } />
      <Route path="/customer/products" component={ Customer } />
    </Switch>
  );
}

export default App;
