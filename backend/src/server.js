import express, {json} from 'express';

const app = express();
const port = 3000;
import usersRouter from './routes/users';

// Middleware to parse JSON requests
app.use(json());

// Routes
app.use('/users', usersRouter);

// Start server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
