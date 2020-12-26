import React,{Fragment, useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { Helmet } from 'react-helmet';
import Loader from 'react-loader-spinner';

function UsersList(props) {
   const {RegisteredUsers, DeleteUser} = props;
   const [isLoading, setIsLoading] = useState(true);

   const userListPage = () => {
       return(
        <Fragment>
        <Helmet>
          <title>Nimelssa Quiz-Users List</title>
        </Helmet>
            <div className="container">
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Name</th>
                    <th scope="col">Matric</th>
                    <th scope="col">Role</th>
                    <th scope="col">Actions</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>{RegisteredUsers.username}</td>
                      <td>{RegisteredUsers.matric}</td>
                      <td>{RegisteredUsers.role}</td>
                      <td>
                      <Link
                          className="btn btn-warning"
                          to="#"
                          onClick={() => DeleteUser(RegisteredUsers._id)}
                        >
                          <i className="fa fa-trash" aria-hidden="true"></i>
                          &nbsp;Delete
                        </Link>
                      </td>
                   </tr>   
                </tbody> 
              </table>
            </div>
          </Fragment>
       )
   }

   useEffect(()=> {
     let interval = setTimeout(() => {setIsLoading(false)}, 2000);
     return () => {
       if(interval){
         clearInterval(interval);
         interval = 0;
       }
     }
   }, [])

    return isLoading ? <Loader className="loader text-center" type="Ball-Triangle" color="00BFFF" height={100} width={100}/> : userListPage();
}

export default UsersList;
