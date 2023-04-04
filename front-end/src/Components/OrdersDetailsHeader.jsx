import React from 'react';

function OrderDetailsHeader(type, orderData) {
  const { deliveryNumber, sellerName, saleDate, status } = orderData;

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
        <h2>{ `PEDIDO: ${addZerosOnRightSide(deliveryNumber)}` }</h2>
      </div>
      {
        type === 'customer'
        && (
          <div
            data-testid={
              `${type}_order_details__element-order-details-label-seller-name`
            }
          >
            <span>{ `P. Vend: ${sellerName}` }</span>
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

export default OrderDetailsHeader;
