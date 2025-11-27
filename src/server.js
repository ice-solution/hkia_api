const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const sessionRoutes = require('./routes/sessionRoutes');

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(sessionRoutes);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ message: '伺服器錯誤，請稍後再試' });
});

const bootstrap = async () => {
  await connectDB();
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
};

bootstrap().catch((err) => {
  console.error('應用程式啟動失敗', err);
  process.exit(1);
});

