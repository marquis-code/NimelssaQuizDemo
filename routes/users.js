const express = require('express')
let router = express.Router(); 
const User = require('../models/User');
const { registerSchema } = require("../models/validations/authValidation");
const { loginSchema } = require("../models/validations/loginValidation");
const passport = require("passport");
const JWT = require("jsonwebtoken");
const passportConfig = require("../passport");
const Quiz_Statistics = require("../models/QuizStatistics");
const Complain = require('../models/Complain');
const { complainSchema } = require("../models/validations/complainValidation");
const nodemailer = require("nodemailer");
const nodemailerMailgun = require('nodemailer-mailgun-transport');
const _ = require('lodash');
require("dotenv").config();
const moment = require('moment');

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: process.env.SECRET,
      sub: userID,
    },
    process.env.SECRET, 
    {
      expiresIn: process.env.JWTEXPIRE,
    }
  );
}; 


router.get('/', (req, res) => {
  res.send('welcome to nimelssa online quiz user page')
});

router.post('/signup', (req,res)=>{
   const { username,matric,email,password} = req.body;
  const validationResult = registerSchema.validate(req.body, { abortEarly: false });
  if (validationResult.error) {
    console.log(validationResult.error);
    return res.status(400).json({
      message: {
        msgBody:
          "Oops!!! Please Enter All Fields information Correctly.",
        msgError: true,
      }
    });
  }


  if (matric.toString().length !== 9) {
    return res.status(400).json({
      message: {
        msgBody: "Please!!! Enter A Valid Matric Number",
        msgError: true,
      },
    });
  } 
  
  User.findOne({matric},(err,user)=>{
      if(err)
          res.status(500).json({message : {msgBody : "OOPS Error has occured", msgError: true}});
      if(user)
          res.status(400).json({message : {msgBody : "Matric is already taken", msgError: true}});
      else{
          const newUser = new User({username,matric,email,password});
          newUser.save(err=>{
              if(err)
                  res.status(500).json({message : {msgBody : "OOPS Error has occured, please try again.", msgError: true}});
              else
                  res.status(201).json({ 
                    
                    message : {  msgBody : "Congreatulations Account successfully created", msgError: false, matric, username}});
          });
      }
  }); 
});

//User Login
router.post( "/signin", passport.authenticate("local", { session: false }), (req, res) => {
  const { matric } = req.body;
const validationResult = loginSchema.validate(req.body, {
    abortEarly: false,
  });
  if (validationResult.error) {
    return res.status(400).json({
      message: {
        msgBody:
          "Oops Login Failed!! Please Enter All Fields information Correctly.",
        msgError: true,
      },
    });
  }

  if (matric.toString().length !== 9) {
    return res.status(400).json({
      message: {
        msgBody: "Please!!! Enter A Valid Matric Number",
        msgError: true,
      },
    });
  }

  if (req.isAuthenticated()) {
    const { _id, matric, role, username} = req.user; //added username
    const token = signToken(_id);      
/*      res.cookie("access_token", token, {
      httpOnly: true,
      sameSite: true
    });   */
    res.status(200).json({
      msgBody: "Congratulations You are sucessfuly logged In",
      msgError: false,
      isAuthenticated: true,
      token,
      user: { username, matric, role, _id }
    });
  } else {
    res.status(400).json({
      msgBody: "Login was not successful",
      isAuthenticated: false,
      msgError: true,
    });
  } 
}
); 

router.post(
  "/quizStat",
  (req, res) => {
    const {
      score,
      numberOfQuestions,
      numberOfAnsweredQuestions,
      correctAnswers,
      wrongAnswers,
      fiftyFiftyUsed,
      hintsUsed,
      matric
    } = req.body;
  
    //Checking if matric entered exist on the User database
    User.findOne({ matric }).then((user) => {
      if (!user) {
        return res.status(400).json({
          message: {
            msgBody: "User with such Matric does not exist!!!!.",
            msgError: true,
          },
        });
      } else {
        // user exist then its proceeding to submit and save user
        const new_Statistics = new Quiz_Statistics({
          score,
          numberOfQuestions,
          numberOfAnsweredQuestions,
          correctAnswers,
          wrongAnswers,
          fiftyFiftyUsed,
          hintsUsed,
          matric,
        });
        new_Statistics
          .save()
          .then(() => {
            res.status(200).json({
              message: {
                msgBody: "Quiz statistics has been saved!!",
                msgError: false,
              },
            });
          })
          .catch(() => {
            return res.status(500).json({
              message: {
                msgBody: "Something went wrong" ,
                msgError: true,
              }
          });
          });
  
        //configuring mail
        const mailOptions = {
          from: 'no-reply@nimelssaQuiz.com',
          to: process.env.EMAIL,
          subject: "Quiz statistics",
          html: `
    <div>
     <h1>${matric} Quiz Statistics</h1>
      <p>Student's Matric = ${matric}</p>
      <p>Score = ${score}</p>
      <p>Number of questions =  ${numberOfQuestions}</p>
      <p>Number of answered Questions = ${numberOfAnsweredQuestions}</p>
      <p>Correct Answers =  ${correctAnswers}</p>
      <p>Wrong Answers = ${wrongAnswers}</p>
      <p>Fifty Fifty Used = ${fiftyFiftyUsed}</p>
      <p>Hints Used = ${hintsUsed}</p>
      <p>Date and time submitted = ${moment().format('LLLL')}</p>
  </div>
      `,
        }; 
  
        const transporter = nodemailer.createTransport({
          service: "gmail",
          secure: false,
          port: 587,
          auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
          },
        });
  
        transporter
          .sendMail(mailOptions)
          .then(() => {
            return res.status(200).json({
              message: {
                msgBody: "Email sent successfully",
                msgError: false,
              },
            });
          })
          .catch(() => {
           console.log("Oops Email not sent!!!");
          });
      }
    });
  }
  );
  
  router.put('/forgot', (req, res) => {
  const { email } = req.body;
  
  User.findOne({ email }, (err, user) => {
      if (err || !user) {
          return res.status(400).json({
              message: {
                msgBody: "User with that email does not exist",
                msgError: true,
              },
          });
      }
  
       const token = JWT.sign({ _id: user._id }, "NimelssaOnly", { expiresIn: process.env.FORGOTPASSWORDJWTEXPIRE });
    
        const mailOptions = {
        from: 'Nimelssa Quiz <no-reply@nimelssaQuiz.com>',
        to: email,
        subject: `User Reset Password`,
        html: `
        <div>
          <h1>Reset password</h1>
          <p>A password reset event has been triggered. The password reset window is limited to thirty minutes.</p>
          <p>If you do not reset your password within thirty minutes, you will need to submit a new request.</p>
          <p>To complete the password reset process, visit the following link:</p>
          <p>${process.env.CLIENT_URL}/reset/${token}</p>
          <hr />
          <p>This email may contain sensetive information</p>
          <p>${process.env.CLIENT_URL}</p>
          <p>Created on = ${moment().format('DD/MM/YYYY')}</p>
        </div>
        `,
    } 
  
      return user.updateOne({ resetPasswordLink: token }, (err, success) => {
          if (err) {
              console.log('RESET PASSWORD LINK ERROR', err);
              return res.status(400).json({
                  message: {
                    msgBody: "Database connection error on user password forgot request",
                    msgError: true,
                  },
              });
          } else {
  
            const auth = {
              auth: {
                api_key: process.env.Api_key,
                domain: process.env.Domain
              }
            } 
  
            let transporter = nodemailer.createTransport(nodemailerMailgun(auth));
            
            transporter.sendMail(mailOptions)
            .then(() => {
              // console.log('SIGNUP EMAIL SENT', sent)
              return res.json({
                  message: {
                    msgBody: `Please check  ${email} inbox to complete the reset.Follow the instruction to activate your account`,
                    msgError: false,
                  },
              });
          })
          .catch(() => {
             
              return res.status(500).json({
                message: {
                  msgBody: "Something went wrong" ,
                  msgError: true,
                }
            });
          });
  
          }
      });
  });
  })
  
router.put('/reset', (req, res)=>{
  const { resetPasswordLink, newPassword } = req.body;
  
  if (resetPasswordLink) {
      JWT.verify(resetPasswordLink, process.env.SECRET, function(err, decoded) {
          if (err) {
              return res.status(400).json({
                message: {
                  msgBody: "Oops Expired link. Try again" ,
                  msgError: true,
                }
              });
          }
  
          User.findOne({ resetPasswordLink }, (err, user) => {
              if (err || !user) {
                  return res.status(400).json({
                    message: {
                      msgBody: "Something went wrong. Try later" ,
                      msgError: true,
                    }
                  });
              }
  
              const updatedFields = {
                  password: newPassword,
                  resetPasswordLink: ''
              };
  
              user = _.extend(user, updatedFields);
  
              user.save((err, result) => {
                  if (err) {
                      return res.status(400).json({
                        message: {
                          msgBody: "Oops Error resetting user password" ,
                          msgError: true,
                        }
                      });
                  }
                  res.status(200).json({
                    message: {
                      msgBody: `Congratulations! proceed to login with your new password`,
                      msgError: false,
                    }
                  });
              });
          });
      });
  }
  })
  
  //Get logged in user
  router.get('/loggedIn',async(req,res)=>{
  
  const user = await User.findById(req.user._id).select('-password');
  if(user){
    res.send(user)
  }else{
    res.send('No user is logged in');
  }
  }) 
  
  router.post('/oneUser', async(req, res) => {
   const { matric} = req.body;                                                                                                          
   const singleUser = await User.findOne({matric}).select('-password');
   if(!singleUser){
     return res.status(404).json(`User with  matric ${matric} does not exist`);
   }else{
      return res.status(200).json(_.pick(singleUser, ['username', 'matric', 'role']));
   }});     
  
  router.get('/pastQuestions', (req, res) => {
  const { hasAttemptedQuiz } = req.user;
  if(hasAttemptedQuiz === false){
    console.log('Access denied');
  }
  })
             /* Admin routes except login and register and logout */
  router.delete('/deleteUser/:id', async (req, res) => {
       const _id = req.params.id;
       const deletedUser =await User.deleteOne({_id}).exec();
    
       if(deletedUser.deletedCount === 0){
          return res.status(404).json(`User With ID ${_id} does not Exist`);
       }else{
          res.status(200).json( `User With ID ${_id} Was Successfully Deleted`);
       }
      }) 
  
  //To delete user statistics from database
  router.delete('/deleteUserStat/:id', async (req, res) => {
       const _id = req.params.id;
       const deletedUserStat =await Quiz_Statistics.deleteOne({_id}).exec();
    
       if(deletedUserStat.deletedCount === 0){
          return res.status(404).json(`Quiz Statistics With ID ${_id} does not Exist`);
       }else{
          res.status(200).json( `Quiz Statistics With ID ${_id} Was Successfully Deleted`);
       }
      }) 
  

  router.get('/allUsers', async(req, res)=>{
    const allUsers = await User.find().sort({matric : 1});
    return res.status(200).json(allUsers);
       });
  
 
      router.get('/allComplains', async(req, res)=>{
          const allComplains = await Complain.find().sort({level : 1});
           return res.status(200).json(allComplains);
      });
      
  //Get quiz statistics
  router.get('/playerStat',  async(req, res)=>{
  
      const allStat = await Quiz_Statistics.find().sort({score: 1, date: 1});
       return res.status(200).json(allStat);
       }); 

      router.get("/landingPage",  (req, res) => {
        const {role} = req.user
            if (role === "admin") {
              res.status(200).json({
                message: {
                  msgBody: "Welcome to the Admin Page",
                  msgError: false,
                }
              });
            }else{
              res.status(400).json({
                message: {
                  msgBody: "Sorry you are restricted from accessing this page!!!",
                  msgError: false,
                }
              })
            }
        }
      );

      router.post('/complain', async (req, res)=>{
        const { level,matric, complain} = req.body;
        const complainResult = complainSchema.validate(req.body, {
          abortEarly: false,
        });
        if (complainResult.error) {
          return res.status(400).json({
            message: {
              msgBody:
                "Oops!!! Sending complain Failed Please Enter All Fields information Correctly.",
              msgError: true,
            },
          });
        }
        
        if (matric.toString().length !== 9) {
          return res.status(400).json({
            message: {
              msgBody: "Please!!! Enter A Valid Matric Number",
              msgError: true,
            },
          });
        }
        
        const complainData = { level,matric, complain}
        const newComplain = await Complain.create(complainData);
        
        newComplain.save()
        .then(()=>{
          res.status(201).json("Complain was sucessfully saved to database");
         
        }).catch(() => {
        console.log('Something went wrong')
        })
        })

module.exports = router;
