import express from 'express';
import cors from 'cors';
import { books } from './data/books.mjs'; // Make sure this file exists and exports books correctly.
import cartRouter from './routers/cart.mjs';
import mongoose from 'mongoose';
import Book from './shemas/Book.mjs';
import booksRouter from './routers/books.mjs';
import authentication from './routers/auth.mjs';
import ordersRouter from './routers/orders.mjs';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import dotenv from 'dotenv';

dotenv.config()


const app = express();

const corsOptions = {
  origin: "https://sumbook-client.vercel.app",
  credentials: true, // Allow sending cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  exposedHeaders: ['set-cookie'],
  optionsSuccessStatus: 204 // Ensure preflight requests pass
};

app.use(cors(corsOptions));
app.options('*', cors(corsOptions)); // ✅ Handle preflight requests

// ✅ 2. Middleware setup (Correct Order)
app.use(express.json());
app.use(bodyParser.json());
app.use(cookieParser());

// ✅ 4. Routers (After session & CORS)
app.use(authentication);
app.use(cartRouter);
app.use(booksRouter);
app.use(ordersRouter);


const port = process.env.PORT || 4000;

async function connectDb() {
  try {
    mongoose.connect(process.env.URI)
    console.log("Connected to MongoDB")
  } catch (err) {
    console.error(err)
  }
}

connectDb()




app.get('/', (req, res) => {

  res.send('home ');
});




app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
