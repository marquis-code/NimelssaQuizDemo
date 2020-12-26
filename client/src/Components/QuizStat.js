import React, { Component, Fragment } from 'react';
import axios from 'axios';
import QuizStatList from './QuizStatList';
import M from 'materialize-css';

class QuizStat extends Component{
constructor(props){
    super(props);
    this.state = {
        stats : [],
        errorMessage : ""
     }
}

getStat(){
    axios.get('/users/playerStat')
    .then((responce)=>{
    const data = responce.data;
    this.setState({
        stats : data
    });
})
.catch(()=>{
      this.setState({errorMessage : "Error retrieving Quiz Statistics data!!!"});
    });
}

componentDidMount(){
    this.getStat();
   }

   HandleDeleteStat = (id) =>{
       axios.delete(`/users/deleteUserStat/${id}`)
       .then(() => {
        M.toast({ 
          html: 'User Statistics was successfully deleted ',
          classes: "tost-valid",
          displayLength: 1500,
        })
        this.getStat();
      })
      .catch(() => {
        M.toast({ 
          html: 'SOMETHING HAPPNED, PLEASE TRY AGAIN ',
          classes: "tost-invalid",
          displayLength: 1500,
        })
      });
   }

render(){
    const {stats, errorMessage} = this.state;
    return(
      <Fragment>
                  {stats.map((Stat, index )=>(
                   stats.length > 0 ? (
                <Fragment key={index}>
                    <QuizStatList CompletedQuizStat={Stat} DeleteUserStat={this.HandleDeleteStat}  /> 
               </Fragment>
                   ) : (
                     <h1>
                        No Statistics Available... 
                     </h1>
                   )
                ))} 
                { errorMessage ? <h1>{errorMessage}</h1> : null }
        </Fragment>
    )
}
}
export default QuizStat;