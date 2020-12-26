import React from 'react';
import './Home.css';
import {Link} from 'react-router-dom';
import {emojify} from 'react-emojione'; 

const Home = () => {
    
    const showHome = () => (
        <div class="jumbotron">
             <div class="container"> 
            <h5 style={{textAlign:"center"}} className="display-3">Welcome to NIMELSSA Quiz</h5>
           <p className="lead col-md-8 offset-md-2"  style={{textAlign:"center"}}>Test of <b>Speed</b>, <b>Intelligence</b> and <b>Accuracy</b>{emojify('\u2728', {output: 'unicode'})}</p> 
          <hr className="my-2" />
        <p className="lead">
       
       <button className="btn btn-lg btn-primary btn-block text-decoration-none">
            <Link to="/instructions"><span style={{color: "white", fontWeight: "bolder", textDecoration:"none", listStyleType:"none" }}>Click to begin</span></Link>
          </button>
        </p>
             </div> 
      </div>
    )
    return(
        <div className='home-container'>
        <div className='row px-3 vh-100'>
          <div className='col-md-5 mx-auto align-self-center'>
            {showHome()}
          </div>
        </div>
    </div>
    );
}

export default Home;