import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import helmet from 'helmet';
import session from 'express-session';
import cors from 'cors'

import { notFound, errorHandler } from './middleware/errorMiddleware.js';



const port = process.env.PORT || 8000;
connectDB()
const app = express();  //initialize express
app.use(cors({ origin: 'http://localhost:3000',  credentials: true, }));
// app.get('/', (req, res) => {
//   res.send('Server is ready');
// });

//In order to be able to get the data from the request body
//Request Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//app.use(helmet())

// app.use(session({
//     secret: 'your-secret-key',
//     resave: false,
//     saveUninitialized: false,
//     cookie: { sameSite: 'strict' }
//   }));

//middleware for cookies
import cookieParser from 'cookie-parser';
app.use(cookieParser())



import userRoutes  from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js'
app.use('/api/users', userRoutes );
app.use('/api/posts', postRoutes);


app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server started on port ${port}`));


