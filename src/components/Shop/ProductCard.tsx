import React from 'react';
import { Product } from '../../../debug/types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(product);
    }
  };

  return (
    <div className="product-card" onClick={handleClick}>
      <div className="product-card__image-container">
        <img 
          src={product.images[0]} 
          alt={product.name}
          className="product-card__image"
        />
      </div>
      
      <div className="product-card__content">
        <h3 className="product-card__name">{product.name}</h3>
        <div className="product-card__footer">
          <span className="product-card__price">¥{product.price}</span>
          <div className="product-card__category-badge">
            {product.category === 'food' && '🍖'}
            {product.category === 'toy' && '🎾'}
            {product.category === 'accessory' && '🎀'}
          </div>
        </div>
      </div>
    </div>
  );
};
