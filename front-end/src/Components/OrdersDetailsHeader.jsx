import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { requestGet } from '../services/request';

function OrderDetailsHeader(props) {
  const { type } = props;
  const [orderList, setOrder] = useState({
    deliveryNumber: '',
    saleDate: '',
    status: '',
    seller: '',
  });
  const { id } = useParams();

  const getOrder = async () => {
    try {
      const order = await requestGet(`/${type}/orders/${id}`);
      setOrder(order);
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getOrder();
  }, []);

  const { saleDate, status, seller } = orderList;

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

  return (
    <div>
      <div
        data-testid={ `${type}_order_details__element-order-details-label-order-id` }
      >
        <h2>{ `PEDIDO: ${addZerosOnRightSide(orderList.id)}` }</h2>
      </div>
      {
        type === 'customer'
        && (
          <div
            data-testid={
              `${type}_order_details__element-order-details-label-seller-name`
            }
          >
            <span>{ `P. Vend: ${seller.name}` }</span>
          </div>
        )
      }
      <div
        data-testid={ `${type}_order_details__element-order-details-label-order-date` }
      >
        <h2>
          { `${convertDate(saleDate)}` }
        </h2>
      </div>
      <div
        data-testid={ `
        ${type}_order_details__element-order-details-label-delivery-status` }
      >
        <h2>{ status }</h2>
      </div>
      <div
        data-testid={ `${type}_order_details__button-delivery-check` }
      >
        <button type="button" onClick={ console.log('ok') }>MARCAR COMO ENTREGUE</button>
      </div>
    </div>
  );
}

OrderDetailsHeader.propTypes = {
  type: PropTypes.string.isRequired,
};

export default OrderDetailsHeader;
