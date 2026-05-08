const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const calcRoutes = require('./routes/calcRoutes');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/calculator');

app.use('/api/calc', calcRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
