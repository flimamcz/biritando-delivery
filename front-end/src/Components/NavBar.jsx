import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

function Navbar(props) {
  const { navbarsLinksName } = props;
  const { name } = JSON.parse(localStorage.getItem('user'));
  return (
    <nav>
      {
        navbarsLinksName.map(({ linkName, linkUrl, dataTestid }, index) => (
          <Link
            to={ `/${linkUrl}` }
            key={ index }
            data-testid={ `customer_products__element-navbar-link-${dataTestid}` }
          >
            {linkName}
          </Link>
        ))
      }

      <h3>{name}</h3>

      <button type="button">Sair</button>
    </nav>
  );
}

Navbar.propTypes = {
  navbarsLinksName: PropTypes.arrayOf(PropTypes.shape({})).isRequired,
};

export default Navbar;
