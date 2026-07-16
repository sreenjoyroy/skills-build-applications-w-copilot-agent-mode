import 'dotenv/config';

import { connectDatabase } from './config/database.js';
import { createApp } from './app.js';

const port = Number(process.env.PORT || 8000);

async function startServer() {
  await connectDatabase();

  const app = createApp();
  app.listen(port, () => {
    console.log(`OctoFit Tracker backend listening on port ${port}`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});