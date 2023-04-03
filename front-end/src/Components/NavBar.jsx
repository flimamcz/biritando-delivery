import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';

function NavBar() {
  const { logOut } = useContext(MyContext);
  const user = localStorage.getItem('user');

  return (
    <div>
      <li data-testid="customer_products__element-navbar-link-orders">
        <Link to="/seller/orders">GERENCIAR USUÁRIOS</Link>
      </li>
      <li data-testid="customer_products__element-navbar-user-full-name">
        {user.name}
      </li>
      <button
        type="button"
        onClick={ logOut }
        data-testid="customer_products__element-navbar-link-logout"
      >
        Sair
      </button>
    </div>
  );
}

export default NavBar;
