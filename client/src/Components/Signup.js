import React, { useState, useRef, useEffect } from "react"
import AuthService from "../Services/AuthService"; 
import Message from "../Components/Helpers/ServerHelperMessage";  
import { Link, useHistory} from "react-router-dom";
import './Signup.css';
import { Helmet } from 'react-helmet';
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import equals from 'validator/lib/equals'; 
import { showErrorMsg, showSuccessMsg } from '../Components/Helpers/ClientHelperMessage';
import { showLoading }  from '../Components/Helpers/Loading';
import {isAuthenticatedUser } from './Helpers/Auth';

const Signup = (props) => {
   let history = useHistory();
   useEffect(() => {
     if(isAuthenticatedUser() && isAuthenticatedUser().role === 'admin'){
       history.push('/landingPage')
     }else if(isAuthenticatedUser() && isAuthenticatedUser().role === 'user'){
       history.push('/play')
     }
   }, [history]) 
  const [user, setUser] = useState({
    username: "Marquis",
    matric: "160708004",
    password: "Miles1999@",
    email: "abahmarquis@gmail.com",
    confirmPassword: "Miles1999@",
    errorMsg: false,
    successMsg: false,
    loading: false
  });

  const {username, matric, password, confirmPassword, email} = user;
   
  const [message, setMessage] = useState(null);   
  let timerID = useRef(null);

  useEffect(() => {
    return () => {
      clearTimeout(timerID);
    };
  }, []);

  const handleChange = (e) => {
    setUser({ ...user, successMsg: "", errorMsg: "", [e.target.name]: e.target.value });
  };

 const resetForm = () => {
    setUser({ username: "", matric: "", password: "", confirmPassword: "", email: "" });
  }; 

  const handleSubmit = (e) => {
    e.preventDefault();
    if(  
       isEmpty(username) || 
       isEmpty(matric) || 
       isEmpty(email) || 
       isEmpty(password) || 
       isEmpty(confirmPassword)
       ) {
       setUser({
          ...user, errorMsg:"All fields are required"
         });
    }else if(!isEmail(email)){
       setUser({
          ...user, errorMsg: "Invalid Email"
         });
    }else if(!equals(password, confirmPassword)){
      setUser({
         ...user, errorMsg: "Passwords do not match"
      });
    }else if(matric.toString().length !== 9){
       setUser({
          ...user, errorMsg: 'Invalid Matric Number'
       })
    }else{
      const {username, matric, password, email} = user;
      const formData = {username, matric, password, email}
       setUser({...user, loading: true});
        AuthService.signup(formData)
       .then((data) => {
         const { message } = data;
         console.log(message);
         setUser({
            ...user, 
            loading: false, 
            successMsg: message.msgBody 
         })
        setMessage(message);    
         resetForm();
         if (!message.msgError) {
           timerID = setTimeout(() => {
             props.history.push("/signin");
           }, 1000);
         } 
       }).catch((err) => {
         const { message } = err;
         setUser({
            ...user, 
            loading: false, 
            errorMsg: message.msgBody
         })
      }) 
     }
   };

   const showSignupForm = () => (
      <form className='signup-form' onSubmit={handleSubmit} noValidate>
      <div className='form-group input-group'>
          <div className='input-group-prepend'>
             <span className='input-group-text'>
                <i className='fa fa-user'></i>
             </span>
          </div>
          <input
                autoComplete="new-password"
                type="text"
                value={username}
                name="username"
                onChange={handleChange}
                className="form-control"
                placeholder="Name"
          />
      </div>

       <div className='form-group input-group'>
          <div className='input-group-prepend'>
             <span className='input-group-text'>
                <i className='fa fa-user'></i>
             </span>
          </div>
          <input
               autoComplete="new-password"
               type="number"
               name="matric"
               value={matric}
               onChange={handleChange}
               className="form-control"
               placeholder="Matric"
          />
      </div>

       <div className='form-group input-group'>
          <div className='input-group-prepend'>
             <span className='input-group-text'>
                <i className='fa fa-envelope'></i>
             </span>
          </div>
          <input
                autoComplete="new-password"
                type="email"
                name="email"
                onChange={handleChange}
                className="form-control"
                placeholder="Email address"
                value={email}
          />
      </div>

       <div className='form-group input-group'>
          <div className='input-group-prepend'>
             <span className='input-group-text'>
                <i className='fa fa-lock'></i>
             </span>
          </div>
          <input
              autoComplete="new-password"
              type="password"
              name="password"
              value={password}
              onChange={handleChange}
              className="form-control"
              placeholder="Create password"
          /> 
      </div>

      <div className='form-group input-group'>
          <div className='input-group-prepend'>
             <span className='input-group-text'>
                <i className='fa fa-lock'></i>
             </span>
          </div>
          <input
              autoComplete="new-password"
              type="password"
              name="confirmPassword"
              value={confirmPassword}
              onChange={handleChange}
              className="form-control"
              placeholder="Confirm password"
          /> 
      </div>
      
         <button className="btn btn-primary btn-block" type="submit">Signup</button> 

         <p className='text-center text-white'>
                  Have an account?
                  <Link to="/signin" style={{textDecoration:"none", listStyleType:"none"}}>Signin</Link>
          </p>
      </form>
  );

  return (
   <div className='signup-container'>
         <Helmet>
               <title>Nimelssa Quiz-Signup</title>
           </Helmet>
   <div className='row px-3 vh-100'>
     <div className='col-md-5 mx-auto align-self-center'>
     {message ? <Message className='text-center' message={message} /> : null}   
     {user.loading && <div className='text-center pb-1'>{showLoading()}</div>}
     {user.errorMsg && <div className='text-center'>{showErrorMsg(user.errorMsg)}</div>} 
     {user.successMsg && <div className='text-center'>{showSuccessMsg(user.successMsg)}</div>} 
     {showSignupForm()}
     </div>
   </div>
</div>
  );
};

export default Signup;

