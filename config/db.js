const { MongoClient, ServerApiVersion } = require('mongodb');
require('dotenv').config();

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@babelforge.sa2b6.mongodb.net/?retryWrites=true&w=majority&appName=BabelForge`;

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    },
});

async function connectToDatabase() {
    try {
        await client.connect();
        const db = client.db('babelforgeDB');
        return db;
    } catch (error) {
        console.error('Failed to connect to MongoDB', error);
    }
}

module.exports = connectToDatabase;
