const Exercise = require("../../models/exerciseModel")
const fs = require('fs')

const addExercise = async (req, res) => {
console.log(req.body);
    try {
        let newPath;
        if (req.file) {
            const { originalname, path } = req.file
            const parts = originalname.split('.');
            const ext = parts[parts.length - 1]
            newPath = path + '.' + ext;
            fs.renameSync(path, newPath )
           } 
        const { name, equipment, muscle, difficulty, instructions, caloriesburned, duration } = req.body  
        if (!name || !equipment || !muscle || !difficulty || !instructions || !caloriesburned || !duration || !req.file) { 
            res.json('send all fields').status(400)
        } else {
            const exercise =await Exercise.create({
                name, equipment, muscle, difficulty, instructions, caloriesburned, duration,
                photo:newPath
            }) 
            res.json(exercise).status(201) 
        }
    } catch (error) {   
        res.json(error).status(500)
    }
}
module.exports=addExercise