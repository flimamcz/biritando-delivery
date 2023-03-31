import React, { useContext, useEffect, useState } from 'react';
import { Redirect } from 'react-router-dom';
import Navbar from '../Components/NavBar';
import MyContext from '../context/MyContext';
import ProductsCard from '../Components/ProductsCard';
import { navBarCustomer } from '../utils/navBarinfo';

function Customer() {
  const { isLogged, getProducts, productsData, verifyToken } = useContext(MyContext);

  const [cartItems, setCartItems] = useState([]);
  const [priceTotal, setTotalPrice] = useState(0);
  const [emptyCart, toggleEmptyCart] = useState(false);

  useEffect(() => {
    getProducts();
    verifyToken();
    const localCartItems = JSON.parse(localStorage.getItem('cartItems'));
    if (localCartItems) {
      setCartItems(localCartItems);
    }

    if (!localCartItems) {
      toggleEmptyCart(true);
    }

    if (localCartItems) {
      let totalPrice = 0;
      localCartItems.forEach(({ price, quantity }) => {
        totalPrice += price * quantity;
      });
      setTotalPrice(totalPrice);
    }
  }, [getProducts, verifyToken]);

  const saveToLocalStorage = () => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems));
  };

  const addToCart = ({
    id,
    name,
    price,
    urlImage,
  }) => {
    const cartItemsCopy = cartItems;
    let item;
    if (cartItems) {
      item = cartItemsCopy.find((product) => product.id === id);
    }

    if (!item) {
      cartItemsCopy.push({
        id,
        name,
        price,
        urlImage,
        quantity: 1,
      });
    } else {
      item.quantity += 1;
    }

    const newCartItems = cartItemsCopy;
    setCartItems([...newCartItems]);
    saveToLocalStorage();
  };

  const increaseQuantity = (productData) => {
    let totalPrice = 0;

    const productWithQuantity = { ...productData };

    const cartItemsCopy = cartItems;
    const item = cartItemsCopy.find((product) => product.id === productWithQuantity.id);
    if (!item) {
      addToCart(productWithQuantity);
    } else {
      item.quantity += 1;
      cartItems.forEach(({ price, quantity }) => {
        totalPrice += price * quantity;
      });
      setTotalPrice(totalPrice);
    }
    const newCartItems = cartItemsCopy;
    setCartItems([...newCartItems]);
    saveToLocalStorage();
  };

  const decreaseQuantity = (id) => {
    const cartItemsCopy = cartItems;
    let totalPrice = 0;
    const item = cartItemsCopy.find((product) => product.id === id);
    if (item.quantity > 1) {
      item.quantity -= 1;
      cartItems.forEach(({ price, quantity }) => {
        totalPrice += price * quantity;
      });
      setTotalPrice(totalPrice);
    }
    const newCartItems = cartItemsCopy;
    setCartItems([...newCartItems]);
    saveToLocalStorage();
  };

  const setProductQuantity = (productData) => {
    let totalPrice = 0;

    const productWithQuantity = productData;

    const cartItemsCopy = cartItems;
    const item = cartItemsCopy.find((product) => product.id === productWithQuantity.id);
    if (!item) {
      addToCart(productWithQuantity);
    } else {
      item.quantity = productWithQuantity.quantity;
      cartItems.forEach(({ price, quantity }) => {
        totalPrice += price * quantity;
      });
      setTotalPrice(totalPrice);
    }
    const newCartItems = cartItemsCopy;
    setCartItems([...newCartItems]);
    saveToLocalStorage();
  };

  const removeProduct = (id) => {
    const cartItemsCopy = cartItems;
    const items = cartItemsCopy.filter((product) => product.id !== id);
    const newCartItems = items;
    if (newCartItems.length <= 0) {
      localStorage.clear();
      setCartItems(null);
      toggleEmptyCart(true);
    } else {
      setCartItems([...newCartItems]);
      saveToLocalStorage();
      let totalPrice = 0;
      cartItems.forEach(({ price, quantity }) => {
        totalPrice += price * quantity;
      });
      setTotalPrice(totalPrice);
      toggleEmptyCart(false);
    }
  };

  const methods = {
    increaseQuantity,
    decreaseQuantity,
    removeProduct,
    addToCart,
    setProductQuantity,
  };

  if (!isLogged) {
    return <Redirect to="/login" />;
  }

  return (
    <div>
      <Navbar type={ navBarCustomer } />
      <div>
        {productsData.map((product) => (
          <ProductsCard
            methods={ methods }
            dataProduct={ product }
            key={ Math.random() }
          />
        ))}
        {emptyCart ? (<p>Seu Carrinho Está Vazio</p>) : (<p>{ priceTotal }</p>)}
      </div>
    </div>
  );
}

export default Customer;
