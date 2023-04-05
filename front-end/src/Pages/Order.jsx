import React, { useEffect, useState } from 'react';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';
import { navBarCustomer, navBarSeller } from '../utils/navBarinfo';
import { requestGet } from '../services/request';

function Order() {
  const { role, email } = JSON.parse(localStorage.getItem('user'));
  const typeNav = role === 'seller' ? navBarSeller : navBarCustomer;
  const [ordersLists, setOrdersLists] = useState([]);

  const getOrders = async () => {
    try {
      const body = { email };
      const orders = await requestGet(`/${role}/orders`, body);
      setOrdersLists(orders);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

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
