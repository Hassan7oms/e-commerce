const express = require('express');
const path = require('path');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const { connect } = require('http2');
dotenv.config();
const connectDB=require('./config/database.config');
const corsMiddleware=require('./middlewares/cors-middleware');
//const helmet = require('helmet');


const app = express();
app.use("/uploads",express.static(path.join(__dirname,'uploads')));
app.use(express.json());




app.use(corsMiddleware);
connectDB();
//import routes







const AppError = require('./utils/app-error.utils');
const globalErrorHandelar = require('./middlewares/errorHandelar-middleware');
const userRouter = require('./routes/user-router');


app.use('/api/users',userRouter);






app.use((req,res,next)=>{
    next(new AppError(`can't find ${req.originalUrl} on this server`));
});

app.use(globalErrorHandelar);





app.listen(process.env.PORT,()=>console.log(`server started at port ${process.env.PORT}`));