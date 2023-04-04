import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';
import { navBarCustomer } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';
import OrderDetailsHeader from '../Components/OrdersDetailsHeader';
import OrderDetailsTable from '../Components/OrdersDetailsTable';
import MyContext from '../context/MyContext';

function CustomerOrdersDetails() {
  const { isLogged } = useContext(MyContext);
  if (!isLogged) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar type={ navBarCustomer } />
      <OrderDetailsHeader type="customer" />
      <OrderDetailsTable type="customer" />
    </div>
  );
}

export default CustomerOrdersDetails;
