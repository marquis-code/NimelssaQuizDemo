import React, {useState, useEffect} from 'react';
import {Link, useHistory} from 'react-router-dom';
import './Signin.css';
import { Helmet } from 'react-helmet';
import AuthService from "../Services/AuthService"; 
import Message from "../Components/Helpers/ServerHelperMessage";   
import isEmpty from 'validator/lib/isEmpty';
import { showErrorMsg} from '../Components/Helpers/ClientHelperMessage';
import { showLoading }  from '../Components/Helpers/Loading';
import {setAuthentication, isAuthenticatedUser } from './Helpers/Auth';

const Signin = (props) => {
    let history = useHistory();
    useEffect(() => {
      if(isAuthenticatedUser() && isAuthenticatedUser().role === 'admin'){
        history.push('/landingPage')
      }else if(isAuthenticatedUser() && isAuthenticatedUser().role === 'user'){
        history.push('/play')
      }
    }, [history]) 

    const [user, setUser] = useState({
        matric: "160708004",
        password: "Miles1999@",
        errorMsg: false,
        loading: false
      });

      const {matric, password} = user;

      const [message, setMessage] = useState(null);   

      const handleChange = (e) => {
        setUser({ ...user, errorMsg: "", [e.target.name]: e.target.value });
      };

      const handleSubmit = (e) => {
        e.preventDefault();
        if(  
           isEmpty(matric) || 
           isEmpty(password)
           ) {
           setUser({
              ...user, errorMsg:"All fields are required"
             });
        }else if(matric.toString().length !== 9){
           setUser({
              ...user, errorMsg: 'Invalid Matric Number'
           })
        }else{
          const {matric, password} = user;
          const formData = {matric, password}

          setUser({...user, loading: true});

            AuthService.signin(formData)
           .then((data) => {
            const { user, token } = data;
             setAuthentication(token, user);  

            if(isAuthenticatedUser() && isAuthenticatedUser().role === 'admin'){
               history.push('/landingPage');
            }else if(isAuthenticatedUser() && isAuthenticatedUser().role === 'user'){
               history.push('/play');
            } else{
               setUser({...user, loading: false, errorMsg: "Invalid Login Credentials"});
            }  

           }).catch((err) => {
              console.log(err)
            setUser({...user, loading: false, errorMsg: err.message })
         })  
         }
       };
    
      const showSigninForm = () => (
        <form className='signin-form' onSubmit={handleSubmit} noValidate>
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
        
           <button className="btn btn-primary btn-block" type="submit">Signin</button> 
  
           <p className='text-center text-white'>
                    Dont have an account?
                    <Link to="/signup" style={{textDecoration:"none", listStyleType:"none"}}>Register here</Link>
            </p>

            <p className='text-center text-white'>
                    Forgot password?
                    <Link to="/forgot" style={{textDecoration:"none", listStyleType:"none"}}>Get new password</Link>
            </p>
        </form>
    );

    return (
        <div className='signin-container'>
           <Helmet>
               <title>Nimelssa Quiz-Signin</title>
           </Helmet>
        <div className='row px-3 vh-100'>
          <div className='col-md-5 mx-auto align-self-center'>
          {message ? <Message className='text-center' message={message} /> : null}   
          {user.loading && <div className='text-center pb-1'>{showLoading()}</div>}
          {user.errorMsg && <div className='text-center'>{showErrorMsg(user.errorMsg)}</div>}
          {showSigninForm()}
          </div>
        </div>
     </div>
    )
}

export default Signin;