const mongoose = require('mongoose');

let ComplainSchema = new mongoose.Schema ({
    matric:{
        type : Number,
        required:[true, 'Matric Number is required'],
        
    },
    level:{
        type:Number,
        required:[true, 'Level is required'],
        enum: [100, 200, 300, 400, 500]
    },

    complain:{
    minlength:8,
    maxlength:1000,
     type: String,
     lowercase: true,
     required:[true, 'complain is required']
    },
    
    date:{
        type: Date,
        default: new Date()
       },
});


const Complain = mongoose.model('Complains',ComplainSchema);

module.exports = Complain;

