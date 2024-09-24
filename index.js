const express = require('express');
const app = express();
require('dotenv').config();
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { MongoClient, ServerApiVersion } = require('mongodb');
const jwt = require('jsonwebtoken');
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes'); // Import task routes
const port = process.env.PORT || 5000;

// Middleware and CORS setup
const corsOptions = {
    origin: ['http://localhost:5173', 'http://localhost:5174', 'http://localhost:3000'],
    credentials: true,
    optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.q3baw43.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function run() {
    try {
        const db = client.db('babelforgeDB');
        app.locals.db = db; // Store the db instance in app.locals for access in controllers

        // Use routes
        app.use('/api', userRoutes);
        app.use('/task', taskRoutes);

        console.log('Pinged your deployment. You successfully connected to MongoDB!');
    } finally {
    }
}
run().catch(console.dir);

app.get('/', (req, res) => {
    res.send('Server is Running...');
});

app.listen(port, () => {
    console.log(`Server is Running on port ${port}`);
});
