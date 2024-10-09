const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();
const { MongoClient } = require('mongodb');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes');
const teamRoutes = require('./routes/teamRoutes');
const projectRoute = require('./routes/projectRoute');
const dashRoute = require('./routes/dashRoute');
const visitorRoutes = require('./routes/visitorRoutes');
const messageRoute = require('./routes/messageRoute');
const chatRoutes = require('./routes/chatRoutes'); // Chat Routes
const aiRoutes = require('./routes/aiRoutes');
const { initSocket } = require('./socket/socket');
const connectToDatabase = require('./config/db'); // Socket.IO initialization
const reviewRoute = require('./routes/reviewRoute');
const pricingRoute = require('./routes/pricingRoutes')

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 5000;

// Middleware and CORS setup
const corsOptions = {
  origin: [
    'http://localhost:5173',
    'http://localhost:5174',
    'http://localhost:3000',
    'http://localhost:3001',
    'https://babel-forge.vercel.app',
  ],
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

connectToDatabase()
  .then(db => {
    app.locals.db = db;
    console.log('Connected to MongoDB');

    app.use('/api', userRoutes);
    app.use('/task', taskRoutes);
    app.use('/team', teamRoutes);
    app.use('/project', projectRoute);
    app.use('/message', messageRoute);
    app.use('/dashboard', dashRoute);
    app.use('/chat', chatRoutes);
    app.use('/api', visitorRoutes);
    app.use('/api', reviewRoute);
    app.use('/ai', aiRoutes);
    app.use('/price',pricingRoute)

    app.get('/', (req, res) => {
      res.send('Babel Server is Running...');
    });

    // Initialize Socket.IO with the database
    initSocket(server, db);

    // Start server
    server.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch(err => console.error('Error connecting to MongoDB', err));
