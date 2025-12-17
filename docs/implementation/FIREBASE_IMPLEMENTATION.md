# Firebase Firestore 完整實現指南

## 📋 目錄

1. [系統架構](#系統架構)
2. [已實現功能](#已實現功能)
3. [數據模型](#數據模型)
4. [服務層 API](#服務層-api)
5. [使用方式](#使用方式)
6. [部署步驟](#部署步驟)
7. [後續擴展](#後續擴展)

---

## 🏗 系統架構

```
src/
├── libs/
│   └── firebase.ts              # Firebase 初始化配置
├── services/                     # 數據服務層
│   ├── userService.ts           # 用戶資料管理
│   ├── petService.ts            # 寵物狀態管理
│   ├── cartService.ts           # 購物車管理（含快取）
│   ├── orderService.ts          # 訂單管理
│   └── productService.ts        # 商品管理
├── hooks/                        # React Hooks
│   ├── useCart.ts               # 購物車 Hook
│   ├── usePet.ts                # 寵物 Hook
│   └── useOrders.ts             # 訂單 Hook
├── pages/                        # 頁面組件
│   ├── OrderPage.tsx            # 訂單確認頁面
│   ├── OrderSuccessPage.tsx     # 訂單成功頁面
│   └── MyOrdersPage.tsx         # 我的訂單頁面
└── contexts/
    └── AuthContext.tsx          # 認證狀態管理
```

---

## ✅ 已實現功能

### 1. 用戶認證
- ✅ Email/Password 登入
- ✅ Google OAuth 登入
- ✅ 自動創建用戶資料
- ✅ 用戶狀態持久化

### 2. 購物車系統
- ✅ 添加商品到購物車
- ✅ 更新商品數量
- ✅ 移除購物車商品
- ✅ localStorage 快取（5分鐘過期）
- ✅ Firestore 持久化
- ✅ 自動同步用戶購物車

### 3. 訂單系統
- ✅ 創建訂單
- ✅ 訂單狀態流程：pending → processing → shipped → completed / cancelled
- ✅ 訂單編號自動生成（格式：ORD-YYYYMMDD-XXXX）
- ✅ 訂單歷史查詢
- ✅ 訂單統計
- ✅ 取消訂單功能

### 4. 寵物系統
- ✅ 寵物狀態持久化
- ✅ 餵食、玩耍、梳理互動
- ✅ 統計數據追蹤
- ✅ 自動初始化寵物

### 5. 商品管理
- ✅ 商品列表查詢
- ✅ 按分類查詢
- ✅ 熱門商品排行
- ✅ 庫存管理
- ✅ 瀏覽計數

---

## 📊 數據模型

### Collection: `users`
```typescript
{
  userId: string;           // 文檔 ID（與 Auth UID 相同）
  email: string;
  displayName?: string;
  photoURL?: string;
  totalOrders: number;      // 總訂單數
  totalSpent: number;       // 總消費金額
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Collection: `userPets`
```typescript
{
  userId: string;           // 文檔 ID
  name: string;
  happiness: number;        // 0-100
  hunger: number;          // 0-100
  cleanliness: number;     // 0-100
  totalFed: number;        // 總餵食次數
  totalPlayed: number;     // 總玩耍次數
  totalBrushed: number;    // 總梳理次數
  lastInteraction: Timestamp;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

### Collection: `carts`
```typescript
{
  userId: string;           // 文檔 ID
  items: CartItem[];
  total: number;
  updatedAt: Timestamp;
}

interface CartItem {
  product: Product;
  quantity: number;
}
```

### Collection: `orders`
```typescript
{
  orderId: string;          // 文檔 ID（自動生成）
  userId: string;
  orderNumber: string;      // 訂單編號（ORD-YYYYMMDD-XXXX）
  status: OrderStatus;      // pending | processing | shipped | completed | cancelled
  items: OrderItem[];
  subtotal: number;
  tax: number;
  shipping: number;
  total: number;
  shippingAddress: Address;
  paymentMethod: 'credit_card' | 'cash_on_delivery';
  notes?: string;
  createdAt: Timestamp;
  updatedAt: Timestamp;
  completedAt?: Timestamp;
}
```

### Collection: `products`
```typescript
{
  id: string;               // 文檔 ID
  name: string;
  price: number;
  description: string;
  category: 'food' | 'toy' | 'accessory';
  images: string[];
  stock: number;
  salesCount: number;       // 銷售數量
  viewCount: number;        // 瀏覽次數
  isActive: boolean;
  reactionType: ReactionType;
  createdAt: Timestamp;
  updatedAt: Timestamp;
}
```

---

## 🔧 服務層 API

### userService.ts
```typescript
// 創建或更新用戶資料
createOrUpdateUser(userId: string, userData: Partial<UserProfile>): Promise<void>

// 獲取用戶資料
getUserProfile(userId: string): Promise<UserProfile | null>

// 更新訂單統計
updateUserOrderStats(userId: string, orderTotal: number): Promise<void>
```

### petService.ts
```typescript
// 獲取或創建寵物
getOrCreatePet(userId: string): Promise<UserPet>

// 餵食寵物
feedPet(userId: string): Promise<UserPet>

// 與寵物玩耍
playWithPet(userId: string): Promise<UserPet>

// 梳理寵物
brushPet(userId: string): Promise<UserPet>
```

### cartService.ts
```typescript
// 獲取購物車（含快取）
getCart(userId: string): Promise<FirestoreCart | null>

// 添加商品到購物車
addToCart(userId: string, product: Product, quantity: number): Promise<void>

// 更新商品數量
updateCartItemQuantity(userId: string, productId: string, quantity: number): Promise<void>

// 移除商品
removeCartItem(userId: string, productId: string): Promise<void>

// 清空購物車
clearCart(userId: string): Promise<void>
```

### orderService.ts
```typescript
// 創建訂單
createOrder(userId: string, orderData: CreateOrderData): Promise<string>

// 獲取訂單
getOrder(orderId: string): Promise<Order | null>

// 獲取用戶訂單
getUserOrders(userId: string, limitCount?: number): Promise<Order[]>

// 按狀態獲取訂單
getUserOrdersByStatus(userId: string, status: OrderStatus): Promise<Order[]>

// 更新訂單狀態
updateOrderStatus(orderId: string, status: OrderStatus): Promise<void>

// 取消訂單
cancelOrder(orderId: string): Promise<void>

// 訂單統計
getOrderStats(userId: string): Promise<OrderStats>
```

### productService.ts
```typescript
// 獲取所有商品
getAllProducts(): Promise<Product[]>

// 獲取單個商品
getProduct(productId: string): Promise<Product | null>

// 按分類獲取商品
getProductsByCategory(category: 'food' | 'toy' | 'accessory'): Promise<Product[]>

// 獲取熱門商品
getPopularProducts(limitCount?: number): Promise<Product[]>

// 更新庫存
updateProductStock(productId: string, quantitySold: number): Promise<void>

// 檢查庫存
checkProductStock(productId: string, quantity: number): Promise<boolean>
```

---

## 💻 使用方式

### 在組件中使用 Hooks

#### 購物車
```typescript
import { useCart } from '../hooks';

function MyComponent() {
  const { cart, addToCart, updateQuantity, removeItem, loading } = useCart();
  
  // 添加商品
  const handleAdd = async () => {
    await addToCart(product, 1);
  };
  
  return (
    <div>
      {loading ? 'Loading...' : `Items: ${cart.items.length}`}
    </div>
  );
}
```

#### 訂單
```typescript
import { useOrders } from '../hooks/useOrders';

function OrdersPage() {
  const { orders, stats, loading, cancelOrder } = useOrders();
  
  return (
    <div>
      <h2>總訂單：{stats.total}</h2>
      {orders.map(order => (
        <OrderCard key={order.orderId} order={order} />
      ))}
    </div>
  );
}
```

#### 寵物
```typescript
import { usePet } from '../hooks/usePet';

function PetRoom() {
  const { pet, feed, play, brush, loading } = usePet();
  
  return (
    <div>
      <button onClick={feed}>餵食</button>
      <button onClick={play}>玩耍</button>
      <button onClick={brush}>梳理</button>
    </div>
  );
}
```

---

## 🚀 部署步驟

### 1. 配置環境變量
確保 `.env` 文件已配置：
```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=petshop-6d16a
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
```

### 2. 部署 Firestore 安全規則
```bash
# 方法 1: 使用 Firebase Console
# 前往 https://console.firebase.google.com/
# 選擇專案 → Firestore Database → 規則 → 複製 firestore.rules 內容 → 發布

# 方法 2: 使用 Firebase CLI
firebase deploy --only firestore:rules
```

### 3. 初始化商品數據
目前商品數據是硬編碼在前端。後續需要：
1. 在 Firebase Console 創建 `products` collection
2. 手動添加商品數據，或使用腳本批量導入

### 4. 啟動應用
```bash
npm run dev
```

---

## 🎯 快取策略

### localStorage 快取
- **快取鍵**: `cart_cache_${userId}`
- **過期時間**: 5 分鐘（300,000 毫秒）
- **快取內容**: 購物車完整數據
- **優勢**: 減少 Firestore 讀取次數，降低成本

### 快取流程
```typescript
1. 檢查 localStorage 是否有快取
2. 檢查快取是否過期
3. 如果有效，返回快取數據
4. 如果無效，從 Firestore 讀取
5. 更新 localStorage 快取
```

---

## 🔮 後續擴展

### 短期計劃
- [ ] 從 Firestore 加載商品數據
- [ ] 新增用戶註冊功能
- [ ] 新增忘記密碼功能
- [ ] 實現訂單詳情頁面
- [ ] 添加訂單搜索功能

### 中期計劃
- [ ] 實現管理員後台
- [ ] 商品管理功能（CRUD）
- [ ] 訂單管理功能
- [ ] 數據統計儀表板
- [ ] 郵件通知系統

### 長期計劃
- [ ] 多語言完整支持
- [ ] 商品推薦系統
- [ ] 優惠券系統
- [ ] 會員等級制度
- [ ] 評價系統（可選）

---

## ⚠️ 注意事項

### 安全性
- ✅ Firestore 安全規則已配置
- ✅ 用戶只能訪問自己的數據
- ⚠️ 商品寫入權限已關閉（需管理員權限）

### 性能優化
- ✅ 購物車使用 localStorage 快取
- ✅ 訂單查詢限制數量（默認 50 筆）
- ✅ 使用複合索引優化查詢

### 成本控制
- 使用快取減少讀取次數
- 限制查詢結果數量
- 避免實時監聽（使用一次性查詢）

---

## 📞 支持

如有問題，請參考：
- [FIREBASE_SETUP.md](./FIREBASE_SETUP.md) - 基礎設置
- [FIRESTORE_RULES_GUIDE.md](./FIRESTORE_RULES_GUIDE.md) - 安全規則
- [Firebase 官方文檔](https://firebase.google.com/docs)

---

**版本**: 1.0.0  
**最後更新**: 2024
