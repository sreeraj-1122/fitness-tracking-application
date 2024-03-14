const User = require("../../models/userModels")

const getAlluser=async(req,res)=>{
    try {
        const users=await User.find({})
        res.status(200).json(users)
    } catch (error) { 
        console.log(error);
        res.json(error).status(500)
    }
}
module.exports=getAlluser 