const Workout = require("../../models/workoutModel");

const getWorkout = async (req, res) => {
    try {
        const { id } = req.params;
        const workout = await Workout.find({ "user": id }).exec();
         
        if (!workout) {
            // If no post is found for the specified author
            return res.status(404).json({ message: 'No workout found for the specified user.' });
        }

        return res.status(200).json(workout);
    } catch (error) {
        console.log(error);
        res.status(500).send({ message: error.message });
    }
}

module.exports = getWorkout;
