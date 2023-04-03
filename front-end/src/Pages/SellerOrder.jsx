import React, { useContext } from 'react';
import MyContext from '../context/MyContext';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';

function Seller() {
  const { getOrders } = useContext(MyContext);
  const orderList = getOrders();
  const orders = orderList.map((item, index) => {
    const { id, status, saleDate, totalPrice, deliveryAddress } = item;
    return (
      <OrderCard
        key={ index }
        prop="seller"
        id={ id }
        status={ status }
        saleDate={ saleDate }
        totalPrice={ totalPrice }
        deliveryAddress={ deliveryAddress }
      />
    );
  });
  return (
    <div>
      <NavBar />
      <ul>{orders}</ul>
    </div>
  );
}

export default Seller;
