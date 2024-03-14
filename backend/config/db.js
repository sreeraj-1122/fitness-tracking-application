const mongoose=require('mongoose')
const connectDB=async()=>{
    try {
        mongoose.connect(process.env.MONGO_URL).then(()=>{
            console.log("Database connected");
        })
    } catch (error) {
        console.log(error);
        process.exit(0);
    }
}   
module.exports=connectDB 