const mongoose = require('mongoose');
const workoutSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
 
        },
        goal: {
            type: String,
            required: true,

        },
        exercise: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: true,

        },
        calories:{
            type:Number, 
            required: true,

        },
        muscle:{
            type:String,
            required: true,

        },
        equipment:{
            type:String,
            required: true,

        },
        duration: {
            type: Number,
            required: true,

        },
        completed: {
            type: Boolean,
            default: false,
        },
        
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        createdAt: {
            type: Date,
            default: Date.now
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
)
const Workout = mongoose.model("Workout", workoutSchema);
module.exports = Workout