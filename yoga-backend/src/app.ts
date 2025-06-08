import express from "express";
import mongoose from "mongoose";
import yogaRouter from "./routes/yogaRoutes";
import dotenv from "dotenv";
dotenv.config();
const app = express();
const port = 3000;
const MONGODB_URL = process.env.MONGO_URI || '';
//app.use(cors());
console.log("mongodbUrl",MONGODB_URL);
app.use(express.json()); //s a middleware function in Express used to parse incoming JSON request bodies.

app.use('/api/yoga', yogaRouter);

mongoose.connect(MONGODB_URL)
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error("MongoDB Error:",err));

app.listen(port,()=>{

    console.log(`server is runing on port::  ${port}`);

});