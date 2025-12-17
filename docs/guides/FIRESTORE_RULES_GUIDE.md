# Firebase Firestore 安全規則部署指南

## 安全規則文件

已創建 `firestore.rules` 文件，包含以下安全規則：

### 規則摘要

1. **users/{userId}** - 用戶資料
   - 只有用戶本人可以讀寫自己的資料

2. **userPets/{userId}** - 用戶寵物
   - 只有用戶本人可以讀寫自己的寵物資料

3. **carts/{userId}** - 購物車
   - 只有用戶本人可以讀寫自己的購物車

4. **orders/{orderId}** - 訂單
   - 用戶只能讀取自己的訂單
   - 創建訂單時確保 userId 匹配
   - 用戶可以取消自己待處理的訂單

5. **products/{productId}** - 商品
   - 所有用戶可以讀取
   - 寫入權限預留給管理後台

## 部署方法

### 方法 1: Firebase Console（推薦）

1. 前往 [Firebase Console](https://console.firebase.google.com/)
2. 選擇您的專案 `petshop-6d16a`
3. 點擊左側菜單的 "Firestore Database"
4. 點擊頂部的 "規則" 標籤
5. 將 `firestore.rules` 的內容複製貼上
6. 點擊 "發布" 按鈕

### 方法 2: Firebase CLI

如果安裝了 Firebase CLI：

```bash
# 安裝 Firebase CLI（如果尚未安裝）
npm install -g firebase-tools

# 登入 Firebase
firebase login

# 初始化 Firebase 專案（如果尚未初始化）
firebase init firestore

# 部署規則
firebase deploy --only firestore:rules
```

## 測試規則

部署後，您可以在 Firebase Console 的規則模擬器中測試：

1. 點擊 "規則" 標籤旁的 "模擬器"
2. 設置測試場景（認證狀態、文檔路徑等）
3. 執行測試以確認規則正常工作

## 注意事項

⚠️ **重要安全提醒**：

- 目前商品寫入權限已關閉 (`allow write: if false`)
- 如需添加商品管理功能，需要實現管理員權限系統
- 建議使用 Custom Claims 來實現管理員角色
- 定期審查安全規則以確保數據安全

## 管理員權限（未來擴展）

如需添加管理員功能，可以使用以下規則：

```javascript
// 在 functions 中設置 custom claims
admin.auth().setCustomUserClaims(uid, { admin: true });

// 在規則中檢查
match /products/{productId} {
  allow read: if true;
  allow write: if request.auth.token.admin == true;
}
```

## 監控和日誌

- 在 Firebase Console 的 "用量" 標籤中查看讀寫次數
- 在 "規則" 標籤中查看規則執行日誌
- 設置預算警報以避免超額費用
