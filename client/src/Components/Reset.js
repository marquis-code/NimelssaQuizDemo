import React, { useState, useEffect, Fragment } from "react";
import { Helmet } from "react-helmet";
import M from 'materialize-css';
import axios from 'axios';
import { Button } from "reactstrap";
import JWT from 'jsonwebtoken';
import { FontAwesomeIcon} from '@fortawesome/react-fontawesome';
import {faEye} from '@fortawesome/free-solid-svg-icons';


const eye = <FontAwesomeIcon icon={faEye} />;

const Reset = ({ match }) => {
    const [passwordShown, setPasswordShown] = useState(false)
  const [user, setUser] = useState({
    username: '',
    token: '',
    newPassword: ''
  });


  useEffect(() => {
    let token = match.params.token;
    let { username } = JWT.decode(token);
    if (token) {
        setUser({ ...user, username, token });
    }
}, []);

const togglePasswordVisibility = () => {
    setPasswordShown(passwordShown ? false : true);
  }
  

const { username, token, newPassword } = user;

const handleChange = event => {
    setUser({ ...user, newPassword: event.target.value });
};

const resetForm = () => {
  setUser({ newPassword: ""});
};

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser({ ...user });
  axios({
    url: "/users/reset",
    method: "PUT",
    data: {newPassword, resetPasswordLink: token}
  })
    .then(() => {
      M.toast({ 
        html: "Congratulations!!! Exit this page and proceed to Login with your new password",
        classes: "tost-valid",
        displayLength: 3000,
      })
      resetForm();
    })
    .catch(() => {
      M.toast({ 
        html:  "RESET PASSWORD ERROR",
        classes: "tost-invalid",
        displayLength: 3000,
      })
        setUser({ ...user });
    });
  };


  return (
    <Fragment>
      <Helmet>
        <title>Nimelssa Quiz - reset password page</title>
      </Helmet>
      <form onSubmit={handleSubmit}>


      <div className="row">
          <div className="col s12 m4 offset-m0">
            <div className="card z-depth-4">
              <div className="card-content black white-text">
               <span className="card-title">Hello {username}, Type your new password&nbsp;<i class="fas fa-user-shield"></i>
             <span className="sr-only">(current)</span></span>
              </div>
              <div className="card-content">
              <div className="wrap-input100 input-field">
            <i className="material-icons prefix">edit</i>
                <input
                    autoComplete="new-password"
                    onChange={handleChange}
                    value={newPassword}
                    type={passwordShown ? "text" : "password"}
                    className="input100 form-control form-control-lg"
                    placeholder="Type new password"
                    required
                />
                <i className="passEye" onClick={togglePasswordVisibility}>{eye}</i>
                 <span className="focus-input100"></span>
                  <label htmlFor="password" className="sr-only">
                  {" "}
                    Password:{" "}
                  </label>
                  <small id="passwordHelpInline" className="form-text text-muted">
                   Your password must be at least 8 characters long and 
                   must contain at least an uppercase letter, lowercase letter, 
                   a number, and at least one non-alphanumeric symbol(e.g. !@#\$%\^&\*) 
                   and must not contain spaces or emoji.
                  </small>
              </div>
                <Button  block={true} type="submit" className="btn btn-success mt-3">
                   <span>Submit&nbsp;<i className="fas fa-sign-in-alt"></i>
                  <span className="sr-only">(current)</span>
                 </span>
                 </Button>
                <hr />
              </div>
            </div>
          </div>
        </div>
        </form>
    </Fragment>
  );
};

export default Reset;
