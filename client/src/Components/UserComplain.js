import React,{Component, Fragment} from 'react';
import axios from  'axios';
import UserComplainList from './UserComplainList';
import { showLoading }  from '../Components/Helpers/Loading';

class UserComplain extends Component{
    constructor(props){
      super(props);
      this.state = {
         complains : [],
         errorMessage : "",
         loading: true
      }
    }

    getComplains(){
        axios.get('/users/allComplains')
        .then((responce)=>{
        const data = responce.data;
        this.setState({
            complains : data
        });

      })
    .catch(()=>{
           this.setState({errorMessage : "Error retrieving complains !!!!"})
        });
    }

    componentDidMount(){
     this.getComplains();
    }

    render(){
        const {complains, errorMessage} = this.state;
        return(
            <Fragment>
                {complains.map((Complain)=>(
                   complains.length > 0 ? (
                    <Fragment  key={complains.matric}>
                    <UserComplainList userComplains={Complain}/> 
               </Fragment>
                   ) : (
                    <h1>{this.state.loading && <div className='text-center pb-4'>{showLoading()}</div>}</h1>
                   )
                ))}

                   {errorMessage ? <h1>{errorMessage}</h1> : null}
            </Fragment>
        )
    }
}

export default UserComplain;
