const User = require("../../models/userModels");

const getUser=async(req,res)=>{
    try {
        const { id } = req.params;
        const user = await User.findById({ _id:id })
        return res.status(200).json(user)   
    } catch (error) {
        console.log(error.message);
        res.status(500).send({ message: error.message })

    }
}
module.exports=getUser
