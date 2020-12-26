import React, { Component} from 'react';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import M from 'materialize-css';
import { showErrorMsg, showSuccessMsg } from '../Components/Helpers/ClientHelperMessage';
import { showLoading }  from '../Components/Helpers/Loading';
import isEmpty from 'validator/lib/isEmpty';

class EditPost extends Component{
 constructor(props){
     super(props);
     this.state = {
        category  : '',
        question : '',
        optionA : '',
        optionB : '',
        optionC : '',
        optionD : '',
        answer : '',
        errorMsg: false,
        successMsg: false,
        loading: false
    };
    this.categoryRef = React.createRef();
 }
  
 componentDidMount (){
     this.categoryRef.current.focus();
    const id = this.props.match.params.id;
    axios.get(`/quiz/questions/${id}`)
    .then((responce) => {
     const data = responce.data;
     this.setState({ 
         category : data.category,
         question : data.question,
         optionA : data.optionA,
         optionB : data.optionB,
         optionC : data.optionC,
         optionD : data.optionD,
         answer : data.answer
        });
    }).catch(()=>{ 
        M.toast({ 
            html: "Something went wrong when fetching specific question",
            classes: "tost-invalid",
            displayLength: 1500,
          })
    })
 }
    handleChange = ({target}) => {
        const {name, value } = target;
        this.setState({  [name] : value, successMsg: "", errorMsg: "" });
    };

    submit = (event) => {
        event.preventDefault();
        const id = this.props.match.params.id;
        const {question, category,optionA, optionB, optionC, optionD, answer} = this.state; 

        if(      
        isEmpty(question) || 
        isEmpty(category) || 
        isEmpty(optionA) || 
        isEmpty(optionB) || 
        isEmpty(optionC) || 
        isEmpty(optionD) ||
        isEmpty(answer)
        ) {
            this.setState({
                category,
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                answer,
                errorMsg: "All fields are required"
              });
        }else{
            this.setState({
                category,
                question,
                optionA,
                optionB,
                optionC,
                optionD,
                answer,
                loading: true
              });
            const payload = {
                category: this.state.category, 
                question: this.state.question,
                optionA: this.state.optionA,
                optionB: this.state.optionB,
                optionC: this.state.optionC,
                optionD: this.state.optionD,
                answer: this.state.answer
            };
        
            axios({
                url : `/quiz/questions/${id}`,
                method: "PUT",
                data: payload 
            })
            .then(()=>{
                this.setState({
                    category,
                    question,
                    optionA,
                    optionB,
                    optionC,
                    optionD,
                    answer,
                    loading: false, 
                    successMsg: "Question was successfully edited" 
                  });

           this.resetUserInput();
            }) 
            .catch(()=>{
                this.setState({
                    category,
                    question,
                    optionA,
                    optionB,
                    optionC,
                    optionD,
                    answer,
                    loading: false, 
                    successMsg: "Server Error" 
                  });
            })
        }
 };

 resetUserInput = () => {
    this.setState({category: "", question: "", optionA: "", optionB: "", optionC: "", optionD: "",   answer: ""  });
    };

   render(){
       return(
           <div className='post-container'>
               <Helmet><title>Nimelssa Online Quiz-Edit Quiz page</title></Helmet>
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
              value={this.state.optionA}
              name="optionA"
              placeholder="Option A"
              onChange={this.handleChange}
              />
              <label for="floatingInput">Option A</label>
          </div>

          <div class="form-floating mb-3">
              <input 
               autoComplete="new-password"
              type="text" 
              class="form-control" 
              id="floatingInput" 
              value={this.state.optionB}
              name="optionB"
              placeholder="Option B"
              onChange={this.handleChange}
              />
              <label for="floatingInput">Option B</label>
          </div>


          <div class="form-floating mb-3">
              <input 
               autoComplete="new-password"
              type="text" 
              class="form-control" 
              id="floatingInput" 
              value={this.state.optionC}
              name="optionC"
              placeholder="Option C"
              onChange={this.handleChange}
              />
              <label for="floatingInput">Option C</label>
          </div>


          <div class="form-floating mb-3">
              <input 
               autoComplete="new-password"
              type="text" 
              class="form-control" 
              id="floatingInput" 
              value={this.state.optionD}
              name="optionD"
              placeholder="Option D"
              onChange={this.handleChange}
              />
              <label for="floatingInput">Option D</label>
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
       )
   }
}

export default EditPost; 
