// Initializing the application

import 'dotenv/config'

import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import mongoose from 'mongoose';

import postRoutes from './routes/Posts.js';

const app = express();


app.use(bodyParser.json({ limit: '30mb',  extended: true }));
app.use(bodyParser.urlencoded({ limit: '30mb',  extended: true }));

app.use(cors());

app.use('/posts', postRoutes);


const CONNECTION_URL = `mongodb+srv://${process.env.NAME}:${process.env.PASSWORD}@cluster0.z6znbmr.mongodb.net/?retryWrites=true&w=majority`;

const PORT = process.env.PORT || 5000;

mongoose.connect(CONNECTION_URL)
.then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
.catch(err => console.log(err));


