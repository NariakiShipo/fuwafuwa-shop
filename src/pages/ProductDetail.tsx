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
  const [quantity, setQuantity] = useState(1);

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
        category: 'accessory',
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

    const success = await addToCart(product, quantity);
    if (success) {
      alert(`${product.name} ${t.messages.addedToCart}`);
    } else {
      alert(t.messages.addToCartFailed);
    }
  };

  const increaseQuantity = () => {
    if (quantity < product.stock) {
      setQuantity(quantity + 1);
    }
  };

  const decreaseQuantity = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
    }
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

      {/* Bottom Action Bar with Reaction Preview */}
      <div className="product-detail__action-bar">
        <div className="product-detail__reaction">
          <ReactionPreview reactionType={product.reactionType} />
        </div>

        <div className="product-detail__purchase">
          {/* Quantity Selector */}
          <div className="product-detail__quantity">
            <button
              className="product-detail__quantity-btn"
              onClick={decreaseQuantity}
              disabled={quantity <= 1}
            >
              <img src="/images/count_decrease.png" alt="-" className='product-detail__quantity-btn--decrease'/>
            </button>
            <span className="product-detail__quantity-value">{quantity}</span>
            <button
              className="product-detail__quantity-btn"
              onClick={increaseQuantity}
              disabled={quantity >= product.stock}
            >
              <img src="/images/count_increase.png" alt="+" className='product-detail__quantity-btn--increase'/>
            </button>
          </div>

          {/* Buy Button */}
          <button
            className="product-detail__buy-btn"
            onClick={handleAddToCart}
            disabled={product.stock === 0}
          >
            <img src="/images/buy_button.png" alt="Add to Cart" />
          </button>
        </div>
      </div>
    </div>
  );
};
