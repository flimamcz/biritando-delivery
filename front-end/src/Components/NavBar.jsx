import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';

function Navbar() {
  const [username, setUsername] = useState('');
  const { logOut } = useContext(MyContext);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) {
      localStorage.setItem('user', JSON.stringify({ name: 'usuário' }));
    }
    const { name } = JSON.parse(localStorage.getItem('user'));
    setUsername(name);
  }, []);

  return (
    <nav>
      <ul>
        <li>
          <Link
            to="/customer/products"
            data-testid="customer_products__element-navbar-link-products"
          >
            PRODUTOS
          </Link>
        </li>
        <li>
          <Link
            to="/customer/orders"
            data-testid="customer_products__element-navbar-link-orders"
          >
            PEDIDOS
          </Link>
        </li>
      </ul>

      <h3 data-testid="customer_products__element-navbar-user-full-name">{username}</h3>

      <button
        data-testid="customer_products__element-navbar-link-logout"
        type="button"
        onClick={ logOut }
      >
        Sair
      </button>
    </nav>
  );
}

Navbar.propTypes = {
  navbarsLinksName: PropTypes.shape({
    products: PropTypes.shape({
      linkName: PropTypes.string,
      linkUrl: PropTypes.string,
      dataTestId: PropTypes.string,
    }),
  }),
}.isRequired;

export default Navbar;
