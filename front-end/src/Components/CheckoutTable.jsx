import '../styles/checkout.css';
import React, { useContext, useEffect, useState } from 'react';
import trash from '../images/trash.svg';
import sadface from '../images/sadface.svg';
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
    <div className="checkout_table_container">
      <h1 className="checkout_title">Finalizar pedido</h1>
      {cartItems.length ? (
        <>
          <table>
            <thead className="checkout_table_header_container">
              <tr className="checkout_table_header">
                {titlesTable && titlesTable.map((title, index) => (
                  <th key={ index }>{title}</th>
                ))}
              </tr>
            </thead>
            <tbody className="checkout_table_body">
              {cartItems ? cartItems.map((item, index) => (
                <tr className="checkout_table_body_info" key={ item.id }>
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
                    {`${item.quantity} x`}

                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-unit-price-${index}`
                    }
                  >
                    {
                      `R$${convertTotal(item.price)}`
                    }

                  </td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    {`R$${convertTotal(item.price * item.quantity)}`}
                  </td>
                  <td>
                    <button
                      className="checkout_remove_button"
                      type="button"
                      data-testid={
                        `customer_checkout__element-order-table-remove-${index}`
                      }
                      onClick={ () => handleClick(item) }
                    >
                      <img src={ trash } alt="botão para remover item do pedido" />
                    </button>
                  </td>
                </tr>

              )) : 'Seu carrinho esta vazio'}
            </tbody>
          </table>
          <div className="checkout_price_container">
            <p>Total:</p>
            <p
              data-testid="customer_checkout__element-order-total-price"
            >
              {`R$${convertTotal(priceTotal)}`}
            </p>
          </div>
        </>
      ) : (
        <div className="empty_bag_container">
          <img src={ sadface } alt="sacola vazio" width={ 300 } />
          <h1>Sua sacola está vazia</h1>
        </div>
      )}
    </div>
  );
}

export default Checkout;
