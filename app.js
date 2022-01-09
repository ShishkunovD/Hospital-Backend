const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('config'); 
const app = express();
const authRouter = require('./src/modules/routes/auth.routes');

app.use(cors());
app.use(express.json());
app.use('/api/auth', authRouter);

const url = 'mongodb+srv://ShishkunovD:restart987!@hospital.h3001.mongodb.net/Hospital?retryWrites=true&w=majority';
mongoose.connect(url);

app.listen('8000', () => {
    console.log('Server was running..')
});