import express from "express";

import yogaRouter from "./routes/yogaRoutes";
const app = express();
const port = 3000;
//app.use(cors());

app.use(express.json()); //s a middleware function in Express used to parse incoming JSON request bodies.

app.use('/api/yoga', yogaRouter);

app.listen(port,()=>{

    console.log(`server is runing on port::  ${port}`);

});