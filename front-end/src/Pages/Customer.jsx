import React, { useContext, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ProductCard from '../Components/ProductsCard';
import MyContext from '../context/MyContext';
import { navBarCustomer } from '../utils/navBarinfo';
import Navbar from '../Components/NavBar';
import '../styles/ProductCard.css';

export default function Customer() {
  const { productsData } = useContext(MyContext);
  const [totalPrice, setTotalPrice] = useState(0);

  const history = useHistory();

  return (
    <div>
      <Navbar type={ navBarCustomer } />
      <ul className="product-container">
        {productsData?.map(({ id, name, price, urlImage }, i) => (
          <ProductCard
            key={ i }
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
        className="view-cart-button"
      >
        <p>Ver Carrinho</p>
        <span data-testid="customer_products__checkout-bottom-value">
          {totalPrice}
        </span>
      </button>
    </div>
  );
}
