const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();
const PORT = process.env.PORT || 3000;

const uri = "mongodb+srv://maheshwarisharman:J6Msv3OQ7IJ01BYK@cluster0.r837s.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";


// Middleware
app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));


// Routes
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
    res.send('Hello, this is your message!');
});

// MongoDB connection
mongoose.connect(uri)
.then(() => console.log('MongoDB connected'))
.catch(err => console.error(err));

app.listen(PORT, () => console.log("Server running on port ${PORT}"));