import React, { Component} from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet";
import Moment from 'react-moment';
import M from 'materialize-css';

class AdminDashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Questions: [],
    };
  }

  getQuiz = () => {
    axios
      .get("/quiz/questions")
      .then((responce) => {
        const data = responce.data;
        this.setState({ Questions: data });
      })
      .catch(() => {
        M.toast({ 
          html: "Something Failed",
          classes: "tost-invalid",
          displayLength: 3000,
        })
      });
  };

  componentDidMount = () => {
    this.getQuiz();
  };

  onDelete = (id) => {
    axios
      .delete(`/quiz/questions/${id}`)
      .then(() => {
        M.toast({ 
          html: "Question was successfully deleted",
          classes: "tost-valid",
          displayLength: 1500,
        })
        this.getQuiz();
      })
      .catch(() => {
        M.toast({ 
          html: "!!! Something went wrong when fetching quiz questions ",
          classes: "tost-invalid",
          displayLength: 1500,
        })
      });
  };

  showAdminHeader = () => (
    <div className='bg-dark text-white py-4'>
      <div className='row'>
        <div className='col-md-6'>
          <h1>
  <i className='fas fa-home'> Welcome Admin</i>
          </h1>
        </div>
      </div>
    </div>
  )

  showTable = () => (
    <div class="table-responsive">
    <table class="table table-striped table-hover">
      <thead class="table-dark">
        <tr>
          <th scope="col">Question ID</th>
          <th scope="col">Date Created</th>
          <th scope="col">Question Category</th>
          <th scope="col">Question</th>
          <th scope="col">OptionA</th>
          <th scope="col">OptionB</th>
          <th scope="col">OptionC</th>
          <th scope="col">OptionD</th>
          <th scope="col">Answer</th>
          <th scope="col">Actions</th>
        </tr>
      </thead>
      <tbody>
        {this.state.Questions.map((posts, index) => (
          <tr key={index}>
            <th scope="row">{index}</th>
            <td><Moment format="DD/MM/YYYY">{posts.date}</Moment></td>
            <td>{posts.category}</td>
            <td>
              <Link to={`/quiz/${posts._id}`}>{posts.question}</Link>
            </td>
            <td>{posts.optionA}</td>
            <td>{posts.optionB}</td>
            <td>{posts.optionC}</td>
            <td>{posts.optionD}</td>
            <td>{posts.answer}</td>
            <td>
              <Link
                className="btn btn-warning"
                to={`/editPost/${posts._id}`}
              >
               <i className='fas fa-edit' aria-hidden="true"></i>
                &nbsp;Edit
              </Link>
              &nbsp;
              <Link
                className="btn btn-warning"
                to="#"
                onClick={() => this.onDelete(posts._id)}
              >
                <i className="fa fa-trash" aria-hidden="true"></i>
                &nbsp;Delete
              </Link>
            </td>
          </tr>
        ))} 
      </tbody>
    </table>
  </div>
  )

  showActionBtns = () => (
    <div className='bg-light my-2'>
     <div className='container'>
       <div className='row pb-3'>
         <div className='col-md-4 my-1'>
             <button className='btn btn-outline-info btn-block'>
                <i className='fas fa-plus'></i> <Link to="/questions">Create New Question</Link> 
             </button>
         </div>

         <div className='col-md-4 my-1'>
             <button className='btn btn-outline-warning btn-block'>
                <i className='fas fa-money-check-alt'></i> <Link to="/users">View Users</Link> 
             </button>
         </div>

         <div className='col-md-4 my-1'>
             <button className='btn btn-outline-success btn-block'>
                <i className='fas fa-money-check-alt'></i> <Link to="/quizStat">View Quiz Statistics</Link> 
             </button>
         </div>

         <div className='col-md-4 my-1'>
             <button className='btn btn-outline-secondary btn-block'>
                <i className='fas fa-plus'></i> <Link to="/pastQuestion">Add past questions</Link> 
             </button>
         </div>

         <div className='col-md-4 my-1'>
             <button className='btn btn-outline-danger btn-block'>
                <i className='fas fa-money-check-alt'></i> <Link to="/userComplains">View Complains</Link> 
             </button>
         </div>
       </div>
     </div>
    </div>
  )

  render() {
    return (
    <section>
          <Helmet>
            <title>Nimelssa Quiz-Admin page</title>
         </Helmet>
          {this.showAdminHeader()}
          {this.showTable()}
          {this.showActionBtns()}
    </section>
    );
  }
}

export default AdminDashboard;

