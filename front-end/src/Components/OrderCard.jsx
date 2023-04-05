import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

function OrderCard({ prop, id, status, saleDate, totalPrice, deliveryAddress }) {
  const addZerosOnRightSide = (num) => {
    const Numberzeros = 4;
    const newNum = String(num).padStart(Numberzeros, '0');
    return newNum;
  };

  const convertDate = (data) => {
    const now = new Date(data);
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    return date;
  };

  const convertTotal = (total) => {
    const totalNumber = Number(total);
    return totalNumber.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  return (
    <li key={ id }>
      <Link to={ `/${prop}/orders/${id}` }>
        <p data-testid={ `${prop}_orders__element_order-id-${id}` }>
          {
            addZerosOnRightSide(id)
          }

        </p>
        <p data-testid={ `${prop}_orders__element-delivery-status-${id}` }>{status}</p>
        <p data-testid={ `${prop}_order__element-order-date-${id}` }>
          {
            convertDate(saleDate)
          }

        </p>
        <p data-testid={ `${prop}_order__element-card-price-${id}` }>
          {
            convertTotal(totalPrice)
          }

        </p>
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
