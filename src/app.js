import express from 'express';
import dotenv from 'dotenv';
import usersRouter from './routes/users.router.js';

dotenv.config();

const app = express();

const PORT = process.env.PORT || 8080;

app.use('/api/users',usersRouter);
app.listen(PORT,()=>console.log(`Listening on ${PORT}`))
