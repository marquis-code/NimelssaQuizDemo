const mongoose = require('mongoose');
const QuizSchema = new mongoose.Schema({
category :{
    type : String,
    enum : ['hematology','histopathology', 'medical microbiology', 'chemical pathology', 'immunology', 'parasitology', 'blood group serolgy', 'immunochemistry', 'general knowledge', 'molecular diagnosis', 'biotechnology'],
    required:[true, 'Question Category is required'],
},

question: {
    type : String,
    required:[true, 'Question is required'],
},

optionA: { 
    type: String,
    required:[true, 'OptionA is required'],
},

optionB: {
     type: String,
     required:[true, 'OptionB is required'],
},

optionC: {
     type: String,
     required:[true, 'OptionC is required'],
},

optionD: {
    type: String,
    required:[true, 'OptionD is required'],
},
   
answer : {
   type : String,
   required:[true, 'Answer is required'],
},
date:{
    type: Date,
    default: new Date()
   }

});

const Quiz = mongoose.model('Quiz', QuizSchema);
module.exports = Quiz;

