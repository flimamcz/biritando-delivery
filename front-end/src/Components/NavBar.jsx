import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import MyContext from '../context/MyContext';
import '../styles/navbar.css';
import avatar from '../images/avatar.svg';

function NavBar({ type }) {
  const [username, setUsername] = useState('');
  const { logOut } = useContext(MyContext);
  const history = useHistory();

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('user'))) {
      localStorage.setItem('user', JSON.stringify({ name: 'usuário' }));
    }
    const { name } = JSON.parse(localStorage.getItem('user'));
    setUsername(name);
  }, []);

  return (
    <header>
      <img className="logo" alt="logo" />
      <nav>
        <ul className="nav_links">
          {type.map(({ name, link, testId }, i) => (
            <li key={ i }>
              <Link
                to={ link }
                data-testid={ `customer_products__element-navbar-link-${testId}` }
              >
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      <div className="button_name">
        <div className="profile">
          <img src={ avatar } alt="profile icon" />
          <h3 data-testid="customer_products__element-navbar-user-full-name">
            {username}
          </h3>
        </div>
        <button
          className="nav_button"
          data-testid="customer_products__element-navbar-link-logout"
          type="button"
          onClick={ () => {
            logOut();
            history.push('/login');
          } }
        >
          Sair
        </button>
      </div>
    </header>
  );
}

NavBar.propTypes = {
  navbarsLinksName: PropTypes.shape({
    products: PropTypes.shape({
      linkName: PropTypes.string,
      linkUrl: PropTypes.string,
      dataTestId: PropTypes.string,
    }),
  }),
}.isRequired;

export default NavBar;
