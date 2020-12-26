const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

let StatSchema = new mongoose.Schema ({
    score:{ 
        type: Number,

    },
    numberOfQuestions:{
        type : Number,
      
    },
    numberOfAnsweredQuestions:{
        type: Number,
     
    },
    correctAnswers:{
     type: Number,

    },
   wrongAnswers:{

   },
   fiftyFiftyUsed:{
    type: Number,

   },
   hintsUsed:{
    type: Number,

   },
   date:{
    type: Date,
    default: new Date()
   },
   matric:{
       type: Number
   }
});

const Quiz_Statistics = mongoose.model('Quiz_Statistics',StatSchema);

module.exports = Quiz_Statistics;

