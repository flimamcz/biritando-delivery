import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment/moment';
import { useParams } from 'react-router-dom';
import { requestGet } from '../services/request';
import StatusButton from './StatusButton';

function OrderDetailsHeader(props) {
  const { type } = props;
  const [orderList, setOrder] = useState({
    deliveryNumber: '',
    saleDate: '',
    status: '',
    seller: '',
  });
  const { id } = useParams();

  const getOrder = useCallback(async () => {
    try {
      const order = await requestGet(`/${type}/orders/${id}`);
      setOrder(order);
    } catch (error) {
      console.log(error.message);
    }
  }, [id, type]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  const { saleDate, status, seller } = orderList;

  const addZerosOnRightSide = (num) => {
    const Numberzeros = 4;
    const newNum = String(num).padStart(Numberzeros, '0');
    return newNum;
  };

  const convertDate = (data) => moment(data).format('DD/MM/YYYY');

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
      <div>
        <h2
          data-testid={
            `${type}_order_details__element-order-details-label-delivery-status`
          }
        >
          { status }
        </h2>
      </div>
      <div
        data-testid={ `${type}_order_details__button-delivery-check` }
      >
        <StatusButton getOrder={ getOrder } currentStatus={ status } />
      </div>
    </div>
  );
}

OrderDetailsHeader.propTypes = {
  type: PropTypes.string.isRequired,
};

export default OrderDetailsHeader;
