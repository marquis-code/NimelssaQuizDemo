import React from 'react';
import {Route, Redirect} from 'react-router-dom';
import {isAuthenticatedUser } from './Helpers/Auth';

const AdminRoute = ({component: Component, ...rest}) => {
  return(
     <Route
      {...rest}
      render={(props) =>
        isAuthenticatedUser() && isAuthenticatedUser().role === 'admin' ? (
            <Component {...props} />
        ) : (
            <Redirect to='/signin' />
        )
    }
     />
  )}

export default AdminRoute;