import React from 'react';
import { BrowserRouter as Router, Route, Switch  } from 'react-router-dom';
import Header from './Components/Header'; 
import Signin from './Components/Signin'; 
import Home from './Components/Home'; 
import Signup from './Components/Signup'; 
import NotFound from './Components/NotFound';  
import QuizParentComponent from './Components/QuizParentComponent';
import AdminDashboard from './Components/LandingPage';
import AdminRoute from './Components/AdminRoute'; 
import UserRoute from './Components/UserRoute';
import Forgot from './Components/Forgot';
import Reset from './Components/Reset';
import QuizInstructions from './Components/Quizinstructions';
import Thanks from './Components/Thanks';
import Complain from './Components/Complain';
import PastQuestions from './Components/PastQuestions';
import DetailPage from './Components/DetailPage';
import CreatePost from './Components/CreatePost';
import EditPost from './Components/EditPost';
import Users from './Components/Users';
import QuizStat from './Components/QuizStat';
import CreatePastQuestions from './Components/CreatePastQuestions';
import UserComplain from './Components/UserComplain';
import UserDashboard from './Components/UserDashboard';

const App = () => {
  return (
    <Router>
          <Header /> 
       <main>
          <Switch> 

            <Route exact path="/" component={Home}/> 
            <Route exact path="/signup" component={Signup} />
            <Route exact path="/signin" component={Signin} /> 
            <Route exact path="/forgot" component={Forgot}/>
            <Route exact path="/reset/:token" component={Reset}/>
            <Route exact path="/instructions" component={QuizInstructions} />
            <UserRoute exact path="/play" component={QuizParentComponent} /> 
     
            <UserRoute exact path="/dashboard"component={UserDashboard} />
            <UserRoute exact path="/thanksPage"component={Thanks} />
            <UserRoute exact path="/complain" component={Complain} />
            <UserRoute exact path="/pastQuestionsList" component={PastQuestions}/>
            <AdminRoute exact path="/quiz/:id" component={DetailPage}/>
            <AdminRoute exact path="/questions" component={CreatePost}/>
            <AdminRoute exact path="/editPost/:id" component={EditPost}/>
            <AdminRoute exact path="/users" component={Users}/>
            <AdminRoute exact path="/quizStat" component={QuizStat}/>
            <AdminRoute exact path="/pastQuestion" component={CreatePastQuestions}/>
            <AdminRoute exact path="/userComplains" component={UserComplain}/> 
            <AdminRoute exact path="/landingPage" component={AdminDashboard} /> 
            <Route component={NotFound} /> 
          </Switch> 
        </main>     
    </Router>
  );
}

export default App;