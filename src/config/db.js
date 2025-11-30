const mongoose = require('mongoose');

const connectDB = async () => {
  if (!process.env.MONGODB_URI) {
    throw new Error('環境變數 MONGODB_URI 尚未設定');
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('MongoDB 連線成功');
  } catch (error) {
    console.error('MongoDB 連線失敗', error);
    process.exit(1);
  }
};

module.exports = connectDB;


