import PropTypes from 'prop-types';
import React from 'react';

function ProductsCard(props) {
  const { dataProduct: { id, name, price, urlImage } } = props;
  return (
    <div>
      <div key={ id } className="card">
        <span
          data-testid={ `customer_products__element-card-price-${id}` }
        >
          {price}
        </span>
        <img
          src={ `${urlImage}` }
          alt={ `the product is ${name}` }
          data-testid={ `customer_products__img-card-bg-image-${id}` }
        />
        <p data-testid={ `customer_products__element-card-title-${id}` }>{name}</p>
        <div>
          <button
            type="button"
            data-testid={ `customer_products__button-card-rm-item-${id}` }
          >
            -
          </button>
          <input
            type="number"
            data-testid={ `customer_products_input-card-quantity-${id}` }
          />
          <button
            type="button"
            data-testid={ `customer_products__button-card-add-item-${id}` }
          >
            +
          </button>
        </div>
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
