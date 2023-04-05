import { useParams } from 'react-router-dom';
import React, { useContext, useEffect } from 'react';
import MyContext from '../context/MyContext';

function OrderDetailsTable(type) {
  const { orderList, getOrdersList } = useContext(MyContext);
  const { id } = useParams();

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
          {orderList ? (<p>funcionou</p>) : (<p>falhou</p>) }
        </tbody>
      </table>
    </div>
  );
}

export default OrderDetailsTable;
