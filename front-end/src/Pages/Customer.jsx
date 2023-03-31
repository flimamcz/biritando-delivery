import React, { useContext, useEffect } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import MyContext from '../context/MyContext';
import ProductsCard from '../Components/ProductsCard';
import { navBarCustomer } from '../utils/navBarinfo';

function Customer() {
  const { isLogged, getProducts, productsData, verifyToken } = useContext(MyContext);

  useEffect(() => {
    getProducts();
    verifyToken();
    if (!JSON.parse(localStorage.getItem('shoppingCart'))) {
      localStorage.setItem('shoppingCart', JSON.stringify([{
        id: '',
        name: '',
        price: '',
        quantity: '',
      }]));
    }
  }, [getProducts, verifyToken]);

  if (!isLogged) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar type={ navBarCustomer } />
      <div>
        {productsData.map((product) => (
          <ProductsCard dataProduct={ product } key={ Math.random() } />
        ))}
      </div>
    </div>
  );
}

export default Customer;
