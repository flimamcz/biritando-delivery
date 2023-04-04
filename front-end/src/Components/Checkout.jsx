import React, { useEffect, useState } from 'react';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [priceTotal, setTotalPrice] = useState(0);

  const titlesTable = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item',
  ];
  const localCartItems = JSON.parse(localStorage.getItem('cartItems'));
  const totalPrice = localCartItems.reduce((acc, curr) => (
    acc + curr.price * curr.quantity
  ), 0);

  const reRender = (items) => {
    setCartItems(items);
  };

  useEffect(() => {
    setCartItems(localCartItems);
    setTotalPrice(totalPrice);
  }, [totalPrice]);

  return (
    <>
      <div>
        <h1>Finalizar pedido</h1>
        {cartItems.length ? (

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
                    {item.price}

                  </td>
                  <td>{(item.price * item.quantity).toFixed(2)}</td>
                  <td
                    data-testid={
                      `customer_checkout__element-order-table-sub-total-${index}`
                    }
                  >
                    <button
                      type="button"
                      data-testid={
                        `customer_checkout__element-order-table-remove-${index}`
                      }
                      onClick={ () => {
                        cartItems.splice(cartItems.indexOf(item), 1);
                        localStorage.setItem('cartItems', JSON.stringify(cartItems));
                        reRender(localCartItems);
                      } }
                    >
                      Remover
                    </button>
                  </td>
                </tr>

              )) : 'Seu carrinho esta vazio'}
            </tbody>
            <p
              data-testid="customer_checkout__element-order-total-price"
            >
              Preço total R$:
              {' '}
              {priceTotal.toFixed(2)}
            </p>
          </table>
        ) : 'Seu carrinho esta vazio'}
      </div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <form>
        <label htmlFor="seller">
          <p>P. Vendedora Responsável:</p>
          <select value="" data-testid="customer_checkout__select-seller">
            <option name="fulana Pereira" value="1">Fulana Pereira</option>
            <option name="fulana Pereira" value="2">Fulana Silva</option>
          </select>
        </label>

        <label htmlFor="address">
          <p>Endereço</p>
          <input
            type="text"
            placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
            data-testid="customer_checkout__input-address"
          />
        </label>

        <label htmlFor="number">
          <p>Número</p>
          <input
            type="text"
            data-testid="customer_checkout__input-address-number"
            placeholder="187"
          />
        </label>
        <button
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </form>
    </>
  );
}

export default Checkout;
