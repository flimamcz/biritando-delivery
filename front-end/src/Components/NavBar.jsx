import PropTypes from 'prop-types';
import React, { useContext, useEffect, useState } from 'react';

import { Link } from 'react-router-dom';
import MyContext from '../context/MyContext';

function Navbar({ type }) {
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

// export default Navbar;
// import React, { useContext } from 'react';
// import { Link } from 'react-router-dom';
// import MyContext from '../context/MyContext';

// function NavBar() {
//   const { logOut } = useContext(MyContext);
//   const user = localStorage.getItem('user');

//   return (
//     <div>
//       <li data-testid="customer_products__element-navbar-link-orders">
//         <Link to="/seller/orders">GERENCIAR USUÁRIOS</Link>
//       </li>
//       <li data-testid="customer_products__element-navbar-user-full-name">
//         {user.name}
//       </li>
//       <button
//         type="button"
//         onClick={ logOut }
//         data-testid="customer_products__element-navbar-link-logout"
//       >
//         Sair
//       </button>
//     </div>
//   );
// }

// export default NavBar;
