# FUWA FUWA Pet Shop 🐶

可愛的寵物商店應用程式 - 具有互動功能的可愛寵物商店！

## 📋 專案概述

這個專案是一個具有可愛設計和互動功能的寵物商店網頁應用程式。
基於參考圖片（aminal-01.png、aminal-02.png、aminal-03.png）設計，採用溫暖的配色和圓角設計。

## 🎨 設計規範

### 色彩方案
- **主色調**: 暖黃色 (#FFE4B5) 和 橘色 (#E88D67)
- **點綴色**: 粉色 (#FFB6C1)、紅色 (#DC5F4F)
- **文字**: 褐色 (#5D4037)

### UI元素特徵
- 所有卡片和按鈕都是**大圓角**設計
- 使用粗體字營造可愛氛圍
- 陰影效果增加立體感

## 🏗️ 專案結構

```
src/
├── assets/
│   └── styles/
│       └── globals.css          # 全域 CSS 變數與樣式
├── components/
│   ├── Layout/
│   │   ├── SplitScreen.tsx      # 上下分割佈局
│   │   └── SplitScreen.css
│   ├── Shop/
│   │   ├── ProductCard.tsx      # 商品卡片
│   │   ├── ProductCard.css
│   │   ├── ShopGrid.tsx         # 商品網格
│   │   └── ShopGrid.css
│   ├── Cart/
│   │   ├── BasketVisualizer.tsx # 購物籃視覺效果
│   │   └── BasketVisualizer.css
│   └── Pet/
│       ├── PetRoom.tsx          # 寵物房間（互動功能）
│       ├── PetRoom.css
│       ├── ReactionPreview.tsx  # 寵物反應預覽
│       └── ReactionPreview.css
├── pages/
│   ├── HomePage.tsx             # 首頁（分割視圖）
│   ├── HomePage.css
│   ├── ProductDetail.tsx        # 商品詳情頁
│   ├── ProductDetail.css
│   ├── CartPage.tsx             # 購物車頁面
│   └── CartPage.css
├── hooks/
│   └── useCart.ts               # 購物車管理掛鉤
├── types/
│   └── index.ts                 # TypeScript 型別定義
├── App.tsx                      # 主要應用程式
└── App.css
```

## 🎯 主要功能

### 1. 首頁 - 分割視圖佈局
- **上部 (40%)**: 寵物房間
  - FUWA FUWA 標題顯示
  - 互動按鈕（刷子、球、食物）
  - 寵物的動畫反應
- **下部 (60%)**: 商品列表
  - 可捲動的網格佈局
  - 橘色邊框的商品卡片

### 2. 商品詳情頁
參考：`aminal-02.png`
- 圖片輪播（支援滑動）
- 商品資訊顯示
- 商品描述區塊
- **ReactionPreview**：寵物反應預覽
  - 根據商品類型變化表情
  - 提升購買意願的演出效果

### 3. 購物車頁面
參考：`aminal-03.png`
- **BasketVisualizer**：購物籃視覺化
  - 根據購物車商品數量動態渲染
  - 隨機配置產生「散落」效果
  - 寵物角色固定顯示在右側
  - 商品數量徽章顯示

## 🔧 技術規格

### 元件詳細

#### SplitScreen
```typescript
// 上下分割佈局容器
<SplitScreen
  topSection={<PetRoom />}
  bottomSection={<ShopGrid />}
  topHeight="40%" // 可自訂
/>
```

#### PhysicalCartVisualizer (BasketVisualizer)
```typescript
// 視覺化顯示購物車內的商品
<BasketVisualizer cartItems={cartItems} />
```
- 使用 CSS Positioning 實現隨機配置
- 每個商品透過旋轉和縮放變換產生變化
- 動畫效果呈現商品投入的演出

#### ReactionPreview
```typescript
// 根據商品類型顯示寵物的反應
<ReactionPreview reactionType={product.reactionType} />
```
- reactionType: 'hungry' | 'excited' | 'happy' | 'curious' | 'neutral'
- 顯示對應的圖片和對話框文字

### 型別定義擴充
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'food' | 'toy' | 'accessory';
  images: string[];
  reactionType: ReactionType; // ← 新增
  stock: number;
}
```

## 🎮 使用方法

### 在開發環境中執行
```bash
# 安裝依賴套件
npm install

# 啟動開發伺服器
npm start

# 建置專案
npm run build
```

### 自訂設定

#### 變更配色方案
[src/assets/styles/globals.css](src/assets/styles/globals.css) 編輯 CSS 變數：
```css
:root {
  --color-bg-cream: #FFE4B5;
  --color-accent-orange: #E88D67;
  /* ... 其他顏色 */
}
```

#### 新增商品資料
編輯 [src/pages/HomePage.tsx](src/pages/HomePage.tsx) 的 `sampleProducts` 陣列：
```typescript
const newProduct: Product = {
  id: '7',
  name: '新商品',
  price: 1500,
  category: 'toy',
  images: ['/images/new-item.png'],
  reactionType: 'excited',
  stock: 10,
};
```

## 📁 圖片資源

使用的圖片需放置於 `public/images/` 目錄：
- `background.png` - 寵物房間的背景
- `ball.png`, `brush.png`, `can.png` - 互動道具
- `dog.png` - 寵物角色
- `dog_heart_press_1.png`, `dog_heart_press_2.png` - 反應圖片
- `shopping_cart.png` - 購物籃
- `buy_button.png`, `checkout.png` - 動作按鈕
- 其他商品圖片

## 🌟 特色實作

### 1. 隨機配置演算法（BasketVisualizer）
購物籃內的商品呈現視覺上「散落」的效果：
```typescript
const x = 15 + Math.random() * 50; // 15% to 65%
const y = 20 + Math.random() * 40; // 20% to 60%
const rotation = -15 + Math.random() * 30; // -15deg to 15deg
const scale = 0.6 + Math.random() * 0.3; // 0.6 to 0.9
```

### 2. 動畫效果
- 寵物的彈跳動畫
- 卡片 hover 時的浮起效果
- 按鈕的縮放變換
- 新增商品時的掉落動畫

### 3. 響應式設計
- 支援行動裝置、平板和桌面
- 網格佈局自動調整
- 支援觸控操作

## 🎨 與參考圖片的對應

- **aminal-01.png**: [src/pages/HomePage.tsx](src/pages/HomePage.tsx) - 分割視圖佈局
- **aminal-02.png**: [src/pages/ProductDetail.tsx](src/pages/ProductDetail.tsx) - 含反應的商品詳情
- **aminal-03.png**: [src/components/Cart/BasketVisualizer.tsx](src/components/Cart/BasketVisualizer.tsx) - 購物車視覺化

## 🚀 未來擴充計畫

- [ ] 寵物狀態管理（快樂度、飢餓度、能量）
- [ ] 使用本地儲存持久化購物車
- [ ] 實作付款功能
- [ ] 使用者認證
- [ ] 收藏功能
- [ ] 商品搜尋與篩選
- [ ] 多語言支援

## 📝 授權

本專案為範例專案。

---

用 💖 為 FUWA FUWA Pet Shop 製作
