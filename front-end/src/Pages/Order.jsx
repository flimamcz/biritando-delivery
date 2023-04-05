import React, { useEffect, useState, useCallback } from 'react';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';
import { navBarCustomer, navBarSeller } from '../utils/navBarinfo';
import { requestGet } from '../services/request';

function Order() {
  const { role } = JSON.parse(localStorage.getItem('user'));
  const { userId } = JSON.parse(localStorage.getItem('userId'));
  const typeNav = role === 'seller' ? navBarSeller : navBarCustomer;
  const [ordersLists, setOrdersLists] = useState([]);

  const getOrders = useCallback(async () => {
    try {
      const orders = await requestGet(`/${role}/orders/user/${userId}`);
      setOrdersLists(orders);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  useEffect(() => {
    getOrders();
  }, [getOrders]);

  return (
    <div>
      <NavBar type={ typeNav } />
      <ul>
        {ordersLists.length ? (
          ordersLists.map((item, index) => {
            const { id, status, saleDate, totalPrice, deliveryAddress } = item;
            return (
              <OrderCard
                key={ index }
                prop={ role }
                id={ id }
                status={ status }
                saleDate={ saleDate }
                totalPrice={ totalPrice }
                deliveryAddress={ deliveryAddress }
              />
            );
          })
        ) : (

          <p>Não tem pedidos</p>
        )}
      </ul>
    </div>
  );
}

export default Order;
