import React, {Fragment, Component } from "react";
import axios from "axios";
import PastQuestionsList from './PastQuestionsList';

class PastQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      errorMessage: ""
    }; 
  }

  getPastQuestions(){
    axios
      .get("/quiz/getPastQuestions")
      .then((responce) => {
        let data = responce.data;
        this.setState({
          questions: data
        });
      })
      .catch(() => {
        this.setState({errorMessage : "Error retrieving Quiz Data!!!!"})
      });
}

  componentDidMount() {
       this.getPastQuestions();
  } 

  render(){
    const {questions, errorMessage} = this.state;
      return(
        <Fragment>
        {questions.map((Question, index)=>(
           questions.length > 0 ? (
        <Fragment  key={index}> 
            <PastQuestionsList approvedPastQuestions={Question}/> 
       </Fragment>
           ) : (<h2>
              No Past questions Found.....
           </h2>)
        ))}

           {errorMessage ? <h1>{errorMessage}</h1> : null}
    </Fragment>
      )
  }
}

  export default PastQuestions;