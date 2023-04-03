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
  }, [getProducts, verifyToken]);

  const roundPrice = (value) => {
    const totalPrice = Math.round((value) * 100) / 100;
    return totalPrice;
  };

  useEffect(() => {
    let soma = 0;
    const totalPricePerItem = cartItems.map((item) => item.quantity * item.price);
    totalPricePerItem.forEach((element) => {
      soma += element;
    });
    if (totalPricePerItem.length)setTotalPrice(roundPrice(soma));
  }, [cartItems]);

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
      console.log(item.quantity);
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
    if (item.quantity > 0) {
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
    const item = cartItems.find((product) => product.id === productData.id);
    if (!item) {
      addToCart(productData);
    } else {
      item.quantity = productData.quantity;
      cartItems.forEach(({ price, quantity }) => {
        totalPrice += price * quantity;
      });
      setTotalPrice(totalPrice);
    }
    setCartItems(cartItems);
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
        {emptyCart ? (<p>Seu Carrinho Está Vazio</p>) : (<p>{ `R$ ${priceTotal}` }</p>)}
      </div>
    </div>
  );
}

export default Customer;
