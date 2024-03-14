const express=require('express')
const connectDB = require('./config/db')
const cors=require('cors')
const app=express()
const dotenv=require('dotenv')
const router = require('./router/route')
app.use(express.json())
app.use(cors());

dotenv.config();
app.use('/', router)
app.use('/uploads', express.static(__dirname + '/uploads'))
connectDB()
const PORT=5000 
app.listen(PORT,()=>console.log(`server is running on ${PORT}`))