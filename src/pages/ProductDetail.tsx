import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ReactionPreview } from '../components/Pet/ReactionPreview';
import { useLanguage } from '../i18n';
import { useAuth } from '../contexts/AuthContext';
import { useCart } from '../hooks';
import { Product } from '../types';
import './ProductDetail.css';

export const ProductDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { t } = useLanguage();
  const { currentUser } = useAuth();
  const { addToCart } = useCart();
  
  const [product, setProduct] = useState<Product | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isFavorited, setIsFavorited] = useState(false);

  // 從本地數據加載商品（臨時方案）
  useEffect(() => {
    // TODO: 後續從 Firestore 加載商品
    const sampleProducts: Product[] = [
      {
        id: '1',
        name: t.sampleProducts.dogFood.name,
        price: 1500,
        description: t.sampleProducts.dogFood.description,
        category: 'food',
        images: ['/images/can.png'],
        reactionType: 'hungry',
        stock: 10,
      },
      {
        id: '2',
        name: t.sampleProducts.ball.name,
        price: 800,
        description: t.sampleProducts.ball.description,
        category: 'toy',
        images: ['/images/ball.png'],
        reactionType: 'excited',
        stock: 15,
      },
      {
        id: '3',
        name: t.sampleProducts.bow.name,
        price: 600,
        description: t.sampleProducts.bow.description,
        category: 'accessory',
        images: ['/images/bow.png'],
        reactionType: 'happy',
        stock: 20,
      },
      {
        id: '4',
        name: t.sampleProducts.brush.name,
        price: 1200,
        description: t.sampleProducts.brush.description,
        category: 'brush',
        images: ['/images/brush.png'],
        reactionType: 'happy',
        stock: 8,
      },
      {
        id: '5',
        name: t.sampleProducts.collar.name,
        price: 1000,
        description: t.sampleProducts.collar.description,
        category: 'accessory',
        images: ['/images/collar.png'],
        reactionType: 'curious',
        stock: 12,
      },
      {
        id: '6',
        name: t.sampleProducts.hat.name,
        price: 900,
        description: t.sampleProducts.hat.description,
        category: 'accessory',
        images: ['/images/hat.png'],
        reactionType: 'happy',
        stock: 5,
      },
    ];
    
    const foundProduct = sampleProducts.find(p => p.id === id);
    setProduct(foundProduct || null);
    
    // Load favorite status from localStorage
    if (foundProduct) {
      const savedFavorites = localStorage.getItem('favoriteProducts');
      if (savedFavorites) {
        try {
          const favorites = JSON.parse(savedFavorites);
          setIsFavorited(favorites.includes(foundProduct.id));
        } catch (error) {
          console.error('Error loading favorites:', error);
        }
      }
    }
  }, [id, t]);

  if (!product) {
    return (
      <div className="product-detail">
        <div className="product-detail__loading">載入中...</div>
      </div>
    );
  }

  const handlePrevImage = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? product.images.length - 1 : prev - 1
    );
  };

  const handleNextImage = () => {
    setCurrentImageIndex((prev) =>
      prev === product.images.length - 1 ? 0 : prev + 1
    );
  };

  const handleAddToCart = async () => {
    if (!currentUser) {
      alert(t.login?.loginRequired || '請先登入才能加入購物車');
      navigate('/login');
      return;
    }

    const success = await addToCart(product, 1);
    if (success) {
      alert(`${product.name} ${t.messages.addedToCart}`);
    } else {
      alert(t.messages.addToCartFailed);
    }
  };

  const handleHeartClick = () => {
    if (!product) return;
    
    const newIsFavorited = !isFavorited;
    setIsFavorited(newIsFavorited);
    
    // Save to localStorage
    const savedFavorites = localStorage.getItem('favoriteProducts');
    let favorites: string[] = [];
    
    if (savedFavorites) {
      try {
        favorites = JSON.parse(savedFavorites);
      } catch (error) {
        console.error('Error parsing favorites:', error);
      }
    }
    
    if (newIsFavorited) {
      if (!favorites.includes(product.id)) {
        favorites.push(product.id);
      }
    } else {
      favorites = favorites.filter(id => id !== product.id);
    }
    
    localStorage.setItem('favoriteProducts', JSON.stringify(favorites));
  };

  return (
    <div className="product-detail">
      {/* Back Button */}
      <button className="product-detail__back-btn" onClick={() => navigate('/')}>
        {t.product.back}
      </button>

      {/* Image Carousel */}
      <div className="product-detail__carousel">
        <button
          className="product-detail__carousel-btn product-detail__carousel-btn--prev"
          onClick={handlePrevImage}
        >
          ‹
        </button>
        <div className="product-detail__image-container">
          <img
            src={product.images[currentImageIndex]}
            alt={product.name}
            className="product-detail__image"
          />
        </div>
        <button
          className="product-detail__carousel-btn product-detail__carousel-btn--next"
          onClick={handleNextImage}
        >
          ›
        </button>
        {product.images.length > 1 && (
          <div className="product-detail__dots">
            {product.images.map((_, index) => (
              <span
                key={index}
                className={`product-detail__dot ${
                  index === currentImageIndex ? 'active' : ''
                }`}
                onClick={() => setCurrentImageIndex(index)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Product Info */}
      <div className="product-detail__info">
        <div className="product-detail__header">
          <h1 className="product-detail__title">{product.name}</h1>
          <span className="product-detail__category-badge">
            {product.category === 'food' && t.product.categories.food}
            {product.category === 'toy' && t.product.categories.toy}
            {product.category === 'accessory' && t.product.categories.accessory}
            {product.category === 'brush' && '毛刷'}
          </span>
        </div>
        <p className="product-detail__price">¥{product.price}</p>
      </div>

      {/* Description */}
      <div className="product-detail__description">
        <h2 className="product-detail__section-title">{t.product.description}</h2>
        <p>{product.description}</p>
        <div className="product-detail__stock">
          {t.product.stock}: {product.stock > 0 ? `${product.stock}個` : t.product.outOfStock}
        </div>
      </div>

      {/* Reaction Preview */}
      <div className="product-detail__reaction">
        <ReactionPreview reactionType={product.reactionType} />
      </div>

      {/* Coffee Footer */}
      <div className="product-detail__footer">
        {/* Buy Button */}
        <button
          className="product-detail__buy-btn"
          onClick={handleAddToCart}
          disabled={product.stock === 0}
        >
          <img src="/images/buy_button.png" alt="Add to Cart" />
        </button>

        {/* Dog Heart Image */}
        <button
          className="product-detail__dog-heart"
          onClick={handleHeartClick}
          aria-label="Add to favorites"
        >
          <img src={isFavorited ? '/images/dog_heart_press_2.png' : '/images/dog_heart_press_1.png'} alt="heart" />
        </button>
      </div>
    </div>
  );
};
