import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import connectDB from './config/db.js';
import helmet from 'helmet';
import session from 'express-session';
import cors from 'cors'

import { notFound, errorHandler } from './middleware/errorMiddleware.js';

import multer from 'multer';


const port = process.env.PORT;
connectDB()
const app = express();  //initialize express
app.use(cors({ origin: 'http://localhost:3000',  credentials: true, }));

//In order to be able to get the data from the request body
//Request Body Parser Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';

// Get the directory path of the current module file
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Append the "images" folder to the directory path
const imagesFolderPath = path.join(__dirname, 'images');
app.use("/images", express.static(imagesFolderPath));

//middleware for cookies
import cookieParser from 'cookie-parser';
app.use(cookieParser())



import userRoutes  from './routes/userRoutes.js';
import postRoutes from './routes/postRoutes.js'
app.use('/api/users', userRoutes );
app.use('/api/posts', postRoutes);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "./backend/images/");
  },
  filename: (req, file, cb) => {
    cb(null, req.body.name);
  },
});

const upload = multer({ storage: storage });
app.post("/api/upload", upload.single("file"), (req, res) => {
  res.status(200).json("File has been uploaded");
});

app.use(notFound);
app.use(errorHandler);


app.listen(port, () => console.log(`Server started on port ${port}`));


