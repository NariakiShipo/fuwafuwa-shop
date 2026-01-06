import React from 'react';
import { Product } from '../../types';
import './ProductCard.css';

interface ProductCardProps {
  product: Product;
  onClick?: (product: Product) => void;
}

const getCategoryImage = (category: string): string => {
  const categoryImageMap: Record<string, string> = {
    food: 'can.png',
    toy: 'ball.png',
    accessory: 'collar.png',
    brush: 'brush.png',
  };
  return categoryImageMap[category] || 'All.png';
};

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
            <img 
              src={`/images/${getCategoryImage(product.category)}`} 
              alt={product.category}
              style={{ width: '100%', height: '100%', objectFit: 'contain' }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
