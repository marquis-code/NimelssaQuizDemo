import React, { useState} from "react";
import { Helmet } from "react-helmet";
import isEmpty from 'validator/lib/isEmpty';
import isEmail from 'validator/lib/isEmail';
import { showLoading }  from '../Components/Helpers/Loading';
import { showErrorMsg, showSuccessMsg } from '../Components/Helpers/ClientHelperMessage';
import axios from 'axios';

const Forgot = (props) => {

  const [user, setUser] = useState({
    email: "",
    errorMsg: false,
    successMsg: false,
    loading: false
  });
 
   const {email} = user;

  const handleChange = (e) => {
    setUser({ ...user, successMsg: "", errorMsg: "", [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if(  
      isEmpty(email) 
      ){
        setUser({
          ...user, errorMsg:"Email field cannot be empty"
        })
      }else if(!isEmail(email)){
        setUser({
           ...user, errorMsg: "Invalid Email"
          });
     }else{
      const {email} = user;
      const payload = { email : email }
      setUser({...user, loading: true});

      axios({
        url: "/users/forgot",
        method: "PUT",
        data: payload,
      })
        .then(() => {
          setUser({
            ...user, 
            loading: false, 
            successMsg: `Please Check ${user.email} for password reset link. RESET LINK IS VALID FOR 30 MINUTES` 
         })
        })
        .catch(() => {
          setUser({
            ...user, 
            loading: false, 
            errorMsg: 'Something went wrong!!!, please check your internet connection and try again.' 
         })
        });
     }
  };

  const showForgotPasswordForm = () => (
    <form className='signin-form' onSubmit={handleSubmit} noValidate>
    
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

       <button className="btn btn-primary btn-block" type="submit">Submit</button> 
    </form>
);

  return (
    <div className='signup-container'>
    <Helmet>
          <title>Nimelssa Quiz-Forgot password</title>
      </Helmet>
<div className='row px-3 vh-100'>
<div className='col-md-5 mx-auto align-self-center'> 
{user.loading && <div className='text-center pb-1'>{showLoading()}</div>}
{user.errorMsg && <div className='text-center'>{showErrorMsg(user.errorMsg)}</div>} 
{user.successMsg && <div className='text-center'>{showSuccessMsg(user.successMsg)}</div>} 
{showForgotPasswordForm()}
</div>
</div>
</div>
  );
};

export default Forgot;
