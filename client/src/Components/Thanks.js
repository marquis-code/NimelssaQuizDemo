import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import {emojify} from 'react-emojione'; 

const Thanks = () => {
    
    const showThanks = () => (
        <div class="jumbotron">
             <div class="container"> 
            <h5 style={{textAlign:"center"}} className="display-3">Congratulations</h5>
           <p className="lead col-md-8 offset-md-2"  style={{textAlign:"center"}}>Thanks For Participating in this week's Nimelssa Online Quiz. {emojify('^__^', {output: 'unicode'})}</p> 
           <p className="lead col-md-8 offset-md-2"  style={{textAlign:"center"}}>The winner will be announced by the academic committee.</p>
         <p className="lead col-md-8 offset-md-2"  style={{textAlign:"center"}}>Have a great weekend.</p>
          <hr className="my-2" />
        <p className="lead">
       
       <button className="btn btn-lg btn-primary btn-block text-decoration-none">
            <Link to="/"><span style={{color: "white", fontWeight: "bolder", textDecoration:"none", listStyleType:"none" }}>Return Home</span></Link>
          </button>
          <button className="btn btn-lg btn-primary btn-block text-decoration-none">
            <Link to="/dashboard"><span style={{color: "white", fontWeight: "bolder", textDecoration:"none", listStyleType:"none" }}>Access Dashboard</span></Link>
          </button>
        </p>
             </div> 
      </div>
    )
    return(
        <div className='home-container'>
        <div className='row px-3 vh-100'>
          <div className='col-md-5 mx-auto align-self-center'>
            {showThanks()}
          </div>
        </div>
    </div>
    );
}

export default Thanks;