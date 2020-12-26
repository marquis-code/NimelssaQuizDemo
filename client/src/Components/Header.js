import React, {Fragment} from 'react';
import {Link, withRouter} from 'react-router-dom'
import {isAuthenticatedUser, logout } from './Helpers/Auth';

const Header = ({history}) => {
    const handleLogout = (e) => { 
        logout(() => {
             history.push('/')
        });
    }
const showNavigation = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-blue">
           <Link to='/' className="navbar-brand">Nimelssa</Link>
           <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
          </button>
          
        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
         <ul className="navbar-nav ml-auto mt-2 mt-lg-0">
             {!isAuthenticatedUser() && (
                <Fragment>
                <li className="nav-item">
                    <Link to='/' className="nav-link"><i className='fas fa-home'></i> Home</Link>
                </li>
                <li className="nav-item">
                    <Link to='/signup' className="nav-link"><i className='fas fa-edit'></i> Signup</Link>
                </li>
                <li className="nav-item">
                    <Link to='/signin' className="nav-link"><i className='fas fa-sign-in-alt'></i> Signin</Link>
                </li>
                </Fragment>
             )}

            {isAuthenticatedUser() && isAuthenticatedUser().role === 'user' && (
                <Fragment>
                <li className="nav-item">
                    <Link to='/dashboard' className="nav-link"><i className="fas fa-home"></i> Dashboard</Link>
                </li>
                </Fragment>
             )}

            {isAuthenticatedUser() && isAuthenticatedUser().role === 'admin' && (
                <Fragment>
                <li className="nav-item">
                    <Link to='/landingPage' className="nav-link"><i className="fas fa-user-shield"></i> Dashboard</Link>
                </li>
                </Fragment>
             )}

            {isAuthenticatedUser() && (
                <Fragment>
                <li className="nav-link">
                    <button onClick={handleLogout} className="btn btn-link text-secondary text-decoration-none pl-0"><i className="fas fa-sign-out-alt"></i> Logout</button>
                </li>
                </Fragment>
             )}
         </ul>
      </div>

    </nav>
);

     return (
         <header id='header'>
            {showNavigation()}
         </header>
     )
};

export default withRouter(Header);