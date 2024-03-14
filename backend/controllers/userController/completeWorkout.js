const Workout = require("../../models/workoutModel");

const completeWorkout=async(req,res)=>{
    const { id } = req.params;
    const { completed } = req.body;
    try {
        const data = await Workout.findByIdAndUpdate(
            id,
          { completed },
          { new: true } // Return the updated document
        );
        res.json(data).status(200);
        
      } catch (error) {
        console.error('Error updating task:', error);
        res.status(500).json({ error: 'Internal Server Error' });
      }
}
module.exports=completeWorkout