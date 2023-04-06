import React, { useCallback, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useParams } from 'react-router-dom';
import { requestGet } from '../services/request';

function OrderDetailsTable(props) {
  const { type } = props;
  const { id } = useParams();

  const [productsList, setProductsList] = useState([]);
  const [total, setTotal] = useState([]);

  const convertTotal = (num) => {
    const totalNumber = Number(num);
    return totalNumber.toLocaleString('pt-BR', { minimumFractionDigits: 2 });
  };

  const getOrder = useCallback(async () => {
    try {
      const { products, totalPrice } = await requestGet(`/sales/${id}`);
      setProductsList(products);
      setTotal(totalPrice);
    } catch (error) {
      console.log(error.message);
    }
  }, [id]);

  useEffect(() => {
    getOrder();
  }, [getOrder]);

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
          </tr>
        </thead>
        <tbody>
          {
            productsList.map((e, i) => (
              <tr key={ i }>
                <td
                  data-testid={
                    `${type}_order_details__element-order-table-item-number-${i}`
                  }
                >
                  {i + 1}
                </td>
                <td
                  data-testid={
                    `${type}_order_details__element-order-table-name-${i}`
                  }
                >
                  {e.name}
                </td>
                <td
                  data-testid={
                    `${type}_order_details__element-order-table-quantity-${i}`
                  }
                >
                  {e.SalesProducts.quantity}
                </td>
                <td
                  data-testid={
                    `${type}_order_details__element-order-table-unit-price-${i}`
                  }
                >
                  {convertTotal(e.price)}

                </td>
                <td
                  data-testid={
                    `${type}_order_details__element-order-table-sub-total-${i}`
                  }
                >
                  {convertTotal((e.price * e.SalesProducts.quantity))}

                </td>
              </tr>
            ))
          }
        </tbody>
      </table>
      <h2
        data-testid={
          `${type}_order_details__element-order-total-price`
        }
      >
        {convertTotal(total)}
      </h2>
    </div>
  );
}

OrderDetailsTable.propTypes = {
  type: PropTypes.string.isRequired,
};

export default OrderDetailsTable;
