# 專案結構

```
petShop/
│
├── 📄 README.md                          # 專案概述・使用方法
├── 📄 IMPLEMENTATION.md                  # 實作詳細指南（繁體中文）
│
├── 📁 public/                            # 靜態檔案
│   └── images/                           # 圖片資源
│       ├── background.png                # 寵物房間背景
│       ├── ball.png                      # 球道具
│       ├── bow.png                       # 蝴蝶結商品
│       ├── brush.png                     # 刷子道具
│       ├── buy_button.png                # 購買按鈕圖片
│       ├── cage.png                      # 籠子裝飾
│       ├── can.png                       # 罐頭商品
│       ├── checkout.png                  # 結帳按鈕
│       ├── collar.png                    # 項圈商品
│       ├── count_decrease.png            # 數量減少按鈕
│       ├── count_increase.png            # 數量增加按鈕
│       ├── dog.png                       # 寵物角色（一般）
│       ├── dog_heart_press_1.png         # 寵物反應1
│       ├── dog_heart_press_2.png         # 寵物反應2
│       ├── dog_product_illustration.png  # 商品插圖
│       ├── electric_chicken_background.png
│       ├── expanded_item.png
│       ├── fuwa_title.png                # "FUWA FUWA"標題
│       ├── hat.png                       # 帽子商品
│       ├── introduce.png
│       ├── item_field.png
│       ├── product_field.png
│       ├── shop_item.png                 # 商店圖示
│       ├── shopping_cart.png             # 購物車
│       └── swipe_right.png
│
├── 📁 reference/                         # 設計參考圖片
│   ├── aminal-01.png                     # 首頁參考
│   ├── aminal-02.png                     # 商品詳情頁參考
│   └── aminal-03.png                     # 購物車頁面參考
│
└── 📁 src/                               # 原始碼
    │
    ├── 📄 App.tsx                        # 主要應用程式
    ├── 📄 App.css                        # 應用程式樣式
    │
    ├── 📁 assets/                        # 資源
    │   └── styles/
    │       └── globals.css               # 全域 CSS 變數・共用樣式
    │
    ├── 📁 types/                         # TypeScript 型別定義
    │   └── index.ts                      # Product, CartItem, ReactionType等
    │
    ├── 📁 hooks/                         # 自訂掛鉤
    │   ├── index.ts                      # 匯出
    │   └── useCart.ts                    # 購物車管理掛鉤
    │
    ├── 📁 components/                    # 元件
    │   │
    │   ├── index.ts                      # 所有元件匯出
    │   │
    │   ├── 📁 Layout/                    # 佈局相關
    │   │   ├── SplitScreen.tsx           # 上下分割佈局
    │   │   ├── SplitScreen.css
    │   │   ├── NavigationBar.tsx         # 導航欄
    │   │   └── NavigationBar.css
    │   │
    │   ├── 📁 Shop/                      # 商店相關
    │   │   ├── ProductCard.tsx           # 商品卡片
    │   │   ├── ProductCard.css
    │   │   ├── ShopGrid.tsx              # 商品網格
    │   │   └── ShopGrid.css
    │   │
    │   ├── 📁 Cart/                      # 購物車相關
    │   │   ├── BasketVisualizer.tsx      # 🌟 購物籃視覺化
    │   │   └── BasketVisualizer.css
    │   │
    │   └── 📁 Pet/                       # 寵物相關
    │       ├── PetRoom.tsx               # 寵物房間（互動功能）
    │       ├── PetRoom.css
    │       ├── ReactionPreview.tsx       # 🌟 反應預覽
    │       └── ReactionPreview.css
    │
    └── 📁 pages/                         # 頁面元件
        ├── index.ts                      # 匯出
        ├── HomePage.tsx                  # 首頁（分割視圖）
        ├── HomePage.css
        ├── ProductDetail.tsx             # 商品詳情頁
        ├── ProductDetail.css
        ├── CartPage.tsx                  # 購物車頁面
        └── CartPage.css
```

## 📊 檔案統計

### 元件數量
- **Layout**: 2 個元件 (SplitScreen, NavigationBar)
- **Shop**: 2 個元件 (ProductCard, ShopGrid)
- **Cart**: 1 個元件 (BasketVisualizer)
- **Pet**: 2 個元件 (PetRoom, ReactionPreview)
- **Pages**: 3 個頁面 (HomePage, ProductDetail, CartPage)

**總計**: 10 個元件 + 3 個頁面 = **13 個檔案**

### CSS檔案數
- 全域: 1 個檔案 (globals.css)
- 元件別: 12 個檔案

**總計**: **13 個 CSS 檔案**

### TypeScript檔案數
- App: 1 個檔案
- Types: 1 個檔案
- Hooks: 1 個檔案
- Components: 7 個檔案 (.tsx)
- Pages: 3 個檔案 (.tsx)
- Index files: 3 個檔案 (.ts)

**總計**: **16 個 TypeScript 檔案**

## 🎯 主要功能對應

### 參考圖片 → 實作檔案對應

#### aminal-01.png (首頁)
```
參考圖片的元素           實作檔案
├─ 上部40%區域    →   PetRoom.tsx
│  ├─ 標題        →   fuwa_title.png
│  ├─ 寵物        →   dog.png
│  └─ 按鈕        →   ball.png, brush.png, can.png
│
└─ 下部60%區域    →   ShopGrid.tsx
   ├─ 商品卡片    →   ProductCard.tsx
   └─ 網格        →   CSS Grid Layout
```

#### aminal-02.png (商品詳情)
```
參考圖片的元素           實作檔案
├─ 圖片輪播       →   ProductDetail.tsx (carousel section)
├─ 商品資訊       →   ProductDetail.tsx (info section)
├─ 說明文         →   ProductDetail.tsx (description)
└─ 下部欄         →   ProductDetail.tsx (action bar)
   ├─ 寵物反應    →   ReactionPreview.tsx ⭐
   ├─ 數量調整    →   count_increase/decrease.png
   └─ 購買按鈕    →   buy_button.png
```

#### aminal-03.png (購物車頁面)
```
參考圖片的元素           實作檔案
├─ 購物車列表     →   CartPage.tsx (items section)
├─ 總金額         →   CartPage.tsx (summary)
└─ 底部籃子       →   BasketVisualizer.tsx ⭐
   ├─ 購物車圖片  →   shopping_cart.png
   ├─ 散落商品    →   隨機配置演算法
   └─ 寵物        →   dog.png (固定位置)
```

## 🌟 特殊實作的細節

### BasketVisualizer (購物籃視覺化)
**檔案**: `src/components/Cart/BasketVisualizer.tsx`

**實作演算法**:
```typescript
// 1. 從購物車項目生成所有精靈圖
cartItems.forEach(item => {
  for (let i = 0; i < item.quantity; i++) {
    sprites.push({
      x: 15 + Math.random() * 50,      // 15-65%
      y: 20 + Math.random() * 40,      // 20-60%
      rotation: -15 + Math.random() * 30,  // -15°~+15°
      scale: 0.6 + Math.random() * 0.3     // 0.6~0.9
    });
  }
});

// 2. 使用 CSS transform 配置
<div style={{
  left: `${sprite.x}%`,
  top: `${sprite.y}%`,
  transform: `rotate(${sprite.rotation}deg) scale(${sprite.scale})`
}} />
```

### ReactionPreview (反應預覽)
**檔案**: `src/components/Pet/ReactionPreview.tsx`

**反應對應**:
```typescript
{
  hungry: { image: 'dog_heart_press_1.png', emoji: '🤤', text: '好餓喔！' },
  excited: { image: 'dog_heart_press_2.png', emoji: '✨', text: '好想玩！' },
  happy: { image: 'dog.png', emoji: '💖', text: '好開心！' }
}
```

### PetRoom (互動功能)
**檔案**: `src/components/Pet/PetRoom.tsx`

**互動流程**:
```
1. 點擊按鈕
   ↓
2. setCurrentAnimation(type)
   ↓
3. 寵物彈跳動畫
   ↓
4. 表情符號顯示（💖/✨/🤤）
   ↓
5. 2秒後自動重設
```

## 📦 依賴關係圖

```
App.tsx
├── HomePage
│   ├── SplitScreen
│   ├── PetRoom
│   └── ShopGrid
│       └── ProductCard
│
├── ProductDetail
│   └── ReactionPreview
│
└── CartPage
    └── BasketVisualizer
```

## 🎨 樣式系統

### CSS變數的階層
```css
globals.css (根目錄)
├── 色彩配色板 (8色)
├── 間距 (5級)
├── 圓角大小 (3級)
└── 字型設定

各元件.css
└── var(--color-xxx) 引用
```

### 顏色使用統計
- `--color-bg-cream`: 背景 (所有頁面)
- `--color-accent-orange`: 按鈕・邊框 (所有元件)
- `--color-border-orange`: 卡片邊框 (ProductCard 等)
- `--color-accent-red`: 價格顯示 (ProductCard, ProductDetail)

## 🚀 啟動流程

```
1. index.html
   ↓
2. src/index.tsx (入口點)
   ↓
3. App.tsx
   ├── 載入 globals.css
   ├── 初始化 useCart 掛鉤
   └── 初始視圖: HomePage
```

## 📝 命名規則

### 檔案命名
- **元件**: PascalCase (例: `ProductCard.tsx`)
- **樣式**: 對應的元件名稱 (例: `ProductCard.css`)
- **掛鉤**: camelCase with 'use' prefix (例: `useCart.ts`)
- **型別定義**: `index.ts` (專用於匯出)

### CSS 類別命名 (BEM格式)
```css
.component-name { }              /* Block */
.component-name__element { }     /* Element */
.component-name--modifier { }    /* Modifier */
```

範例:
```css
.product-card { }
.product-card__image { }
.product-card__image--large { }
```

## 🔗 Import路徑最佳化

透過 index.ts 檔案，可使用以下簡潔的 import:

```typescript
// 之前
import { ProductCard } from './components/Shop/ProductCard';
import { BasketVisualizer } from './components/Cart/BasketVisualizer';

// 之後 (使用 index.ts)
import { ProductCard, BasketVisualizer } from './components';
```

## 📈 擴展性的考量

### 新增頁面
1. 建立 `src/pages/NewPage.tsx`
2. 建立 `src/pages/NewPage.css`
3. 在 `src/pages/index.ts` 新增匯出
4. 在 `App.tsx` 新增路由

### 新增元件
1. 放置在適當的分類資料夾
2. 成對建立 `.tsx` 和 `.css`
3. 在 `src/components/index.ts` 新增匯出

### 新增型別定義
1. 在 `src/types/index.ts` 新增
2. 視需要擴充既有介面

---

此專案結構實現了兼具維護性與擴展性的
整齊程式碼基底 🎉
