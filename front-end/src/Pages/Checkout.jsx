import React from 'react';
import { navBarCustomer } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';
import CheckoutTable from '../Components/CheckoutTable';
import CheckoutForm from '../Components/CheckoutForm';

function Checkout() {
  return (
    <div>
      <Navbar type={ navBarCustomer } />
      <CheckoutTable />
      <CheckoutForm />
    </div>
  );
}

export default Checkout;
