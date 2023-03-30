import PropTypes from 'prop-types';
import React from 'react';

import { Link } from 'react-router-dom';

function Navbar(props) {
  const { navbarsLinksName } = props;
  const { name } = JSON.parse(localStorage.getItem('user'));
  return (
    <nav>
      {
        navbarsLinksName.map((linkName, index) => (
          <Link to={ `/${linkName}` } key={ index }>{linkName}</Link>
        ))
      }

      <h3>{name}</h3>

      <button type="button">Sair</button>
    </nav>
  );
}

Navbar.propTypes = {
  navbarsLinksName: PropTypes.shape({
    map: PropTypes.func,
  }).isRequired,
};

export default Navbar;
