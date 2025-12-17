# FUWA FUWA Pet Shop 實作指南

## 🎉 實作完成！

所有要求的功能和元件已實作完成。

## 📦 已實作的主要元件

### 1. 佈局系統

#### SplitScreen.tsx
- 將畫面上下分割的佈局容器
- 預設設定為上部 40%、下部 60%
- 高度比例可自訂

### 2. 寵物相關元件

#### PetRoom.tsx（首頁上部）
**實作內容：**
- ✅ 顯示 "FUWA FUWA" 標題
- ✅ 互動按鈕（刷子、球、食物）
- ✅ 點擊時的寵物動畫
- ✅ 反應表情符號顯示（💖、✨、🤤）
- ✅ 背景圖片和籠子的配置

**互動功能：**
```typescript
// 點擊按鈕 → 寵物彈跳 → 2 秒後重設
handleInteraction('happy') // 💖
handleInteraction('excited') // ✨
handleInteraction('hungry') // 🤤
```

#### ReactionPreview.tsx（商品詳情頁）
**實作內容：**
- ✅ 根據商品類型切換寵物表情
- ✅ 對話框形式的訊息顯示
- ✅ 動畫效果（彈跳、脈動）

**反應類型對應表：**
| reactionType | 表情 | 訊息 |
|--------------|------|------------|
| hungry       | 🤤   | 好餓喔！ |
| excited      | ✨   | 好想玩！   |
| happy        | 💖   | 好開心！     |
| curious      | 👀   | 好奇妙！   |
| neutral      | 😊   | 不錯喔！     |

### 3. 商店相關元件

#### ProductCard.tsx
**實作內容：**
- ✅ 橘色的粗邊框（3px border）
- ✅ 較大的圓角設計（24px border-radius）
- ✅ 分類徽章（🍖食物、🎾玩具、🎀配件）
- ✅ 滑鼠移入時的浮起效果
- ✅ 漸層背景

#### ShopGrid.tsx
**實作內容：**
- ✅ 響應式網格佈局
- ✅ "SHOP" 標頭
- ✅ 可捲動的容器

### 4. 購物車相關元件

#### BasketVisualizer.tsx ⭐ （參考：aminal-03.png）
**實作內容：**
- ✅ 購物車內商品的視覺化顯示
- ✅ **隨機配置演算法**
  - X 座標：15%～65% 範圍隨機
  - Y 座標：20%～60% 範圍隨機
  - 旋轉：-15°～+15° 隨機旋轉
  - 縮放：0.6～0.9 隨機大小
- ✅ 寵物角色固定顯示於右側
- ✅ 商品數量徽章顯示
- ✅ 寵物的反應表情（商品多時顯示 😍）
- ✅ 新增商品時的掉落動畫

**視覺效果的原理：**
```typescript
// 為每個商品項目計算隨機配置
itemSprites.map(sprite => ({
  x: 15 + Math.random() * 50,      // 散落效果
  y: 20 + Math.random() * 40,
  rotation: -15 + Math.random() * 30, // 傾斜
  scale: 0.6 + Math.random() * 0.3    // 大小變化
}))
```

## 📄 頁面實作

### HomePage.tsx（參考：aminal-01.png）
**佈局：**
```
┌─────────────────────────┐
│  PetRoom (40%)          │ ← 互動區域
│  - FUWA FUWA 標題    │
│  - 寵物角色         │
│  - 操作按鈕            │
├─────────────────────────┤
│  ShopGrid (60%)         │ ← 可捲動
│  ┌───┬───┬───┬───┐     │
│  │🎾 │🍖 │🎀 │🖌️  │     │
│  ├───┼───┼───┼───┤     │
│  │🎩 │⚾ │📿 │   │     │
│  └───┴───┴───┴───┘     │
└─────────────────────────┘
```

### ProductDetail.tsx（參考：aminal-02.png）
**組成：**
1. 返回按鈕
2. 圖片輪播（支援滑動）
3. 商品資訊卡片
4. 商品描述區塊
5. **底部固定欄：**
   - ReactionPreview（寵物反應）
   - 數量調整按鈕
   - 加入購物車按鈕

### CartPage.tsx（參考：aminal-03.png）
**組成：**
1. 標頭（返回按鈕＋標題）
2. 購物車商品列表
3. 小計、結帳按鈕
4. **BasketVisualizer（底部固定）** ← 重要！

## 🎨 CSS 變數和設計系統

### 全域色彩配色板
```css
:root {
  /* 主色調 */
  --color-bg-cream: #FFE4B5;        /* 背景暖黃色 */
  --color-bg-light-cream: #FFF5E6;  /* 淺奶油色 */
  --color-accent-orange: #E88D67;   /* 橘色 */
  --color-accent-red: #DC5F4F;      /* 紅色 */
  --color-accent-pink: #FFB6C1;     /* 粉紅色 */
  --color-text-brown: #5D4037;      /* 文字棕色 */
  --color-border-orange: #FF9966;   /* 邊框橘色 */
  
  /* 圓角大小 */
  --border-radius-large: 24px;      /* 卡片 */
  --border-radius-medium: 16px;     /* 按鈕 */
  --border-radius-small: 12px;      /* 小元素 */
}
```

### 設計原則
1. **所有卡片**：3px 粗邊框 + 24px 圓角
2. **所有按鈕**：16px 圓角 + 滑鼠移入效果
3. **配色方案**：暖色系（黃→橘→紅）
4. **字型**：粗體（bold: 700）營造可愛氛圍

## 🔧 自訂掛鉤

### useCart.ts
**提供的功能：**
- `addToCart(product, quantity)` - 加入購物車
- `updateQuantity(productId, quantity)` - 更新數量
- `removeItem(productId)` - 刪除商品
- `clearCart()` - 清空購物車
- `getItemCount()` - 取得總商品數

**使用範例：**
```typescript
const { cart, addToCart, updateQuantity } = useCart();

// 新增商品
addToCart(product, 2);

// 購物車內容
cart.items // CartItem[]
cart.total // 總金額
```

## 📊 型別定義

### Product 型別的擴充
```typescript
interface Product {
  id: string;
  name: string;
  price: number;
  description: string;
  category: 'food' | 'toy' | 'accessory';
  images: string[];
  reactionType: ReactionType;  // ← 新增！
  stock: number;
}
```

### ReactionType
```typescript
type ReactionType = 
  | 'hungry'    // 食物 → 流口水
  | 'excited'   // 玩具 → 興奮
  | 'happy'     // 一般 → 開心
  | 'curious'   // 新商品 → 好奇
  | 'neutral';  // 預設
```

## 🎯 参考画像との対応表

| 参考画像 | 実装ファイル | 主要機能 |
|----------|-------------|---------|
| aminal-01.png | [HomePage.tsx](src/pages/HomePage.tsx) | Split view、PetRoom、ShopGrid |
| aminal-02.png | [ProductDetail.tsx](src/pages/ProductDetail.tsx) | ReactionPreview、購入UI |
| aminal-03.png | [BasketVisualizer.tsx](src/components/Cart/BasketVisualizer.tsx) | 購物籃視覺效果 |

## 🚀 実行方法

### 1. 必要なパッケージ
このプロジェクトはReact + TypeScriptを使用します。

必要なパッケージ:
```json
{
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "typescript": "^5.0.0"
  }
}
```

### 2. 入口點設定
建立 `src/index.tsx` 或 `src/main.tsx`：
```typescript
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
```

### 3. HTML 模板
`public/index.html`：
```html
<!DOCTYPE html>
<html lang="zh-TW">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>FUWA FUWA Pet Shop</title>
</head>
<body>
  <div id="root"></div>
</body>
</html>
```

## 🎨 動畫列表

### 寵物動畫
- `petBounce`：跳躍動作（0.5s）
- `petWiggle`：左右搖擺（2s、無限循環）

### UI 動畫
- `reactionPop`：反應表情符號的出現（0.5s）
- `itemDrop`：購物車商品的掉落（0.5s）
- `badgePulse`：徽章的脈動（2s、無限循環）
- `imageZoomIn`：圖片的縮放（0.3s）

## 💡 實作要點

### 1. BasketVisualizer 的隨機配置
**挑戰**：物理引擎太重  
**解決**：使用 CSS Positioning 和 Math.random() 實現輕量化

```typescript
// 為每個商品應用隨機配置
const sprites = cartItems.map(item => ({
  x: 15 + Math.random() * 50,  // % 單位
  y: 20 + Math.random() * 40,
  rotation: -15 + Math.random() * 30,  // deg
  scale: 0.6 + Math.random() * 0.3
}));
```

### 2. ReactionPreview 的條件分支
將商品分類與 reactionType 連結：
```typescript
const getReactionByCategory = (category: string): ReactionType => {
  switch(category) {
    case 'food': return 'hungry';
    case 'toy': return 'excited';
    default: return 'happy';
  }
};
```

### 3. Split View 的響應式對應
```css
.split-screen__top {
  height: 40vh;  /* 手機版 */
}

@media (min-width: 768px) {
  .split-screen__top {
    height: 40%;  /* 桌面版 */
  }
}
```

## 📁 檔案配置的重要性

### 圖片檔案的配置
所有圖片需放置於 `public/images/` 目錄：
```
public/
└── images/
    ├── background.png
    ├── ball.png
    ├── brush.png
    ├── can.png
    ├── dog.png
    ├── dog_heart_press_1.png
    ├── dog_heart_press_2.png
    ├── shopping_cart.png
    ├── buy_button.png
    ├── checkout.png
    └── ... (其他商品圖片)
```

### CSS 引入順序
```typescript
// App.tsx
import './assets/styles/globals.css';  // 1. 全域樣式
import './App.css';                    // 2. 元件樣式
```

## 🎉 完成的元件列表

✅ **佈局**
- SplitScreen

✅ **寵物元件**
- PetRoom（含互動功能）
- ReactionPreview（反應系統）

✅ **商店元件**
- ProductCard（可愛設計）
- ShopGrid（響應式網格）

✅ **購物車元件**
- BasketVisualizer（隨機配置視覺效果）

✅ **頁面**
- HomePage（分割視圖）
- ProductDetail（含反應預覽）
- CartPage（購物籃視覺化）

✅ **掛鉤**
- useCart（購物車管理）

✅ **型別**
- Product（已擴充 reactionType）
- CartItem
- ReactionType

## 🌟 現在就可使用！

所有實作已完成。
每個元件都可獨立運作，且易於自訂。

Happy Coding! 🐶💖
