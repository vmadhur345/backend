import mongoose from 'mongoose';
import { db_name } from '../constants.js'; // Adjust the path as necessary

const connectDB = async () => {
  try {
    const connectionString = `${process.env.MONGODB_URI}/${db_name}`;
    console.log(`Attempting to connect to MongoDB with connection string: ${connectionString}`);

    const connectionInstance = await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log(`\n MongoDB connected! DB HOST: ${connectionInstance.connection.host}`);
  } catch (error) {
    console.log('MONGODB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;
