import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import routes from "./routes/index.js";

// Initialize express
const app = express();

// Connect to the local MongoDB server
mongoose.connect("mongodb://localhost:27017/huskyworksdb");
// Use Express Json module
app.use(express.json());
// Use Express url encoder module
app.use(express.urlencoded());
// Use Cors
app.use(cors());

// Initialize the routes
routes(app);

export default app;
