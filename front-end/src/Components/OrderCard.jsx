import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { addZerosOnRightSide, convertDate, convertTotal } from '../utils/formatValues';

function OrderCard({ prop, id, status, saleDate, totalPrice, deliveryAddress }) {
  return (
    <li key={ id } className="card-order">
      <Link to={ `/${prop}/orders/${id}` }>
        <h2
          data-testid={ `${prop}_orders__element-order-id-${id}` }
          className="number-order"
        >
          {
            `PEDIDO: ${addZerosOnRightSide(id)}`
          }
        </h2>
        <h3
          data-testid={ `${prop}_orders__element-delivery-status-${id}` }
          className="status-order"
        >
          {status}

        </h3>
        <h3
          data-testid={ `${prop}_orders__element-order-date-${id}` }
          className="date-order"
        >
          {
            `DATA: ${convertDate(saleDate)}`
          }

        </h3>
        <h2
          data-testid={ `${prop}_orders__element-card-price-${id}` }
          className="price-order"
        >
          {
            `TOTAL: ${convertTotal(totalPrice)}`
          }
        </h2>
        {
          prop === 'customer' && (
            <h2
              data-testid={ `${prop}_orders__element-card-address-${id}` }
              className="address-order"
            >
              {`ENDEREÇO: ${deliveryAddress}`}
            </h2>
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
