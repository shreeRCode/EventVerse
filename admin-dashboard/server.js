const express = require('express');
const cors = require('cors'); // Import the cors middleware
const app = express();
const registrationRoutes = require('./routes/registrations');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

app.use(cors({
          origin: 'http://localhost:3000', // Allow only your frontend origin
          methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allowed methods
          credentials: true, // Allow cookies and authorization headers
        }));
app.use(express.json());
app.use('/api/registrations', registrationRoutes);

const PORT = process.env.PORT || 5000;
console.log('MONGODB_URI:', process.env.MONGODB_URI);

mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Failed to connect to MongoDB:', err.message);
  });