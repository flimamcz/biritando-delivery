import React from 'react';
import { navBarCustomer } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';
import CheckoutComponent from '../Components/Checkout';

function Checkout() {
  return (
    <div>
      <Navbar type={ navBarCustomer } />
      <CheckoutComponent />
    </div>
  );
}

export default Checkout;
