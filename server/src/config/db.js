const mongoose = require('mongoose');

async function main() {
  const uri = process.env.MONGO_URI || process.env.DB_CONNECTION_STRING;

  if (!uri) {
    throw new Error("❌ No MongoDB connection string provided. Set MONGO_URI or DB_CONNECTION_STRING!");
  }

  try {
    await mongoose.connect(uri);
    console.log("✅ MongoDB connected successfully!");
  } catch (err) {
    console.error("❌ MongoDB connection error:", err.message);
    throw err;
  }
}

module.exports = main;
