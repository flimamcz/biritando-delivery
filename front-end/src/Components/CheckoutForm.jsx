import React, { useCallback, useContext, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import { requestPost } from '../services/request';

export default function CheckoutForm() {
  const {
    getSellers, sellers,
    setSaleInfo, saleInfo,
    cartItems,
  } = useContext(MyContext);
  const history = useHistory();

  const createSale = async (event) => {
    event.preventDefault();
    const { email, token } = JSON.parse(localStorage.getItem('user'));
    const headers = {
      headers: {
        Authorization: token,
      },
    };
    try {
      const { id } = await requestPost('/customer/orders', { saleInfo, email }, headers);
      await requestPost('customer/products', { cartItems, id });
      history.push(`/customer/orders/${id}`);
    } catch (error) {
      console.log(error.message);
    }
  };
  const handleChange = useCallback(
    ({ target }) => {
      const auxValues = { ...saleInfo };
      auxValues[target.name] = target.value;
      setSaleInfo(auxValues);
    },
    [saleInfo, setSaleInfo],
  );

  useEffect(() => {
    getSellers();
  }, [getSellers]);

  return (
    <div className="checkout_form_container">
      <h1 className="checkout_form_title">Detalhes e Endereço para Entrega</h1>
      <form className="checkout_form">
        <label className="checkout_form_label" htmlFor="seller">
          <h4>P. Vendedora Responsável:</h4>
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

        <label className="checkout_form_label" htmlFor="address">
          <h4>Endereço</h4>
          <input
            onChange={ handleChange }
            name="deliveryAddress"
            type="text"
            placeholder="Travessa Terceira da Castanheira, Bairro Muruci"
            data-testid="customer_checkout__input-address"
          />
        </label>

        <label className="checkout_form_label" htmlFor="number">
          <h4>Número</h4>
          <input
            onChange={ handleChange }
            name="deliveryNumber"
            type="text"
            data-testid="customer_checkout__input-address-number"
            placeholder="187"
          />
        </label>
        <button
          className="submit_button"
          onClick={ createSale }
          disabled={ !cartItems.length }
          type="submit"
          data-testid="customer_checkout__button-submit-order"
        >
          Finalizar Pedido
        </button>
      </form>

    </div>
  );
}
