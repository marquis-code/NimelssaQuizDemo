import React from 'react'
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";

const UserDashboard = () =>  {
    const showAdminHeader = () => (
        <div className='bg-dark text-white py-4'>
          <div className='row'>
            <div className='col-md-6'>
              <h1>
      <i className='fas fa-home'> Welcome to User Dashboard </i>
              </h1>
            </div>
          </div>
        </div>
      )
    
    
     const showActionBtns = () => (
        <div className='bg-light my-2'>
         <div className='container'>
           <div className='row pb-3'>
             <div className='col-md-4 my-1'>
                 <button className='btn btn-outline-success btn-block'>
                    <i className='fas fa-money-check-alt'></i> <Link to="/pastQuestionsList">View past questions</Link> 
                 </button>
             </div>
  
    
             <div className='col-md-4 my-1'>
                 <button className='btn btn-outline-danger btn-block'>
                    <i className='fas fa-money-check-alt'></i> <Link to="/complain">Complain</Link> 
                 </button>
             </div>
           </div>
         </div>
        </div>
      )
return(
    <section>
    <Helmet>
      <title>Nimelssa Quiz-User page</title>
   </Helmet>
    {showAdminHeader()}
    {showActionBtns()}
</section>
)}

export default UserDashboard;

