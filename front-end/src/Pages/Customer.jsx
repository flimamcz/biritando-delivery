import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import MyContext from '../context/MyContext';
import navbarsLinksNameProducts from '../utils/navbarsLinksName';
import ProductsCard from '../Components/ProductsCard';

function Login() {
  const { isLogged, getProducts, productsData } = useContext(MyContext);

  useEffect(() => {
    getProducts();
  }, []);
  if (!isLogged) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar navbarsLinksName={ navbarsLinksNameProducts } />
      <div>
        {productsData.map((product) => (
          <ProductsCard dataProduct={ product } key={ product.id } />
        ))}
      </div>
    </div>
  );
}

export default Login;
