import React, { useEffect, useState, useCallback } from 'react';
import { Redirect } from 'react-router-dom';
import { requestPost, requestGet } from '../services/request';

function Checkout() {
  const [cartItems, setCartItems] = useState([]);
  const [sellers, setSellers] = useState([]);
  const [priceTotal, setTotalPrice] = useState(0);
  const [saleInfo, setSaleInfo] = useState([]);

  const localCartItems = JSON.parse(localStorage.getItem('cartItems'));

  const totalPrice = localCartItems.reduce((acc, curr) => (
    acc + curr.price * curr.quantity
  ), 0);

  const handleChange = useCallback(
    ({ target }) => {
      const auxValues = { ...saleInfo };
      auxValues[target.name] = target.value;
      setSaleInfo(auxValues);
    },
    [saleInfo],
  );

  useEffect(() => {
    setSaleInfo({
      sellerId: 2,
      totalPrice,
      deliveryAddress: '',
      deliveryNumber: '',
      saleDate: Date.now(),
      status: 'Pendente',
    });
  }, [totalPrice]);

  const titlesTable = [
    'Item', 'Descrição', 'Quantidade', 'Valor Unitário', 'Sub-total', 'Remover Item',
  ];

  const reRender = (items) => {
    setCartItems(items);
  };

  const getSellers = useCallback(async () => {
    try {
      const seller = await requestGet('/seller');
      setSellers(seller);
    } catch (error) {
      console.log(error.message);
    }
  }, []);

  const createSale = async (event) => {
    event.preventDefault();
    const { email } = JSON.parse(localStorage.getItem('user'));
    console.log(email);
    try {
      const { id } = await requestPost('/customer/orders', { saleInfo, email });
      return <Redirect to={ `/customer/orders/${id}` } />;
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    getSellers();
    setCartItems(localCartItems);
    setTotalPrice(totalPrice);
  }, [totalPrice, getSellers]);

  return (
    <>
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
            </table>
            <span
              data-testid="customer_checkout__element-order-total-price"
            >
              Preço total R$:
              {priceTotal.toFixed(2)}
            </span>
          </>
        ) : 'Seu carrinho esta vazio'}
      </div>
      <h2>Detalhes e Endereço para Entrega</h2>
      <form>
        <label htmlFor="seller">
          <p>P. Vendedora Responsável:</p>
          <select
            name="sellerId"
            data-testid="customer_checkout__select-seller"
            onChange={ handleChange }
          >
            { sellers.map((item, index) => (
              <option
                key={ index }
                name={ item.name }
                value={ item.id }
              >
                {item.name}
              </option>
            ))}
          </select>
        </label>

        <label htmlFor="address">
          <p>Endereço</p>
          <input
            onChange={ handleChange }
            name="deliveryAddress"
            type="text"
            placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
            data-testid="customer_checkout__input-address"
          />
        </label>

        <label htmlFor="number">
          <p>Número</p>
          <input
            onChange={ handleChange }
            name="deliveryNumber"
            type="text"
            data-testid="customer_checkout__input-address-number"
            placeholder="187"
          />
        </label>
        <button
          onClick={ createSale }
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
