import React from 'react';
import PropTypes from 'prop-types';

function OrderCard({ prop, id, status, saleDate, totalPrice, deliveryAddress }) {
  return (
    <li key={ index }>
      <p data-testid={ `${prop}_orders__element_order-id-${id}` }>{id}</p>
      <p data-testid={ `${prop}_orders__element-delivery-status-${id}` }>{status}</p>
      <p data-testid={ `${prop}_order__element-order-date-${id}` }>{saleDate}</p>
      <p data-testid={ `${prop}_order__element-card-price-${id}` }>{totalPrice}</p>
      <p data-testid={ `${prop}_order__element-card-address-${id}` }>
        {deliveryAddress}
      </p>
    </li>
  );
}

export default OrderCard;

OrderCard.propTypes = {
  prop: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.instanceOf(Date).isRequired,
  totalPrice: PropTypes.number.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
};
