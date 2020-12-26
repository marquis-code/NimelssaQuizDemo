import React,{Fragment, useEffect, useState} from 'react';
import { Helmet } from 'react-helmet';
import Loader from 'react-loader-spinner';
import Moment from "react-moment";

function PastQuestionsList(props) {
   const {approvedPastQuestions} = props;
   const [isLoading, setIsLoading] = useState(true);

   const pastQuestionList = () => {
       return(
        <Fragment>
        <Helmet>
          <title>Nimelssa Quiz-past questions List</title>
        </Helmet>
            <div className="container">
              <table className="table table-striped table-bordered">
                <thead className="thead-dark">
                <tr> 
                    <th scope="col">Quiz Date</th>
                    <th scope="col">Category</th>
                    <th scope="col">Question</th>
                    <th scope="col">Answer</th>
                </tr>
                </thead>
                <tbody>
                    <tr>
                      <td>
                        <Moment format="DD/MM/YYYY">
                          {approvedPastQuestions.date}
                        </Moment>
                     </td>
                      <td>{approvedPastQuestions.category}</td>
                      <td>{approvedPastQuestions.question}</td>
                      <td>{approvedPastQuestions.answer}</td>
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

    return isLoading ? <Loader className="loader" type="Ball-Grid" color="00BFFF" height={100} width={100}/> : pastQuestionList();
}

export default PastQuestionsList;
