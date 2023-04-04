/* eslint-disable quotes */
import React, { useContext, useState } from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import ProductCard from '../Components/ProductsCard';
import MyContext from '../context/MyContext';
import { navBarCustomer } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';

export default function Customer() {
  const { productsData, isLogged } = useContext(MyContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const history = useHistory();

  if (!isLogged) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar type={ navBarCustomer } />
      <ul>
        {productsData?.map(({ id, name, price, urlImage }) => (
          <ProductCard
            key={ id }
            id={ id }
            name={ name }
            price={ price }
            urlImage={ urlImage }
            setTotalPrice={ setTotalPrice }
          />
        ))}
      </ul>
      <button
        type="button"
        onClick={ () => history.push('/customer/checkout') }
        disabled={ totalPrice === '0,00' }
        data-testid="customer_products__button-cart"
      >
        <p>
          Ver Carrinho&nbsp;
          <span data-testid="customer_products__checkout-bottom-value">{totalPrice}</span>
        </p>
      </button>
    </div>
  );
}
