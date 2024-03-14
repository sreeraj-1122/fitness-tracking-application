const mongoose = require('mongoose');
const exerciseSchema=new mongoose.Schema(
    {
        name:{
            type:String,
            required: true,

        },
        equipment:{
            type:String,
            required: true,

        },
        muscle:{
            type:String,
            required: true,
        },
        difficulty:{
            type:String,
            required: true,
        },
        instructions:{
            type:String,
            required: true,
        },
        caloriesburned:{
            type:Number, 
            required: true,
        },
        duration:{  
            type:Number,
            required: true,
        }, 
        photo:{
            type:String,
            required: true,
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
const Exercise=mongoose.model("Exercise",exerciseSchema);
module.exports=Exercise