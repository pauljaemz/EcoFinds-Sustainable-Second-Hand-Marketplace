import React from 'react';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="product-card">
            <img src={product.image} alt={product.title} className="product-image" />
            <h3 className="product-title">{product.title}</h3>
            <p className="product-description">{product.description}</p>
            <p className="product-price">${product.price.toFixed(2)}</p>
            <button onClick={() => onAddToCart(product)} className="add-to-cart-button">
                Add to Cart
            </button>
        </div>
    );
};

export default ProductCard;