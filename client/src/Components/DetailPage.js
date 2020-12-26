import React, { Component, Fragment } from 'react';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import M from 'materialize-css';
 class DetailPage extends Component {
     constructor(props){
         super(props);
        this.state = {
            singleQuestion : {},
        };
     }
     componentDidMount() {
         const id = this.props.match.params.id;
         axios.get(`/quiz/questions/${id}`)
         .then((responce) => {
          const data = responce.data;
          this.setState({ singleQuestion : data});
         }).catch(()=>{
            M.toast({ 
                html: "!!!Something went wrong",
                classes: "tost-invalid",
                displayLength: 1500,
              })
         })
     }
    render() {
        const {question, optionA, optionB, optionC, optionD, answer, category} = this.state.singleQuestion;
    return  (
        <Fragment>
            
           <Helmet><title>Nimelssa Quiz - Question Details page</title></Helmet>
            <div>
               <h4>{question}</h4>
               <hr />
               <dl className="row">
                 <dt className="col-sm-2">Question Category:</dt>
                  <dd className="col-sm-10">{category}</dd>

                  <dt className="col-sm-2">OptionA:</dt>
                  <dd className="col-sm-10">{optionA}</dd>

                  <dt className="col-sm-2">OptionB:</dt>
                  <dd className="col-sm-10">{optionB}</dd>

                  <dt className="col-sm-2">OptionC:</dt>
                  <dd className="col-sm-10">{optionC}</dd>

                  <dt className="col-sm-2">OptionD:</dt>
                  <dd className="col-sm-10">{optionD}</dd>

                  <dt className="col-sm-2">Answer:</dt>
                  <dd className="col-sm-10">{answer}</dd> 
               </dl>
            </div>
        </Fragment>
    )
    }
}

export default DetailPage;