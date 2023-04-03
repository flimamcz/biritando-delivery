if (!JSON.parse(localStorage.getItem('shoppingCart'))) {
  localStorage.setItem('shoppingCart', JSON.stringify([]));
}
export const readShoppingCart = () => JSON.parse(localStorage.getItem('shoppingCart'));

const saveShoppingCart = (shoppingCart) => localStorage
  .setItem('shoppingCart', JSON.stringify(shoppingCart));

export const addProduct = (product) => {
  if (product) {
    const shoppingCart = readShoppingCart();
    saveShoppingCart([...shoppingCart, product]);
  }
};

export const removeProduct = (product) => {
  const shoppingCart = readShoppingCart();
  saveShoppingCart(shoppingCart.filter((p) => p.id !== product.id));
};
