import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";
import multer from 'multer';


// Initialize express
const app = express();



// Connect to the local MongoDB server
mongoose.connect("mongodb://localhost:27017/huskyworksdb");
// Use Express Json module
app.use(express.json());
// Use Express url encoder module
app.use(express.urlencoded());

// const storage = multer.diskStorage({
//     destination: function (req, file, cb) {
//         cb(null, 'resumes/');
//     },
//     filename: function (req, file, cb) {
//         cb(null, Date.now() + "--" + file.originalname);
//     }
// }); 

// Use multer encoder
app.use(multer({dest: '../resumes'}).single('myfile'));
// Use Cors
app.use(cors());

// Initialize the routes
routes(app);

export default app;
