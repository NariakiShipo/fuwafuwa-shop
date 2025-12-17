# 📋 上傳到 GitHub 前的檢查清單

## ✅ 已處理的項目

### 1. 環境變數保護
- ✅ `.env` - **已加入 .gitignore**（包含 Firebase API keys）
- ✅ `.env.example` - 保留為範本，不包含真實數據
- ✅ `src/libs/firebase.ts` - 已改用環境變數

### 2. 自動忽略的檔案
以下檔案已在 `.gitignore` 中設定，不會上傳：

#### 開發相關
- `node_modules/` - npm 套件
- `dist/` - 編譯輸出
- `build/` - 建構輸出
- `.cache/` - 快取檔案

#### 環境變數
- `.env` - 本地環境變數（包含真實 API keys）
- `.env.local`
- `.env.development.local`
- `.env.test.local`
- `.env.production.local`

#### Debug 資料夾
- `debug/` - 除錯文件（包含敏感資訊）
- `secrets/` - 密鑰資料夾

#### 編輯器設定
- `.vscode/` - VS Code 設定
- `.idea/` - JetBrains IDE 設定
- `.DS_Store` - macOS 系統檔案

#### Firebase
- `.firebase/` - Firebase 本地快取
- `.firebaserc` - Firebase 專案設定
- `firebase-debug.log` - Firebase 除錯日誌

### 3. 保留的檔案
以下檔案會上傳到 GitHub：

#### 配置檔案
- ✅ `package.json` - npm 相依性
- ✅ `package-lock.json` - 鎖定版本
- ✅ `tsconfig.json` - TypeScript 配置
- ✅ `tsconfig.node.json` - Node TypeScript 配置
- ✅ `vite.config.ts` - Vite 配置
- ✅ `firebase.json` - Firebase 配置（不含敏感資訊）
- ✅ `firestore.rules` - Firestore 安全規則

#### 範本檔案
- ✅ `.env.example` - 環境變數範本（不含真實值）

#### 原始碼
- ✅ `src/` - 所有原始碼
- ✅ `public/` - 公開資源
- ✅ `index.html` - HTML 入口

#### 文件
- ✅ `README.md` - 專案說明
- ✅ 其他 .md 文件（如果需要）

---

## 🔒 Firebase API Key 是否安全？

### ⚠️ 重要說明

Firebase 的 **Web API Key** 設計上是**可以公開的**，因為：

1. **權限由 Firestore Rules 控制**
   - 真正的安全由 `firestore.rules` 保證
   - 即使有 API Key，沒有正確權限也無法存取資料

2. **已部署的 Firestore Rules**
   ```javascript
   // 只有登入用戶才能存取自己的資料
   match /carts/{userId} {
     allow read, write: if request.auth != null && request.auth.uid == userId;
   }
   ```

### ✅ 最佳實踐

雖然 API Key 可以公開，但使用環境變數仍是最佳實踐：
- ✅ 方便在不同環境切換
- ✅ 符合業界標準
- ✅ 避免意外洩露其他敏感資訊

---

## 📝 上傳前的最後步驟

### 1. 檢查 Git 狀態
```bash
git status
```

### 2. 確認 .env 未被追蹤
```bash
git status | grep .env
# 應該只看到 .env.example，不應該有 .env
```

### 3. 檢查敏感檔案
```bash
# 確認這些檔案被忽略
ls -la | grep -E "^\.(env|firebase|DS_Store)"
```

### 4. 初始化 Git（如果尚未初始化）
```bash
git init
git add .
git commit -m "Initial commit: Pet Shop project"
```

### 5. 建立 GitHub Repository 並推送
```bash
# 在 GitHub 建立 repository 後
git remote add origin https://github.com/your-username/petShop.git
git branch -M main
git push -u origin main
```

---

## ⚠️ 檢查清單

上傳前請確認：

- [ ] `.env` 檔案**不在** git 追蹤中
- [ ] `debug/` 資料夾被忽略
- [ ] `node_modules/` 被忽略
- [ ] Firebase API keys 從環境變數讀取
- [ ] `.env.example` 不包含真實數據
- [ ] Firestore 安全規則已部署到 Firebase
- [ ] README.md 已更新（如需要）

---

## 🎯 完成！

所有敏感檔案已被保護，您可以安全地上傳到 GitHub 了！

### 注意事項：

1. **其他開發者 Clone 後需要**：
   - 複製 `.env.example` 為 `.env`
   - 填入自己的 Firebase 配置
   - 執行 `npm install`

2. **Firebase 設定**：
   - Firestore 安全規則需在 Firebase Console 手動部署
   - 或使用 `firebase deploy --only firestore:rules`

3. **環境變數**：
   - 開發環境：使用 `.env`
   - 生產環境：在 hosting 平台設定環境變數（如 Vercel、Netlify）
