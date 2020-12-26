import React,{Component, Fragment} from 'react';
import axios from  'axios';
import UsersList from './UsersList';
import M from 'materialize-css';
import { showLoading }  from '../Components/Helpers/Loading';

class Users extends Component{
    constructor(props){
      super(props);
      this.state = {
         users : [],
         errorMessage : "",
         loading: true 
      }
    }

    getUser(){
        axios.get('/users/allUsers')
        .then((responce)=>{
        const data = responce.data;
        this.setState({
            users : data
        });

      })
    .catch(()=>{
           this.setState({errorMessage : "Error retrieving User statistics !!!!"})
        });
    }

    componentDidMount(){
     this.getUser();
    }


    onDelete = (id) =>{
        axios
          .delete(`/users/deleteUser/${id}`)
          .then(() => {
            M.toast({ 
              html: 'User was successfully deleted ',
              classes: "tost-valid",
              displayLength: 1500,
            })
            this.getUser();
          })
          .catch(() => {
            M.toast({ 
              html: 'SOMETHING HAPPNED, PLEASE TRY AGAIN ',
              classes: "tost-invalid",
              displayLength: 1500,
            })
          }); 
      };

    render(){
        const {users, errorMessage} = this.state;
        return(
            <Fragment>
                {users.map((User)=>(
                   users.length > 0 ? (
                    <Fragment  key={users.matric}>
                    <UsersList DeleteUser={this.onDelete}  RegisteredUsers={User}/> 
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

export default Users;
