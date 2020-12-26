import React, { Component} from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { showErrorMsg, showSuccessMsg } from '../Components/Helpers/ClientHelperMessage';
import { showLoading }  from '../Components/Helpers/Loading';
import isEmpty from 'validator/lib/isEmpty';

class CreatePastQuestions extends Component {
  constructor(props) {
    super(props);
    this.state = {
      category: "",
      question: "",
      answer: "",
      errorMsg: false,
      successMsg: false,
      loading: false
    };
    this.categoryRef = React.createRef();
  }

  componentDidMount() {
    this.categoryRef.current.focus();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value, successMsg: "", errorMsg: "" });
  };

  submit = (event) => {
    event.preventDefault();
    const {
      question,
      category,
      answer,
    } = this.state;

    if (
      isEmpty(question) || 
      isEmpty(category) || 
      isEmpty(answer) 
    ) {
      this.setState({
        category,
        question,
        answer,
        errorMsg: "All fields are required"
      });
    }else{
      this.setState({
        category,
        question,
        answer,
        loading: true
      });
      const payload = {
        category: this.state.category,
        question: this.state.question,
        answer: this.state.answer
      };

      axios({
        url: "/users/pastQuestions",
        method: "POST",
        data: payload,
      })
        .then(() => {
          this.setState({
            category,
            question,
            answer,
            loading: false, 
            successMsg: "New Past Question wsas created" 
          });
          this.resetUserInput();
        })
        .catch(() => {
          this.setState({
            category,
            question,
            answer,
            loading: false, 
            successMsg: "Something went wrong!!" 
          });
        });
    }};

  resetUserInput = () => {
    this.setState({
      category: "",
      question: "",
      answer: ""
    });
  };

  render() {
    return (
      <div className='post-container'>
      <Helmet>
       <title>Nimelssa Online Quiz-Create Quiz page</title>
     </Helmet>
 <div className='row px-3 vh-100'>
 <div className='col-md-5 mx-auto align-self-center'> 
        {this.state.loading && <div className='text-center pb-1'>{showLoading()}</div>}
     {this.state.errorMsg && <div className='text-center'>{showErrorMsg(this.state.errorMsg)}</div>} 
     {this.state.successMsg && <div className='text-center'>{showSuccessMsg(this.state.successMsg)}</div>} 
        <form onSubmit={this.submit}>
         <div class="form-floating mb-3">
              <input 
               autoComplete="new-password"
               ref={this.categoryRef}
              type="text" 
              class="form-control" 
              id="floatingInput" 
              value={this.state.category}
              name="category"
              placeholder="Question Category"
              onChange={this.handleChange}
              />
              <label for="floatingInput">Question Category</label>
          </div>

      
          <div class="form-floating mb-3">
              <input 
               autoComplete="new-password"
              type="text" 
              class="form-control" 
              id="floatingInput" 
              value={this.state.question}
              name="question"
              placeholder="Question"
              onChange={this.handleChange}
              />
              <label for="floatingInput">Question</label>
          </div>

          <div class="form-floating mb-3">
              <input 
               autoComplete="new-password"
              type="text" 
              class="form-control" 
              id="floatingInput" 
              value={this.state.answer}
              name="answer"
              placeholder="Answer"
              onChange={this.handleChange}
              />
              <label for="floatingInput">Answer</label>
          </div>

          <button className="btn btn-lg btn-primary btn-block" type="submit">
           <i className="far fa-check-square"></i>
           <span> &nbsp;Create Question</span>
           </button> 
        </form>
        </div>
    </div>
      </div>
    );
  }
}

export default CreatePastQuestions;
