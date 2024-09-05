import express, {json} from 'express';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;
import usersRouter from './routes/users.js';

// Middleware to parse JSON requests
app.use(express.json());

// Routes
app.use('/users', usersRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
