import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addZerosOnRightSide, convertDate, convertTotal } from '../utils/formatValues';

function OrderCard({ prop, id, status, saleDate, totalPrice, deliveryAddress }) {
  return (
    <li key={ id }>
      <Link to={ `/${prop}/orders/${id}` }>
        <p data-testid={ `${prop}_orders__element-order-id-${id}` }>
          {
            addZerosOnRightSide(id)
          }

        </p>
        <p data-testid={ `${prop}_orders__element-delivery-status-${id}` }>{status}</p>
        <p data-testid={ `${prop}_orders__element-order-date-${id}` }>
          {
            convertDate(saleDate)
          }

        </p>
        <p data-testid={ `${prop}_orders__element-card-price-${id}` }>
          {
            convertTotal(totalPrice)
          }
        </p>
        {
          prop === 'customer' && (
            <p data-testid={ `${prop}_orders__element-card-address-${id}` }>
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
