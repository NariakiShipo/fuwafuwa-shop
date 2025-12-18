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

```
fuwafuwa-shop/
├── 📄 配置文件
│   ├── firebase.json              # Firebase 部署設定
│   ├── firestore.rules            # Firestore 安全規則
│   ├── tsconfig.json              # TypeScript 配置
│   ├── vite.config.ts             # Vite 構建配置
│   ├── package.json               # 專案依賴
│   └── .env.example               # 環境變數範本
│
├── 📂 docs/                       # 項目文件
│   ├── PROJECT_STRUCTURE.md       # 詳細結構說明
│   ├── CHECKLIST.md               # 開發檢查清單
│   ├── GITHUB_UPLOAD_CHECKLIST.md # GitHub 上傳指南
│   ├── guides/                    # 指南文件
│   │   ├── FIREBASE_SETUP.md
│   │   ├── FIREBASE_CONFIG_GUIDE.md
│   │   ├── FIRESTORE_SETUP.md
│   │   ├── FIRESTORE_RULES_GUIDE.md
│   │   ├── VISUAL_GUIDE.md
│   │   └── QUICK_FIX.md
│   └── implementation/            # 實現文件
│
├── 📂 public/                     # 靜態資源
│   └── images/                    # 產品圖片 & 圖標
│
├── 📂 src/                        # 源代碼
│   ├── main.tsx                   # 應用入口
│   ├── App.tsx                    # 主應用組件
│   │
│   ├── 📂 assets/                 # 資源文件
│   │   └── styles/
│   │       └── globals.css        # 全局樣式 & CSS 變數
│   │
│   ├── 📂 components/             # 可復用組件
│   │   ├── Cart/
│   │   │   └── BasketVisualizer   # 購物車視覺化
│   │   ├── Common/
│   │   │   └── LanguageSwitcher   # 語言切換器
│   │   ├── Layout/
│   │   │   ├── NavigationBar      # 導航欄
│   │   │   └── SplitScreen        # 分屏布局
│   │   ├── Pet/
│   │   │   ├── PetRoom           # 寵物房間
│   │   │   └── ReactionPreview   # 反應預覽
│   │   └── Shop/
│   │       ├── ProductCard        # 產品卡片
│   │       └── ShopGrid           # 產品網格
│   │
│   ├── 📂 pages/                  # 頁面組件
│   │   ├── HomePage               # 首頁
│   │   ├── ProductDetail          # 產品詳情
│   │   ├── CartPage               # 購物車頁面
│   │   ├── LoginPage              # 登入頁面
│   │   ├── OrderPage              # 訂單頁面
│   │   ├── OrderSuccessPage       # 訂單成功頁面
│   │   ├── OrderDetailPage        # 訂單詳情頁面 ✨ NEW
│   │   └── MyOrdersPage           # 我的訂單頁面
│   │
│   ├── 📂 contexts/               # React Context
│   │   └── AuthContext            # 用戶認證上下文
│   │
│   ├── 📂 hooks/                  # 自定義 Hooks
│   │   ├── useCart                # 購物車邏輯
│   │   ├── useOrders              # 訂單邏輯
│   │   └── usePet                 # 寵物互動邏輯
│   │
│   ├── 📂 services/               # 業務邏輯服務
│   │   ├── productService         # 產品數據
│   │   ├── cartService            # 購物車操作
│   │   ├── orderService           # 訂單操作
│   │   ├── petService             # 寵物數據
│   │   └── userService            # 用戶數據
│   │
│   ├── 📂 i18n/                   # 多語言支援
│   │   ├── translations.ts        # 語言文本
│   │   └── LanguageContext        # 語言上下文
│   │
│   ├── 📂 libs/                   # 第三方庫配置
│   │   └── firebase.ts            # Firebase 初始化
│   │
│   └── 📂 types/                  # TypeScript 類型定義
│       └── index.ts               # 共享類型
│
└── 📂 reference/                  # 參考資料 (設計稿等)
```

### 核心模塊說明

| 模塊 | 功能 | 主要文件 |
|------|------|---------|
| **購物系統** | 商品瀏覽、購物車、結帳 | ProductCard, ShopGrid, CartPage, OrderPage |
| **訂單管理** | 訂單建立、追蹤、詳情查看 | orderService, MyOrdersPage, OrderDetailPage |
| **用戶系統** | 登入、認證、個人資料 | AuthContext, LoginPage, userService |
| **寵物互動** | 寵物飼養、互動反應 | PetRoom, usePet, petService |
| **多語言** | 中文/英文切換 | LanguageContext, translations.ts |
| **Firebase集成** | 認證、數據庫、部署 | firebase.ts, firestore.rules |

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
