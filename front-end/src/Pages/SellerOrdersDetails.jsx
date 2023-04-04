import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { navBarSeller } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';
import OrderDetailsHeader from '../Components/OrdersDetailsHeader';
import OrderDetailsTable from '../Components/OrdersDetailsTable';
import MyContext from '../context/MyContext';

function SellerOrdersDetails() {
  const { isLogged } = useContext(MyContext);
  if (!isLogged) {
    return <Redirect to="/login" />;
  }
  return (
    <div>
      <Navbar type={ navBarSeller } />
      <OrderDetailsHeader type="seller" />
      <OrderDetailsTable type="seller" />
    </div>
  );
}

export default SellerOrdersDetails;
