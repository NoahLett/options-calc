import express from 'express';
import ViteExpress from 'vite-express';
import dotenv from 'dotenv';
import connectDB from './config/database.js';
import optionRoutes from './routes/options.js';
import transactionRoutes from './routes/transactions.js';
import feeRoutes from './routes/fees.js';

dotenv.config();
const PORT = process.env.PORT;

const app = express();
app.use(express.json());

connectDB();

app.use('/api/options', optionRoutes);
app.use('/api/transactions', transactionRoutes);
app.use('/api/fees', feeRoutes);

ViteExpress.listen(app, PORT, () => {
  console.log(`Server is listening on port ${PORT}...`);
});
