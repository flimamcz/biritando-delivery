import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { navBarCustomer } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';
import CheckoutComponent from '../Components/Checkout';
import MyContext from '../context/MyContext';

function Checkout() {
  const { isLogged } = useContext(MyContext);
  if (!isLogged) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Navbar type={ navBarCustomer } />
      <CheckoutComponent />
    </div>
  );
}

export default Checkout;
