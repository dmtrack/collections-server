import express from 'express';
import connection from './db/config';
import dotenv from 'dotenv';
import userRouter from './routes/user.routes';
import collectionRouter from './routes/collection.routes';
import itemRouter from './routes/item.routes';
import { urlencoded, json } from 'body-parser';
const cookieParser = require('cookie-parser');
const cors = require('cors');
export const app = express();
const errorMiddleware = require('./middleware/error-middleware');
const authMiddleware = require('./middleware/auth-middleware');

dotenv.config();
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(json());
app.use(cookieParser());
app.use(urlencoded({ extended: true }));
app.use('/user', userRouter);
app.use('/collection', collectionRouter);
app.use('/item', itemRouter);
app.use(authMiddleware);

connection
    .sync({ force: true })
    .then(() => {
        console.log('Database synced succesfully');
    })
    .catch((err) => {
        console.log('Err', err);
    });
