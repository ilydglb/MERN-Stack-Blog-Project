import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';


const port = process.env.PORT || 8000;
connectDB()
const app = express();  //initialize express

// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

//In order to be able to get the data from the request body
//Request Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
import cookieParser from 'cookie-parser';
app.use(cookieParser())
import userRoutes from './routes/userRoutes.js';
app.use('/api/users', userRoutes);

import { notFound, errorHandler } from './middleware/errorMiddleware.js';
app.use(notFound);
app.use(errorHandler);



app.listen(port, () => console.log(`Server started on port ${port}`));


