# Session API 服務

此專案提供兩個簡單的 API 端點，使用 MongoDB 儲存 session 狀態。

## 需求

- Node.js 18+
- MongoDB 6+（本地或遠端）

## 環境設定

1. 複製 `env.example` 為 `.env`
2. 設定下列環境變數：
   - `PORT`：API 監聽 port，預設 `3000`
   - `MONGODB_URI`：MongoDB 連線字串

## 啟動

```bash
npm install
npm run dev
```

## API 說明

### 1. 建立 Session

- **Method**: `POST /sessions`
- **Body**:
  ```json
  {
    "from": "sender",
    "to": "receiver",
    "message": 1
  }
  ```
- **Response**:
  ```json
  {
    "session_id": "自動產生的 ID",
    "sent": 0,
    "used": 0
  }
  ```

### 2. 使用 Session

- **Method**: `GET /?session_id={SESSION_ID}`
- **說明**：若查到對應 session，會將 `used` 欄位更新為 `1`。

## Postman 測試

專案內包含 Postman collection 檔案：`hkia_api.postman_collection.json`

### 匯入方式

1. 開啟 Postman
2. 點擊左上角 **Import** 按鈕
3. 選擇 `hkia_api.postman_collection.json` 檔案
4. Collection 匯入後，你會看到以下請求：
   - **建立 Session** - 建立 message = 1 的 session
   - **建立 Session (message = 2)** - 建立 message = 2 的 session
   - **建立 Session (message = 3)** - 建立 message = 3 的 session
   - **標記 Session 為已使用** - 透過 session_id 標記為已使用

### 使用變數

Collection 包含兩個環境變數：
- `base_url`：預設為 `http://localhost:3000`，可依你的環境調整
- `session_id`：建立 session 後，可手動設定此變數以便後續測試

### 測試流程

1. 執行「建立 Session」請求，複製回傳的 `session_id`
2. 在 Postman 的 Collection Variables 中設定 `session_id` 變數
3. 執行「標記 Session 為已使用」請求，確認 `used` 欄位變為 `1`

