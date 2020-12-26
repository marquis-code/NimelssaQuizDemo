import React, { Fragment, useEffect, useState } from "react";
import { Helmet } from "react-helmet";
import Moment from "react-moment";
import { Link } from "react-router-dom";
import Loader from 'react-loader-spinner';
import {Table} from 'react-bootstrap';

function QuizStatList(props) {
  const { CompletedQuizStat, DeleteUserStat } = props;
  const [isLoading, setIsLoading] = useState(true);
  const quizStatListPage = () => {
    return(
      <Fragment>
      <Helmet>
        <title>Nimelssa Quiz-Users Quiz-statistics</title>
      </Helmet>
      <div className="container">
        <Table responsive="sm" className="table table-striped table-bordered">
          <thead className="thead-dark">
            <tr>
              <th scope="col">Matric</th>
              <th scope="col">Score</th>
              <th scope="col">Questions Answered</th>
              <th scope="col">Correct Answers</th>
              <th scope="col">Wrong Answers</th>
              <th scope="col">Fifty Fifty used</th>
              <th scope="col">Hints Used</th>
              <th scope="col">Date submitted</th>
              <th scope="col">Time submitted</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>{CompletedQuizStat.matric}</td>
              <td>{CompletedQuizStat.score}</td>
              <td>{CompletedQuizStat.numberOfAnsweredQuestions}</td>
              <td>{CompletedQuizStat.numberOfAnsweredQuestions}</td>
              <td>{CompletedQuizStat.correctAnswers}</td>
              <td>{CompletedQuizStat.fiftyFiftyUsed}</td>
              <td>{CompletedQuizStat.hintsUsed}</td>
              <td>
                <Moment format="DD/MM/YYYY">
                  {CompletedQuizStat.date}
                </Moment>
              </td>
              <td>
                <Moment trim format="hh : mm : ss a">
                  {CompletedQuizStat.date}
                </Moment>
              </td>
              <td>
                <Link
                  className="btn btn-warning"
                  to="#"
                  onClick={() => DeleteUserStat(CompletedQuizStat._id)}
                >
                  <i className="fa fa-trash" aria-hidden="true"></i>
                  &nbsp;Delete
                </Link>
              </td>
            </tr>
          </tbody>
        </Table>
      </div>
    </Fragment>
    )
  }

  useEffect(()=> {
  let interval = setTimeout(()=> {setIsLoading(false)}, 2000);
  return () => {
    if(interval){
      clearInterval(interval);
      interval = 0;
    }
  }
  }, [])

  return isLoading ? <Loader className="loader text-center" type="ThreeDots" color="00BFFF" height={100} width={100}/> : quizStatListPage();
}

export default QuizStatList;
