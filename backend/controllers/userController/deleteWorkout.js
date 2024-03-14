const Workout = require("../../models/workoutModel");

const deleteWorkout = async (req, res) => {
    const { id } = req.params;
    console.log(id);
    try {
        const data = await Workout.findByIdAndDelete(id);
        if (data) {
            res.status(200).json({ message: 'Workout deleted successfully' });
        } else {
            res.status(404).json({ error: 'Workout not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = deleteWorkout;
