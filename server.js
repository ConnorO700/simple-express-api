import express from 'express'; //commonJS => const express = require('express');
import path from 'path'; 
import { fileURLToPath } from 'url'
import posts from './routes/posts.js'; //commonJS => const posts = require('./routes/posts');
import logger from './middleware/logger.js'
import errorHandler from './middleware/error.js';
import notFound from './middleware/notFound.js';

// get the directory name
//const __filename = fileURLToPath(import.meta.url);
//const __dirname = path.dirname(__filename);

const app = express();
const port = process.env.PORT || 5001;

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({encoded:false}));

//middlware
app.use(logger);

app.use(express.static('public'));

//routes
app.use('/api/posts', posts)

//error handlers
app.use(notFound);
app.use(errorHandler);

app.listen(port, () => console.log(`Server is running on port:${port}`));