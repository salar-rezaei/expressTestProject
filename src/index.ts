import dotenv from 'dotenv';
dotenv.config({path: '/Users/salarsmac/nodejs/myNewExpressApp/.env'});

import cors from 'cors';
import express from 'express';
import mongoose from 'mongoose';
import Redis from 'ioredis';


// controllers
import { userControllers } from './user';
import { productControllers } from './product';
import { authControllers } from './auth';

// express app
const app = express();

// Redis client
const redis = new Redis();
export default redis;

// middlewares
app.use(cors());
app.use(express.json());

// route groups
app.use('/users', userControllers);
app.use('/products', productControllers);
app.use('/auth', authControllers);

// start app
mongoose.connect(`${process.env.MONGODB_URI}`, {}).then(()=>{
  app.listen(3000, () => {
    console.log('App is running on http://localhost:3000');
  })
}).catch((err)=> {
  console.log("error", err)
})
