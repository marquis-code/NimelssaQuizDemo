import React,{Fragment, useEffect, useState} from 'react';
import { Helmet } from 'react-helmet';
import Loader from 'react-loader-spinner';
import Moment from "react-moment";

function UserComplainList(props) {
   const {userComplains} = props;
   const [isLoading, setIsLoading] = useState(true);

   const userComplainPage = () => {
       return(
        <Fragment>
        <Helmet>
          <title>Nimelssa Quiz-complain List</title>
        </Helmet>
            <div className="container">
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr>
                    <th scope="col">Date</th>
                    <th scope="col">matric</th>
                    <th scope="col">Level</th>
                    <th scope="col">Complain</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {userComplains.date}
                        </Moment>
                      </td>
                      <td>{userComplains.matric}</td>
                      <td>{userComplains.level}</td>
                      <td>{userComplains.complain}</td>
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

    return isLoading ? <Loader className="loader text-center" type="Ball-Triangle" color="00BFFF" height={100} width={100}/> : userComplainPage();
}

export default UserComplainList;
