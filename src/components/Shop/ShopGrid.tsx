import React, { useState } from 'react';
import { Product } from '../../types';
import { useLanguage } from '../../i18n';
import './ShopGrid.css';
import { ProductCard } from './ProductCard';

interface ShopGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

type CategoryFilter = 'all' | 'food' | 'toy' | 'accessory';

export const ShopGrid: React.FC<ShopGridProps> = ({ products, onProductClick }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : products.filter(product => product.category === selectedCategory);
  
  const categories: CategoryFilter[] = ['all', 'food', 'toy', 'accessory'];
  
  return (
    <div className="shop-grid">
      <div className="shop-grid__header">
        {/* <h2 className="shop-grid__title">{t.home.shopTitle}</h2> */}
        <img src="/images/shop_item.png" alt="Shop" className="shop-grid__icon" />
      </div>
      
      <div className="shop-grid__filters">
        {categories.map((category) => (
          <button
            key={category}
            className={`shop-grid__filter-btn ${
              selectedCategory === category ? 'shop-grid__filter-btn--active' : ''
            }`}
            onClick={() => setSelectedCategory(category)}
          >
            {t.product.categories[category]}
          </button>
        ))}
      </div>
      
      <div className="shop-grid__products">
        {filteredProducts.map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onClick={onProductClick}
          />
        ))}
      </div>
    </div>
  );
};
