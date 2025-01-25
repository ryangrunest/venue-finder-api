import express, { Request, Response } from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import { errorHandlingMiddleware, myMiddleware } from './middleware/middleware';
import { authenticateToken } from './middleware/auth';
import venueRouter from './routes/venues';
import authRouter from './routes/auth'
import tourRouter from './routes/tour';
import artistRouter from './routes/artist';

const corsOptions = {
  origin: 'http://localhost:5173',
  optionsSuccessStatus: 200,
}

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
const mongoUri = process.env.MONGODB_URI || '';

app.use(cors(corsOptions));

// Connect to MongoDB
mongoose.connect(mongoUri)
  .then(async () => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error connecting to MongoDB:', err);
  });

/* MIDDLEWARE */
app.use(myMiddleware);
// Parse JSON
app.use(express.json());
// Error-handling middleware
app.use(errorHandlingMiddleware);
/* END MIDDLEWARE */

/* ROUTES */
app.use('/auth', authRouter)
app.use('/venues', authenticateToken, venueRouter);
app.use('/tour', authenticateToken, tourRouter);
app.use('/artist', authenticateToken, artistRouter)
app.get('/', (req: Request, res: Response) => {
  res.send('Hello, TypeScript with Express!');
});
/* END ROUTES */

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});