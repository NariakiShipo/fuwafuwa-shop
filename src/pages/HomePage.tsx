import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SplitScreen } from '../components/Layout/SplitScreen';
import { PetRoom } from '../components/Pet/PetRoom';
import { ShopGrid } from '../components/Shop/ShopGrid';
import { Product } from '../types';
import { useLanguage } from '../i18n';
import './HomePage.css';

export const HomePage: React.FC = () => {
  const { t } = useLanguage();
  const navigate = useNavigate();
  
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

  const [products] = useState<Product[]>(sampleProducts);

  const handleProductClick = (product: Product) => {
    // 使用路由導航到商品詳情頁
    navigate(`/product/${product.id}`);
  };

  return (
    <div className="home-page">
      <SplitScreen
        topSection={<PetRoom />}
        bottomSection={
          <ShopGrid products={products} onProductClick={handleProductClick} />
        }
        topHeight="40%"
      />
    </div>
  );
};
