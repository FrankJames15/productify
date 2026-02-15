import express from 'express'
import { ENV } from '../env.config.ts'
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

// routes
import usersRoutes from './routes/users.routes.ts';
import productsRoutes from './routes/products.routes.ts';
import commentRoutes from './routes/comments.routes.ts'

const PORT = ENV.PORT || 3000;

const app = express();

app.use(cors({ origin: ENV.FRONTEND_URL }));
app.use(clerkMiddleware());
app.use(express.json()); // parses JSON request bodies.
app.use(express.urlencoded({ extended: true })); // parses form data (like HTML forms).



app.get('/', (req, res) => {
    res.json({
        success: true
    })
})

app.use("/api/users", usersRoutes);
app.use("/api/products", productsRoutes);
app.use("/api/comment", commentRoutes);

app.listen(PORT, () =>
    console.log(`\nServer running at http://localhost:${PORT}...`)
);