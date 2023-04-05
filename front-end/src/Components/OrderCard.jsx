import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrderCard({ prop, id, status, saleDate, totalPrice, deliveryAddress }) {
  return (
    <li key={ id }>
      <Link to={ `/${prop}/orders/${id}` }>
        <p data-testid={ `${prop}_orders__element_order-id-${id}` }>{id}</p>
        <p data-testid={ `${prop}_orders__element-delivery-status-${id}` }>{status}</p>
        <p data-testid={ `${prop}_order__element-order-date-${id}` }>{saleDate}</p>
        <p data-testid={ `${prop}_order__element-card-price-${id}` }>{totalPrice}</p>
        {
          prop === 'customer' && (
            <p data-testid={ `${prop}_order__element-card-address-${id}` }>
              {deliveryAddress}
            </p>
          )
        }
      </Link>
    </li>
  );
}

export default OrderCard;
OrderCard.propTypes = {
  prop: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  status: PropTypes.string.isRequired,
  saleDate: PropTypes.string.isRequired,
  totalPrice: PropTypes.string.isRequired,
  deliveryAddress: PropTypes.string.isRequired,
};
