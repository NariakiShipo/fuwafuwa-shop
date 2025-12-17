# ⚡ 快速修復：購物車權限問題

## 🎯 只需 3 步驟（不到 1 分鐘）

### 步驟 1：打開連結
點擊此連結（會自動打開 Firebase Console 的規則頁面）：
👉 https://console.firebase.google.com/project/petshop-6d16a/firestore/rules

### 步驟 2：複製並貼上規則
刪除編輯器中的所有內容，貼上以下規則：

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

### 步驟 3：發布
點擊右上角的「發布」或「Publish」按鈕

---

## ✅ 完成！

現在：
1. 回到您的網站
2. 重新整理頁面（F5 或 Cmd+R）
3. 確保已登入
4. 嘗試加入商品到購物車

購物車應該可以正常運作了！🎉

---

## 💡 為什麼需要這樣做？

錯誤訊息 `Missing or insufficient permissions` 表示：
- ✅ 您的程式碼沒問題
- ✅ Firebase 連線正常
- ❌ **Firestore 安全規則未設置**（這就是要修復的）

部署規則後，Firestore 就知道「已登入的用戶可以讀寫資料」，權限問題就解決了。

---

## 🔒 更安全的規則（可選）

如果您想使用更嚴格的規則，可以用這個：

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    
    match /carts/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /products/{productId} {
      allow read: if true;
      allow write: if false;
    }
    
    match /orders/{orderId} {
      allow read: if request.auth != null && resource.data.userId == request.auth.uid;
      allow create: if request.auth != null && request.resource.data.userId == request.auth.uid;
    }
    
    match /users/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
    
    match /userPets/{userId} {
      allow read, write: if request.auth != null && request.auth.uid == userId;
    }
  }
}
```

這個規則確保每個用戶只能訪問自己的資料。
