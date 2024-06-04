import express from 'express';
import { connectToDb } from './db.js';
import installHandler from './api_handler.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
installHandler(app);
const PORT = process.env.API_SERVER_PORT || 3000;

(async () => {
  try {
    await connectToDb();
    app.listen(PORT, () => {
      console.log(`API server listening on port: ${PORT}`);
    });
  } catch (err) {
    console.log('ERROR: ', err);
  }
})();
