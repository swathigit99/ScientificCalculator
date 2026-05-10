const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const calcRoutes = require('./routes/calcRoutes');

const app = express();
app.use(cors());
app.use(express.json());
require('dotenv').config();

app.get("/", (req, res) => {
  res.send("API Running 🚀");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB Connected"))
.catch(err => console.log(err));


app.use('/api/calc', calcRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));
