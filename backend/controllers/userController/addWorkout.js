const Workout = require("../../models/workoutModel");

const addWorkout = async (req, res) => {
    try {
        console.log('workout',req.body);

        const { name, goal, exercise, description, duration, calories, muscle, equipment } = req.body;

        // Check if all required fields are present
        if (!name || !goal || !exercise || !description || !duration || !calories || !muscle || !equipment) {
            return res.status(400).json({ error: 'Missing required fields: name, goal, exercise' });
        } else{
            const userId = req.user.id;

            try { 
                // Attempt to create the workout
                const workout = await Workout.create({
                    name, goal, exercise, description, duration, user: userId,
                    calories, muscle, equipment
                });
    
                console.log(workout);
                return res.status(201).json(workout); // Send successful response
            } catch (error) {
                console.log('Error creating workout:', error );
    
                // Handle database errors
                if (error.code === 11000) { // MongoDB duplicate key error
                    return res.status(400).json({ error: 'Workout with the same name already exists' });
                }
    
                return res.status(500).json({ error: 'Failed to create workout' }); // Generic server error
            }
        }   

        
    } catch (error) {
        console.log('Error:', error);

        return res.status(500).json({ error: 'Internal Server Error' }); // Unexpected errors
    }
};

module.exports = addWorkout;
