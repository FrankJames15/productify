import express from 'express'
import { ENV } from './config/env.config.ts'
import { clerkMiddleware } from '@clerk/express';
import cors from 'cors';

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

app.listen(PORT, () =>
    console.log(`\nServer running at http://localhost:${PORT}...`)
);