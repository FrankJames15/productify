import express from 'express'
import { ENV } from '../env.config.ts'
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

// routes imports
import usersRoutes from './routes/users.routes.ts';
import productsRoutes from './routes/products.routes.ts';
import commentRoutes from './routes/comments.routes.ts'

const PORT = ENV.PORT || 3000;

const app = express();

// middlewares
app.use(cors({ origin: ENV.FRONTEND_URL, credentials: true }));
// `credentials: true` allows the client to send cookies to server for authentication
app.use(clerkMiddleware()); // attach auth object to req
app.use(express.json()); // parses JSON request bodies.
app.use(express.urlencoded({ extended: true })); // parses form data (like HTML forms).

// routes
app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/comments", commentRoutes);

// run server
app.listen(PORT, () =>
    console.log(`\nServer running at http://localhost:${PORT}...`)
);