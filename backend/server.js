import path from 'path'
import express from "express";
import dotenv from 'dotenv';
import connectDb from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import userRoutes from './routes/userRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import uploadRoutes from './routes/uploadRoutes.js'
import cookieParser from "cookie-parser";


dotenv.config();

const port = process.env.PORT || 5000;
connectDb();

const app = express();

//body parser middleware
app.use(express.json());
app.use(express.urlencoded({extended:true}));

//cookie parser middleware
app.use(cookieParser());

app.get('/',(req,res)=>{
    res.send("APi is running....");
})

app.use('/api/products',productRoutes);
app.use('/api/users',userRoutes);
app.use('/api/orders',orderRoutes);
app.use('/api/upload',uploadRoutes);

app.get('/api/config/paypal',(req,res)=>
res.send({clientId:process.env.PAYPAL_CLIENT_ID}))

const _dirname=path.resolve();
app.use('/uploads',express.static(path.join(_dirname,'/uploads')))

app.listen(port,()=>console.log(`server is listening on port ${port}`))