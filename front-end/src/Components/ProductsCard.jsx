import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { getCartItems, setCartItems } from '../utils/cartLocalStorage';
import '../styles/ProductCard.css';

export default class ProductsCard extends Component {
  state = {
    quantity: 0,
  };

  componentDidMount() {
    const { id } = this.props;
    const cartItems = getCartItems();
    const product = cartItems.find((p) => p.id === id);
    if (product) this.setState({ quantity: product.quantity });
    this.updateTotalPrice();
  }

  updateCartItems = () => {
    const { price, urlImage, name, id } = this.props;
    const { quantity } = this.state;

    const newProduct = {
      price,
      urlImage,
      name,
      id,
      quantity,
    };

    const cartItems = getCartItems();
    const newProductIndex = cartItems.findIndex((p) => p.id === id);

    if (quantity < 1) {
      cartItems.splice(newProductIndex, 1);
    } else if (newProductIndex < 0) {
      cartItems.push(newProduct);
    } else {
      cartItems[newProductIndex] = newProduct;
    }

    setCartItems(cartItems);
    this.updateTotalPrice();
  };

  updateTotalPrice = () => {
    const { setTotalPrice } = this.props;
    const cartItems = getCartItems();
    const sum = cartItems
      .map((product) => product.price * product.quantity)
      .reduce((a, b) => a + b, 0);

    setTotalPrice(sum.toLocaleString('pt-BR', { minimumFractionDigits: 2 }));
  };

  handleClick = (qty, { target: { name } }) => {
    switch (name) {
    case 'increase':
      this.setState({ quantity: qty + 1 }, () => this.updateCartItems());
      break;
    case 'decrease':
      if (qty > 0) {
        this.setState({ quantity: qty - 1 }, () => this.updateCartItems());
      }
      break;
    default:
      this.updateCartItems();
    }
  };

  handleChange = ({ target: { value } }) => {
    this.setState({ quantity: Number(value) }, () => this.updateCartItems());
  };

  render() {
    const { quantity } = this.state;
    const { id, price, urlImage, name } = this.props;
    return (
      <li className="card-product">
        <img
          width="150px"
          src={ urlImage }
          alt={ `${name}-img` }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
        <p
          data-testid={ `customer_products__element-card-title-${id}` }
          className="name-product"
        >
          {name}
        </p>
        <p
          data-testid={ `customer_products__element-card-price-${id}` }
          className="price-product"
        >
          {Number(price).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
        </p>
        <div className="section-buttons-input">
          <button
            type="button"
            name="decrease"
            onClick={ (event) => this.handleClick(quantity, event) }
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            -
          </button>
          <input
            type="number"
            name="quantityInput"
            value={ quantity }
            onChange={ this.handleChange }
            min="0"
            data-testid={ `customer_products__input-card-quantity-${id}` }
          />
          <button
            type="button"
            name="increase"
            onClick={ (event) => this.handleClick(quantity, event) }
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            +
          </button>
        </div>
      </li>
    );
  }
}

ProductsCard.propTypes = {
  urlImage: PropTypes.string,
  price: PropTypes.string,
  name: PropTypes.string,
  id: PropTypes.string,
}.isRequired;
