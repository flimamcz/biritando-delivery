import React from 'react';
import { navBarSeller } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';
import OrderDetailsHeader from '../Components/OrdersDetailsHeader';
import OrderDetailsTable from '../Components/OrdersDetailsTable';

function SellerOrdersDetails() {
  return (
    <div>
      <Navbar type={ navBarSeller } />
      <OrderDetailsHeader type="seller" />
      <OrderDetailsTable />
    </div>
  );
}

export default SellerOrdersDetails;
