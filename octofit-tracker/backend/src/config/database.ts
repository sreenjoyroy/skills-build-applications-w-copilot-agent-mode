import mongoose from 'mongoose';

export const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectDatabase() {
  if (mongoose.connection.readyState === 1) {
    return mongoose.connection;
  }

  await mongoose.connect(connectionString);
  return mongoose.connection;
}

export async function disconnectDatabase() {
  if (mongoose.connection.readyState !== 0) {
    await mongoose.disconnect();
  }
}
