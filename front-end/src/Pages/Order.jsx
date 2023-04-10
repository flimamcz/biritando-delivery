import React, { useEffect, useContext } from 'react';
import NavBar from '../Components/NavBar';
import OrderCard from '../Components/OrderCard';
import { navBarCustomer, navBarSeller } from '../utils/navBarinfo';
import MyContext from '../context/MyContext';

function Order() {
  const { role } = JSON.parse(localStorage.getItem('user'));
  const { userId } = JSON.parse(localStorage.getItem('userId'));
  const typeNav = role === 'seller' ? navBarSeller : navBarCustomer;
  const { getOrders, ordersLists } = useContext(MyContext);

  useEffect(() => {
    getOrders(role, userId);
  }, [getOrders, role, userId]);

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
