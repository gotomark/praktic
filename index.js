const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const authRoute = require('./routes/auth');
const app = express();

require('dotenv').config();
mongoose.connect(process.env.DB_CONNECTION,
    {useNewUrlParser: true},
    ()=> console.log('connected to DB'));


app.use(express.json());
app.use('/api/user',authRoute);



app.listen(8000, () => console.log('Server running on http://localhost:8000/'));