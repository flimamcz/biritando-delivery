import React, { useContext, useEffect, useState } from 'react';
import { convertTotal } from '../utils/formatValues';
import MyContext from '../context/MyContext';

function Checkout() {
  const [priceTotal, setTotalPrice] = useState(0);
  const { setSaleInfo, cartItems, setCartItems } = useContext(MyContext);

  const localCartItems = JSON.parse(localStorage.getItem('cartItems'));

  const totalPrice = localCartItems.reduce((acc, curr) => (
    acc + curr.price * curr.quantity
  ), 0);

  useEffect(() => {
    setSaleInfo({
      sellerId: 2,
      totalPrice,
      deliveryAddress: '',
      deliveryNumber: '',
      saleDate: Date.now(),
      status: 'Pendente',
    });
  }, [totalPrice, setSaleInfo]);

  const titlesTable = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item',
  ];

  const reRender = (items) => {
    setCartItems(items);
  };

  const handleClick = (item) => {
    cartItems.splice(cartItems.indexOf(item), 1);
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
    reRender(localCartItems);
  };

  useEffect(() => {
    setCartItems(localCartItems);
    setTotalPrice(totalPrice);
  }, [totalPrice]);

  return (
    <div>
      <h1>Finalizar pedido</h1>
      {cartItems.length ? (
        <>
          <table>
            <thead>
              <tr>
                {titlesTable && titlesTable.map((title, index) => (
                  <th key={ index }>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {cartItems ? cartItems.map((item, index) => (
                <tr key={ item.id }>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-item-number-${index}`
                    }
                  >
                    {index + 1}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-name-${index}`
                    }
                  >
                    {item.name}
                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-quantity-${index}`
                    }
                  >
                    {item.quantity}

                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    {
                      convertTotal(item.price)
                    }

                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {convertTotal(item.price * item.quantity)}

                  </td>
                  <td>
                    <button
                      type="button"
                      data-testid={
                        `customer_checkout__element-order-table-remove-${index}`
                      }
                      onClick={ () => handleClick(item) }
                    >
                      Remover
                    </button>
                  </td>
                </tr>

              )) : 'Seu carrinho esta vazio'}
            </tbody>
          </table>
          <h2>Preço total:</h2>
          <span
            data-testid="customer_checkout__element-order-total-price"
          >
            {convertTotal(priceTotal)}
          </span>
        </>
      ) : 'Seu carrinho esta vazio'}
    </div>
  );
}

export default Checkout;
