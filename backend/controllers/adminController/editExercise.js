const Exercise = require("../../models/exerciseModel")
const fs = require('fs')

const editExercise = async (req, res) => {
    try {
        const {id}=req.params

        let newPath;
        if (req.file) {
            const { originalname, path } = req.file
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1]
            newPath = path + '.' + ext;
            fs.renameSync(path, newPath )
           } 
        const { name, equipment, muscle, difficulty, instructions, caloriesburned, duration } = req.body  
        
            const exercise =await Exercise.findByIdAndUpdate(id,{
                name, equipment, muscle, difficulty, instructions, caloriesburned, duration,
                photo:newPath
            }) 
            res.json(exercise).status(201) 
        
    } catch (error) {   
        res.json(error).status(500)
    }
}
module.exports=editExercise