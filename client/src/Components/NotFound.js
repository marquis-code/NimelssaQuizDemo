import React,{Fragment, Component} from 'react';
import {Link} from 'react-router-dom';

export default class NotFound extends Component{
render(){
    return(
        <Fragment>
         <div className="notFound">
         <h1 className="errorText">404 Page NotFound</h1>
         <h3 className="errorText">You seem lost</h3>
          <p className="errorTextParagraph">The page you are trying to reach doesn't exist</p>
          <h5>Click to return to
                <Link to="/"> Home page</Link>
          </h5>
         </div>
        </Fragment>
    )
}
}
