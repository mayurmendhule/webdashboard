
const express = require('express');
const mongoose = require('mongoose');
const app = express();
const dotenv = require('dotenv');
const cors = require('cors');
const port = 8000;

// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
dotenv.config();
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB', error);
  });

// Routes
const authRoutes = require('./routes/auth');
const messageRoutes = require('./routes/messages');

app.use('/auth', authRoutes);
app.use('/messages', messageRoutes);

