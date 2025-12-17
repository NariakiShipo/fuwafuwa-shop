# Firebase 配置指南

## 🔥 Firebase Authentication 已整合完成！

您的寵物商店應用程式現在已經整合了 Firebase Authentication。

## ⚙️ 需要完成的配置步驟

### 1. 取得 Firebase 配置資訊

前往 [Firebase Console](https://console.firebase.google.com/)：

1. 選擇您的專案：`petshop-6d16a`
2. 點擊左側選單的「齒輪」圖示 → 「專案設定」
3. 在「一般」頁籤中，向下滾動到「您的應用程式」區域
4. 如果還沒有 Web 應用程式，點擊「新增應用程式」，選擇「Web」圖示
5. 註冊應用程式後，複製 `firebaseConfig` 物件

### 2. 更新 Firebase 配置文件

開啟 `src/libs/firebase.ts`，將以下資訊更新為您從 Firebase Console 複製的值：

```typescript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // 從 Firebase Console 複製
  authDomain: "petshop-6d16a.firebaseapp.com",
  projectId: "petshop-6d16a",
  storageBucket: "petshop-6d16a.firebasestorage.app",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // 從 Firebase Console 複製
  appId: "YOUR_APP_ID"                 // 從 Firebase Console 複製
};
```

### 3. 啟用 Firebase Authentication

在 Firebase Console 中：

1. 點擊左側選單的「Authentication」
2. 點擊「開始使用」（如果是第一次使用）
3. 選擇「Sign-in method」頁籤
4. 啟用以下登入方式：
   - ✅ **電子郵件/密碼** - 點擊啟用並儲存
   - ✅ **Google** - 點擊啟用，設定支援電子郵件，然後儲存

### 4. 設定授權網域

在 Firebase Console 的 Authentication → Settings → Authorized domains：

確保以下網域已加入授權清單：
- `localhost`
- 您的部署網域（如果有的話）

## 🎯 功能說明

### 已實作的功能

✅ **電子郵件登入** - 使用電子郵件和密碼登入
✅ **Google 登入** - 使用 Google 帳號快速登入
✅ **用戶狀態管理** - 自動追蹤登入狀態
✅ **登出功能** - 完整的登出流程
✅ **錯誤處理** - 完善的錯誤訊息顯示
✅ **多語言支援** - 中英文錯誤訊息
✅ **載入狀態** - 登入過程中的視覺回饋

### 用戶介面

- **導航欄**：
  - 未登入：顯示「👤」登入按鈕
  - 已登入：顯示用戶名稱和登出按鈕
  
- **登入頁面**：
  - 電子郵件和密碼輸入
  - Google 登入按鈕
  - 錯誤訊息顯示
  - 載入狀態指示

## 📝 測試步驟

### 方式 1：使用 Firebase Console 創建測試用戶

1. 前往 Firebase Console → Authentication → Users
2. 點擊「Add user」
3. 輸入測試用的電子郵件和密碼
4. 在應用程式中使用這些憑證登入

### 方式 2：啟用新用戶註冊（可選）

您可以創建一個註冊頁面，使用 `useAuth` hook 中的 `signup` 函數：

```typescript
const { signup } = useAuth();

// 在註冊表單中調用
await signup(email, password, displayName);
```

## 🔒 安全性注意事項

⚠️ **重要**：
- `src/i18n/secrets/` 目錄中的 Admin SDK 金鑰 **不應該在客戶端使用**
- Admin SDK 金鑰只用於後端服務器操作
- 客戶端使用的是 `src/libs/firebase.ts` 中的 Web 配置
- 請確保將 `secrets/` 目錄加入 `.gitignore`

## 📁 文件結構

```
src/
├── libs/
│   └── firebase.ts           # Firebase 初始化和配置
├── contexts/
│   └── AuthContext.tsx       # 認證上下文和 hooks
├── pages/
│   └── LoginPage.tsx         # 登入頁面組件
└── App.tsx                   # 整合 AuthProvider
```

## 🚀 下一步

1. 更新 `src/libs/firebase.ts` 中的配置
2. 在 Firebase Console 啟用 Authentication
3. 測試登入功能
4. （可選）創建註冊頁面
5. （可選）添加密碼重置功能
6. （可選）添加電子郵件驗證

## 💡 API 使用範例

```typescript
import { useAuth } from './contexts/AuthContext';

function MyComponent() {
  const { currentUser, login, logout, loginWithGoogle } = useAuth();
  
  // 檢查登入狀態
  if (currentUser) {
    console.log('User:', currentUser.email);
  }
  
  // 登入
  await login(email, password);
  
  // Google 登入
  await loginWithGoogle();
  
  // 登出
  await logout();
}
```

## 📞 需要幫助？

如果遇到任何問題：
1. 檢查瀏覽器控制台的錯誤訊息
2. 確認 Firebase 配置是否正確
3. 確認 Authentication 功能已在 Firebase Console 啟用
4. 檢查授權網域設定

---

✨ Firebase Authentication 整合完成！現在您可以開始測試登入功能了。
