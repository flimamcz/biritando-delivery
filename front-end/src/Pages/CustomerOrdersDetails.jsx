import React from 'react';
import { navBarCustomer } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';
import OrderDetailsHeader from '../Components/OrdersDetailsHeader';
import OrderDetailsTable from '../Components/OrdersDetailsTable';

function CustomerOrdersDetails() {
  return (
    <div>
      <Navbar type={ navBarCustomer } />
      <OrderDetailsHeader type="customer" />
      <OrderDetailsTable />
    </div>
  );
}

export default CustomerOrdersDetails;
