import React, { useState, useEffect } from 'react';
import { Product } from '../../types';
import { useLanguage } from '../../i18n';
import './ShopGrid.css';
import { ProductCard } from './ProductCard';

interface ShopGridProps {
  products: Product[];
  onProductClick?: (product: Product) => void;
}

type CategoryFilter = 'all' | 'food' | 'toy' | 'accessory' | 'brush' | 'favorites';

export const ShopGrid: React.FC<ShopGridProps> = ({ products, onProductClick }) => {
  const { t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState<CategoryFilter>('all');
  const [favorites, setFavorites] = useState<string[]>([]);
  
  // Load favorites from localStorage on mount
  useEffect(() => {
    const savedFavorites = localStorage.getItem('favoriteProducts');
    if (savedFavorites) {
      try {
        setFavorites(JSON.parse(savedFavorites));
      } catch (error) {
        console.error('Error loading favorites:', error);
      }
    }
  }, []);
  
  const filteredProducts = selectedCategory === 'all' 
    ? products 
    : selectedCategory === 'favorites'
    ? products.filter(product => favorites.includes(product.id))
    : products.filter(product => product.category === selectedCategory);
  
  const categories: CategoryFilter[] = ['all', 'food', 'toy', 'accessory', 'brush', 'favorites'];
  
  return (
    <>
      <div className="shop-grid__top-space">
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
              {category === 'all' ? (
                <img src={`/images/${t.product.categories[category]}`} alt={category} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
              ) : (
                <img src={`/images/${t.product.categories[category]}`} alt={category} style={{ width: '40px', height: '40px', objectFit: 'contain' }} />
              )}
              {selectedCategory === category && (
                <span className="shop-grid__filter-text">{t.product.categoryDescriptions[category]}</span>
              )}
            </button>
          ))}
        </div>
      </div>

      <div className="shop-grid">
        <div className="shop-grid__products">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onClick={onProductClick}
              />
            ))
          ) : (
            <div className="shop-grid__empty">
              <p>{t.product.categoryDescriptions[selectedCategory]}</p>
              <p>暫無商品</p>
            </div>
          )}
        </div>
      </div>

      <div className="shop-grid__footer"></div>
    </>
  );
};
