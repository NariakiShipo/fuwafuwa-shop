# 🐾 FUWA FUWA Pet Shop

可愛的寵物商店網站，結合互動式寵物系統和完整的電商功能。

## ✨ 功能特色

- 🐕 **互動式寵物系統** - 與可愛的寵物互動，餵食、玩耍
- 🛒 **完整購物車** - 商品瀏覽、加入購物車、結帳
- 📦 **訂單管理** - 訂單追蹤、歷史記錄
- 🔐 **用戶認證** - Firebase Authentication
- 🌐 **多語言支援** - 中文/英文切換
- 📱 **響應式設計** - 支援各種裝置

## 🚀 快速開始

### 環境需求

- Node.js 16+
- npm 或 yarn

### 安裝步驟

1. **Clone 專案**
   ```bash
   git clone https://github.com/your-username/petShop.git
   cd petShop
   ```

2. **安裝相依套件**
   ```bash
   npm install
   ```

3. **設定環境變數**
   ```bash
   cp .env.example .env
   # 編輯 .env，填入您的 Firebase 配置
   ```

4. **啟動開發伺服器**
   ```bash
   npm run dev
   ```

5. **開啟瀏覽器**
   ```
   http://localhost:5173
   ```

## 📚 文件

詳細文件請查看 [docs](docs/) 資料夾：

- 📖 [專案結構說明](docs/PROJECT_STRUCTURE.md)
- 🔧 [Firebase 設定指南](docs/guides/FIREBASE_SETUP.md)
- 📋 [開發檢查清單](docs/CHECKLIST.md)
- 📤 [GitHub 上傳指南](docs/GITHUB_UPLOAD_CHECKLIST.md)
- 📝 [完整文件索引](docs/README.md)

## 🛠️ 技術棧

- **前端框架**: React 18 + TypeScript
- **建構工具**: Vite
- **樣式**: CSS Modules
- **後端服務**: Firebase
  - Authentication (用戶認證)
  - Firestore (資料庫)
- **路由**: React Router v6
- **狀態管理**: React Hooks + Context

## 📁 專案結構

/Users/nariaki/Desktop/web/fuwafuwa-shop/
├───.env.example
├───.gitignore
├───firebase.json
├───firestore.rules
├───index.html
├───package-lock.json
├───package.json
├───README.md
├───tsconfig.json
├───tsconfig.node.json
├───vite.config.ts
├───.git/...
├───docs/
│   ├───CHECKLIST.md
│   ├───GITHUB_UPLOAD_CHECKLIST.md
│   ├───INDEX_JP.md
│   ├───INDEX.md
│   ├───PROJECT_STRUCTURE.md
│   ├───README_OLD.md
│   ├───README.md
│   ├───STRUCTURE_CLEANUP.md
│   ├───guides/
│   │   ├───FIREBASE_CONFIG_GUIDE.md
│   │   ├───FIREBASE_SETUP.md
│   │   ├───FIRESTORE_RULES_GUIDE.md
│   │   ├───FIRESTORE_SETUP.md
│   │   ├───QUICK_FIX.md
│   │   └───VISUAL_GUIDE.md
│   └───implementation/
│       ├───FIREBASE_IMPLEMENTATION.md
│       ├───IMPLEMENTATION_COMPLETE.md
│       ├───IMPLEMENTATION_JP.md
│       └───IMPLEMENTATION.md
├───node_modules/...
├───public/
│   └───images/
│       ├───background.png
│       ├───ball.png
│       ├───bow.png
│       ├───brush.png
│       ├───buy_button.png
│       ├───cage.png
│       ├───can.png
│       ├───checkout.png
│       ├───collar.png
│       ├───count_decrease.png
│       ├───count_increase.png
│       ├───dog_heart_press_1.png
│       ├───dog_heart_press_2.png
│       ├───dog_product_illustration.png
│       ├───dog.png
│       ├───electric_chicken_background.png
│       ├───expanded_item.png
│       ├───fuwa_title.png
│       ├───hat.png
│       ├───introduce.png
│       ├───item_field.png
│       ├───product_field.png
│       ├───shop_item.png
│       ├───shopping_cart.png
│       ├───shopping-cart-icon.png
│       └───swipe_right.png
├───reference/
│   ├───aminal-01.png
│   ├───aminal-02.png
│   └───aminal-03.png
└───src/
    ├───App.css
    ├───App.tsx
    ├───main.tsx
    ├───vite-env.d.ts
    ├───assets/
    │   └───styles/
    │       └───globals.css
    ├───components/
    │   ├───index.ts
    │   ├───Cart/
    │   │   ├───BasketVisualizer.css
    │   │   └───BasketVisualizer.tsx
    │   ├───Common/
    │   │   ├───LanguageSwitcher.css
    │   │   └───LanguageSwitcher.tsx
    │   ├───Layout/
    │   │   ├───NavigationBar.css
    │   │   ├───NavigationBar.tsx
    │   │   ├───SplitScreen.css
    │   │   └───SplitScreen.tsx
    │   ├───Pet/
    │   │   ├───PetRoom.css
    │   │   ├───PetRoom.tsx
    │   │   ├───ReactionPreview.css
    │   │   └───ReactionPreview.tsx
    │   └───Shop/
    │       ├───ProductCard.css
    │       ├───ProductCard.tsx
    │       ├───ShopGrid.css
    │       └───ShopGrid.tsx
    ├───contexts/
    │   └───AuthContext.tsx
    ├───hooks/
    │   ├───index.ts
    │   ├───useCart.ts
    │   ├───useOrders.ts
    │   └───usePet.ts
    ├───i18n/
    │   ├───index.ts
    │   ├───LanguageContext.tsx
    │   ├───translations.ts
    │   └───secrets/
    ├───libs/
    │   └───firebase.ts
    ├───pages/
    │   ├───CartPage.css
    │   ├───CartPage.tsx
    │   ├───HomePage.css
    │   ├───HomePage.tsx
    │   ├───index.ts
    │   ├───LoginPage.css
    │   ├───LoginPage.tsx
    │   ├───MyOrdersPage.css
    │   ├───MyOrdersPage.tsx
    │   ├───OrderPage.css
    │   ├───OrderPage.tsx
    │   ├───OrderSuccessPage.css
    │   ├───OrderSuccessPage.tsx
    │   ├───ProductDetail.css
    │   └───ProductDetail.tsx
    ├───services/
    │   ├───cartService.ts
    │   ├───orderService.ts
    │   ├───petService.ts
    │   ├───productService.ts
    │   └───userService.ts
    └───types/
        └───index.ts

## 🔑 環境變數

複製 `.env.example` 為 `.env` 並填入以下值：

```env
VITE_FIREBASE_API_KEY=your-api-key
VITE_FIREBASE_AUTH_DOMAIN=your-auth-domain
VITE_FIREBASE_PROJECT_ID=your-project-id
VITE_FIREBASE_STORAGE_BUCKET=your-storage-bucket
VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
VITE_FIREBASE_APP_ID=your-app-id
VITE_FIREBASE_MEASUREMENT_ID=your-measurement-id
```

從 [Firebase Console](https://console.firebase.google.com) 取得這些值。

## 🔒 安全性

- ✅ Firebase API keys 使用環境變數管理
- ✅ Firestore 安全規則已配置
- ✅ 用戶資料權限控制
- ✅ `.env` 檔案已加入 .gitignore

## 🚢 部署

### Vercel / Netlify

1. 連接 GitHub repository
2. 設定環境變數
3. 部署完成！

### Firebase Hosting

```bash
npm run build
firebase deploy
```

## 📝 開發指令

```bash
npm run dev          # 啟動開發伺服器
npm run build        # 建構生產版本
npm run preview      # 預覽生產版本
```

## 🎨 設計規範

- **色彩方案**: 暖黃色、橘色、粉色
- **UI 風格**: 大圓角、可愛風格
- **字體**: 粗體、溫暖感

詳細設計規範請參考 [docs/guides/VISUAL_GUIDE.md](docs/guides/VISUAL_GUIDE.md)

## 📞 聯絡方式

如有問題，請開啟 [Issue](https://github.com/your-username/petShop/issues)

---

**Made with ❤️ for pet lovers**
