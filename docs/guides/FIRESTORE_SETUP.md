# Firestore 安全規則設置指南

## 🔥 問題：Missing or insufficient permissions

**錯誤訊息**：`Failed to load cart: FirebaseError: Missing or insufficient permissions.`

**原因**：Firestore 安全規則尚未部署到 Firebase

---

## ⚡ 方法 1：快速解決（推薦）

直接在 Firebase Console 設置規則，**無需安裝任何工具**：

### 步驟：

1. **打開 Firebase Console**
   - 訪問：https://console.firebase.google.com/project/petshop-6d16a/firestore/rules

2. **複製以下規則**（臨時開發用）：
   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       match /{document=**} {
         allow read, write: if request.auth != null;
       }
     }
   }
   ```

3. **貼上並發布**
   - 將上面的規則貼到編輯器中
   - 點擊右上角的「發布」按鈕
   - 等待部署完成（約5-10秒）

4. **測試**
   - 重新整理您的網頁
   - 確保已登入
   - 嘗試加入商品到購物車

✅ **完成！** 現在購物車應該可以正常運作了。

---

## 🛠️ 方法 2：使用 Firebase CLI（正式部署）

如果您想使用更安全的規則並透過命令列管理，請按照以下步驟：

### 1. 安裝 Firebase CLI

```bash
npm install -g firebase-tools
```

### 2. 登入 Firebase

```bash
firebase login
```

### 3. 初始化專案（如果尚未初始化）

```bash
firebase init firestore
```

選擇：
- 使用現有專案：**petshop-6d16a**
- Firestore 規則文件：**firestore.rules** (已存在)

### 4. 部署 Firestore 規則

```bash
firebase deploy --only firestore:rules
```

### 5. 驗證部署

部署成功後，重新整理網頁並測試購物車功能。

---

## 🔒 正式環境規則（已包含在 firestore.rules）

本專案的 `firestore.rules` 文件已包含完整的安全規則：

```javascript
// 購物車：只有用戶本人可以讀寫
match /carts/{userId} {
  allow read, write: if request.auth != null && request.auth.uid == userId;
}

// 商品：所有人可讀，寫入關閉
match /products/{productId} {
  allow read: if true;
  allow write: if false;
}

// 訂單：只有用戶本人可以讀寫自己的訂單
match /orders/{orderId} {
  allow read: if request.auth != null && request.auth.uid == resource.data.userId;
  allow create: if request.auth != null && request.auth.uid == request.resource.data.userId;
}
```

---

## ✅ 驗證清單

部署完成後，請確認：

- [ ] Firebase Console 中的規則已更新
- [ ] 已登入網站帳號
- [ ] 瀏覽器 Console 沒有權限錯誤
- [ ] 可以成功加入商品到購物車

---

## 🐛 仍然遇到問題？

## 🐛 仍然遇到問題？

### 1. 檢查登入狀態
打開瀏覽器 Console，輸入：
```javascript
firebase.auth().currentUser
```
如果返回 `null`，表示未登入，請先登入。

### 2. 檢查規則是否生效
在 Firebase Console 查看規則的「已發布」時間戳，確保是最近更新的。

### 3. 清除快取
```javascript
localStorage.clear();
location.reload();
```

### 4. 查看詳細錯誤
打開瀏覽器開發者工具 (F12)，切換到 Console 頁籤，會看到詳細的錯誤日誌。

---

## 📞 需要協助

如果問題仍未解決，請提供：
1. Firebase Console 中當前的安全規則
2. 瀏覽器 Console 的完整錯誤訊息
3. 是否已成功登入（Console 中 `firebase.auth().currentUser` 的結果）


### 1. 前往 Firebase Console
1. 打開 [Firebase Console](https://console.firebase.google.com/)
2. 選擇您的專案：**petshop-6d16a**

### 2. 設置 Firestore 安全規則
1. 在左側選單中點擊 **Firestore Database**
2. 點擊上方的 **規則 (Rules)** 頁籤
3. 將 `firestore.rules` 檔案中的內容複製到編輯器中
4. 點擊 **發布 (Publish)** 按鈕

### 3. 開發測試用臨時規則（僅用於開發）

如果您只是想快速測試，可以暫時使用以下規則（⚠️ 不安全，僅供開發使用）：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read, write: if request.auth != null;
    }
  }
}
```

### 4. 驗證設置

設置完成後：
1. 重新整理網頁
2. 確保已登入
3. 嘗試加入商品到購物車
4. 打開瀏覽器開發者工具 (F12) 查看 Console 訊息

## 檢查 Console 錯誤訊息

打開瀏覽器開發者工具 (F12)，查看 Console 中的錯誤訊息：

### 常見錯誤：

1. **PERMISSION_DENIED** 或 **permission-denied**
   - 原因：Firestore 安全規則未設置或設置不正確
   - 解決：按照上述步驟設置安全規則

2. **UNAUTHENTICATED** 或 **unauthenticated**
   - 原因：用戶未登入
   - 解決：點擊「登入」按鈕進行登入

3. **Network error** 或網路錯誤
   - 原因：網路連線問題
   - 解決：檢查網路連線

## 除錯日誌

現在系統已添加詳細的除錯日誌。當您嘗試加入購物車時，Console 中會顯示：

```
Adding to cart: { userId: "xxx", product: {...}, quantity: 1 }
cartService.addToCart called: { userId: "xxx", productId: "1", quantity: 1 }
Saving to Firestore...
Successfully saved to Firestore
Successfully added to cart
```

如果失敗，會顯示具體的錯誤訊息。

## 需要協助？

請提供以下資訊：
1. 瀏覽器 Console 中的完整錯誤訊息
2. 是否已登入
3. 當前的 Firestore 安全規則設置
