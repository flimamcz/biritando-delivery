export const getCartItems = () => {
  if (!localStorage.getItem('cartItems')) {
    localStorage.setItem('cartItems', JSON.stringify([]));
  }
  return JSON.parse(localStorage.getItem('cartItems'));
};

export const setCartItems = (value) => {
  localStorage.setItem('cartItems', JSON.stringify(value));
};
