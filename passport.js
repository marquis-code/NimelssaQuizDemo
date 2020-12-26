const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const JwtStrategy = require('passport-jwt').Strategy;
const User = require('./models/User');
require('dotenv').config();

///////////////////////////////////////////////// USER JWT STRATEGY SETTINGS ///////////////////////////////////////////////////
 const cookieExtractor = req =>{ 
    let token = null;
    if(req && req.cookies){
        token = req.cookies["access_token"];
    }
    return token;
}
  
 const userJwtAuthSettings = {
    jwtFromRequest : cookieExtractor, 
    secretOrKey : process.env.SECRET
  }
  
  const userJwtVerifyCallback = (payload,done)=>{
       User.findById({_id : payload.sub})
       .then((user)=>{
          if(!user)
             return done(null, false);
             done(null,user);
       })
       .catch((err)=>{
           done(err, false);
       }); 
  }
  
const userSecondStrategy = new JwtStrategy(userJwtAuthSettings, userJwtVerifyCallback);

passport.use("jwt",userSecondStrategy)

///////////////////////////////////////////////  USER LOCAL STRATEGY SETTINGS ///////////////////////////////////////

const userCustomInputs = {
    usernameField : "matric",
    passwordField : "password",
    session: false,
    passReqToCallback: true
}


const userVerifyCallback = (req, matric, password, done) =>{
     User.findOne({matric})
      .then((user)=>{
          if(!user)
              return done(null, false, {msgBody : "Invalid Credentials.", msgError: true});
              user.comparePassword(password, done);
      })
      .catch((err)=>{
          done(err);
      });
}

const userFirstStrategy = new LocalStrategy(userCustomInputs, userVerifyCallback);

passport.use("local", userFirstStrategy);