import React, { Component} from "react";
import { Helmet } from "react-helmet";
import axios from "axios";
import { showErrorMsg, showSuccessMsg } from '../Components/Helpers/ClientHelperMessage';
import { showLoading }  from '../Components/Helpers/Loading';
import isEmpty from 'validator/lib/isEmpty';


class Complain extends Component {
  constructor(props) {
    super(props);
    this.state = {
      level: "",
      matric: "",
      complain: "",
      errorMsg: false,
      successMsg: false,
      loading: false
    };
    this.matricRef = React.createRef();
  }

  componentDidMount() {
    this.matricRef.current.focus();
  }

  handleChange = ({ target }) => {
    const { name, value } = target;
    this.setState({ [name]: value,  successMsg: "", errorMsg: "" });
  };


  submit = (event) => {
    event.preventDefault();
    const {level,matric,complain} = this.state;

    if (
      isEmpty(level) || 
    isEmpty(matric) || 
    isEmpty(complain)
    ) {
      this.setState({
        complain,
        matric,
        level,
        errorMsg: "All fields are required"
      });
    }else{
      this.setState({
        complain,
        matric,
        level,
        loading: true
      });
      const payload = {
        level: this.state.level,
        matric: this.state.matric,
        complain: this.state.complain
    };

      axios({
        url: "/users/complain",
        method: "POST",
        data: payload,
      })
        .then(() => {
          this.setState({
            complain,
            level,
            matric,
            loading: false, 
            successMsg: "Your Complain was successfully submitted" 
          });
          this.resetUserInput();
        })
        .catch(() => {
          this.setState({
            complain,
            level,
            matric,
            loading: false, 
            successMsg: "Internal server error, Please try again later." 
          });
        });
    }
  };

  resetUserInput = () => {
    this.setState({
        level: "",
        matric: "",
        complain: ""
    });
  };

  render() {
    return (
      <div className='post-container'>
        <Helmet>
          <title>Nimelssa Online Quiz-Complain page</title>
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
               ref={this.matricRef}
              type="number" 
              class="form-control" 
              id="floatingInput" 
              value={this.state.matric}
              name="matric"
              placeholder="Matric"
              onChange={this.handleChange}
              />
              <label for="floatingInput">Matric</label>
          </div>

          <div class="form-floating mb-3">
              <input 
               autoComplete="new-password"
              type="number" 
              class="form-control" 
              id="floatingInput" 
              value={this.state.level}
              name="level"
              placeholder="Level (e.g. 100)"
              onChange={this.handleChange}
              />
              <label for="floatingInput">Level</label>
          </div>

            <div class="form-floating mb-3">
              <textarea 
               autoComplete="new-password"
               rows={3}
               type="text"
               cols={10}
              class="form-control" 
              id="floatingInput" 
              value={this.state.complain}
              name="complain"
              placeholder="Complain"
              onChange={this.handleChange}
              />
              <label for="floatingInput">Complain</label>
          </div>

           <button className="btn btn-lg btn-primary btn-block" type="submit">
           <i className="far fa-check-square"></i>
           <span> &nbsp;Submit complain</span>
           </button> 
        </form>
      </div>
      </div>
      </div> 
    );
  }
}

export default Complain;
