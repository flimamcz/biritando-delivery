import React from 'react';

function OrderCard() {
  const { getOrders } = useContext(MyContext);
  const orderList = getOrders();
  const orders = orderList.map((item, index) => {
    const { id, status, saleDate, totalPrice, deliveryAddress } = item;
    return (
      <li key={ index }>
        <p data-testid={ `seller_orders__element_order-id-${id}` }>{id}</p>
        <p data-testid={ `seller_orders__element-delivery-status-${id}` }>{status}</p>
        <p data-testid={ `seller_order__element-order-date-${id}` }>{saleDate}</p>
        <p data-testid={ `seller_order__element-card-price-${id}` }>{totalPrice}</p>
        <p data-testid={ `seller_order__element-card-address-${id}` }>
          {deliveryAddress}
        </p>
      </li>
    );
  });
  return (<ul>{orders}</ul>);
}

export default OrderCard;
