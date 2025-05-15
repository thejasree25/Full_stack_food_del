import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    // Use environment variable for connection string, fallback to local if not set
    const mongoURI = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/gsfooddel';
    await mongoose.connect(mongoURI);
    console.log('✅ MongoDB connected successfully');
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error.message);
    process.exit(1);
  }
};

export default connectDB;
