const Exercise = require("../../models/exerciseModel");

const deleteExercise = async (req, res) => {
    const { id } = req.params;
    try {
        const data = await Exercise.findByIdAndDelete(id)
        if (data) {
            res.status(200).json(' deleted successfully');

        }else{
            res.status(400).json(' not found')
        }
    } catch (error) {
        res.json(error).status(500)
        console.log(error);
    }
}
module.exports=deleteExercise;