const mongoose = require('mongoose');

let SliderSchema = new mongoose.Schema ({
    title:{
        type : String,
        required:[true, 'Title is required'],
        
    },
    user:{
        type:String,
        required:[true, 'User is required']
    },

    description:{
    minlength:8,
    maxlength:1000,
     type: String,
     lowercase: true,
     required:[true, 'Description is required']
    },
    
    date:{
        type: Date,
        default: new Date()
       },
});


const Slider = mongoose.model('Slider',SliderSchema);

module.exports = Slider;

