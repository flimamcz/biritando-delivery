import React from 'react';
import MyContext from '../context/MyContext';

function OrderDetailsTable(type) {
  const { orderList, getOrdersList } = useContext(MyContext);

  const roundValue = (value) => {
    const newValue = Math.round((value) * 100) / 100;
    return newValue.toFixed(2);
  };

  const convertValue = (value) => {
    const stringValue = `R$ ${value}`;
    const brlValue = stringValue.replace('.', ',');
    return brlValue;
  };

  useEffect(() => {
    getOrdersList(id, type);
  }, [getOrdersList, type]);

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
          { orderList.map((e, index) => (
            <tr key={ index }>
              <td
                data-testid={
                  `${type}_order_details__element-order-table-item-number-${index}`
                }
              >
                {index + 1}

              </td>
              <td
                data-testid={
                  `${type}_order_details__element-order-table-name-${index}`
                }
              >
                {e.name}

              </td>
              <td
                data-testid={
                  `${type}_order_details__element-order-table-quantity-${index}`
                }
              >
                {e.quantity}

              </td>
              <td
                data-testid={
                  `${type}_order_details__element-order-table-unit-price-${index}`
                }
              >
                { convertValueToBrlShape(roundValue(e.price)) }
              </td>
              <td
                data-testid={
                  `${type}_order_details__element-order-table-sub-total-${index}`
                }
              >
                { convertValue(roundValue(e.price * e.quantity)) }
              </td>
            </tr>
          )) }
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetailsTable;
