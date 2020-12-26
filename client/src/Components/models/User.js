const mongoose = require('mongoose');
const bcrypt = require('bcrypt'); 

let UserSchema = new mongoose.Schema ({
    username:{ 
        type: String, 
        lowercase: true,
        required:[true, 'Username is required'],
        minlength: [3, 'Username can\'t be smaller than 3 characters'],
        maxlength: [64, 'Username can\'t be greater than 64 characters' ],
        unique:true
    },
    matric:{
        type : Number,
        required:[true, 'Matric Number is required'],
        unique:true
        
    },
    password:{
        type:String,
        required:[true, 'Password is required'],
        minlength:8,
        maxlength:200,
        match: /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*]).{8,12}$/,
        unique:true
    }, 
    email:{
     type: String,
     unique: true,
     trim: true,
     lowercase: true,
     required:[true, 'Email is required'],
     match: /(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@[*[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+]*/
    },
    role:{
        type:String,
        enum:['user'],
        default : 'user',
    },
    resetPasswordLink: {
        data: String,
        default: ''
    }
},{
    timestamps: true
});

 UserSchema.pre('save',function(next){
 if(!this.isModified('password'))
     return next();
     bcrypt.hash(this.password,10,(error,passwordHash)=>{
         if(error)
            return next(error);
         this.password = passwordHash; 
         next(); 
     });
 });

 UserSchema.methods.comparePassword = function(password,callback){
     bcrypt.compare(password,this.password,(error,isMatch)=>{
        if(error)
           return callback(error);
        else{
            if(!isMatch)
               return callback(null,isMatch, { message: 'Invalid Matric or Password.'});
            return callback(null,this);
        }
     })
 }
const User = mongoose.model('Registered-Users',UserSchema);

module.exports = User;
