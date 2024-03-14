const Exercise = require("../../models/exerciseModel")

const getSingleExercise=async(req,res)=>{
    try {
        const {id}=req.params
        const data=await Exercise.findById({_id:id})
        if (!data) {
            return res.json('data not found').status(400)
        }
        res.status(200).json(data)
    } catch (error) {
        res.json(error).status(500)
    }
}
module.exports=getSingleExercise
