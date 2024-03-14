const Exercise = require("../../models/exerciseModel")

const getExercise=async(req,res)=>{
    try {
        const data=await Exercise.find({})
        res.status(200).json(data)
    } catch (error) {
        res.json(error).status(500)
    }
}
module.exports=getExercise