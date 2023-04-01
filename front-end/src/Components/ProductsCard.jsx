import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

function ProductsCard(props) {
  const { dataProduct, methods } = props;
  const { id, name, price, urlImage } = dataProduct;
  const formattedPrice = () => { if (price) return `R$ ${price.replace('.', ',')}`; };

  const [quantity, setQuantity] = useState(0);

  useEffect(() => {
    if (!JSON.parse(localStorage.getItem('cartItems'))) {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    const cartList = JSON.parse(localStorage.getItem('cartItems'));
    const currentItem = cartList.find((item) => item.id === id);
    if (currentItem) {
      setQuantity(currentItem.quantity);
    }
  }, []);

  const handleChange = ({ target }) => {
    const auxValues = target.value;
    setQuantity(auxValues);
    methods.setProductQuantity({ ...dataProduct, quantity: auxValues });
  };

  return (

    <div key={ id } className="card">
      <span
        data-testid={ `customer_products__element-card-price-${id}` }
      >
        {formattedPrice()}
      </span>
      <img
        src={ `${urlImage}` }
        alt={ `the product is ${name}` }
        width="128px"
        data-testid={ `customer_products__img-card-bg-image-${id}` }
      />
      <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
      <div>
        <button
          type="button"
          onClick={ () => methods.decreaseQuantity(id) }
          data-testid={ `customer_products__button-card-rm-item-${id}` }
        >
          -
        </button>
        <input
          value={ Number(quantity) }
          onChange={ handleChange }
          data-testid={ `customer_products__input-card-quantity-${id}` }
        />
        <button
          type="button"
          onClick={ () => methods.increaseQuantity({ ...dataProduct, quantity }) }
          data-testid={ `customer_products__button-card-add-item-${id}` }
        >
          +
        </button>
      </div>
    </div>

  );
}

ProductsCard.propTypes = {
  id: PropTypes.number,
  name: PropTypes.string,
  price: PropTypes.string,
  urlImage: PropTypes.string,
}.isRequired;

export default ProductsCard;
