import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticatedUser } from './Helpers/Auth';

const UserRoute = ({component:Component, ...rest}) => {
return(
<Route 
  {...rest}
  render={(props) => 
    isAuthenticatedUser() && isAuthenticatedUser().role === 'user' ? (
        <Component {...props} />
    ) : (
        <Redirect to='/signin' />
    )
}
/>
)}

export default UserRoute;