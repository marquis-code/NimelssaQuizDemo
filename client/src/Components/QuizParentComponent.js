import React, {Fragment, Component } from "react";
import axios from "axios";
import {confirmAlert} from 'react-confirm-alert';
import 'react-confirm-alert/src/react-confirm-alert.css';
import Questionnaire from "./Questionnaire";
import isEmpty from "../utils/is-Empty";
import M from "materialize-css";
import qs from 'qs';
import { showLoading }  from '../Components/Helpers/Loading';

class QuizParentComponent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: [],
      currentQuestion: {},
      nextQuestion: {},
      previousQuestion: {},
      answer: "",
      numberOfQuestions: 0,
      numberOfAnsweredQuestions: 0,
      currentQuestionIndex: 0,
      correctAnswers: 0,
      wrongAnswers: 0,
      score: 0,
      hints: 5,
      fiftyFifty: 2,
      previousRandomNumbers: [],
      usedFiftyFifty: false,
      time: {},
      errorMessage: "",
      loading: true 
    }; 
    this.interval = null
  }

  handleExitButtonClick = () => {
    this.submit();
  };


  submit = () => {
    confirmAlert({
      title: 'Are you sure you want to do this?',
      message: 'Please note that quiz data will be lost..',
      buttons: [
        {
          label: 'Confirm',
          onClick: () => {this.props.history.push("/")}
        },
        {
          label: 'Cancel',
          onClick: () => this.props.history.push("/play")
        }
      ]
    });
  };
/* 
  'Invalid Matric Number !!!', */

  matricConfirmation = () => {
    confirmAlert({
      title: <h1>Invalid Matric Number&nbsp;<i class="fas fa-exclamation-triangle"></i>
      <span className="sr-only">(current)</span></h1>,
      message: 'A valid matric number is required to confirm your submission',
      buttons: [
        {
          label: 'Ok',
          onClick: () => {this.endGame()}
        },
        {
          label: 'Cancel',
          onClick: () => {this.endGame()}
        }
      ]
    });
  };

  displayQuestions = (
    questions = this.state.questions,
    currentQuestion,
    nextQuestion,
    previousQuestion
  ) => {
    let { currentQuestionIndex } = this.state;
    if (!isEmpty(this.state.questions)) {
      questions = this.state.questions;
      currentQuestion = questions[currentQuestionIndex];
      nextQuestion = questions[currentQuestionIndex + 1];
      previousQuestion = questions[currentQuestionIndex - 1];
      const answer = currentQuestion.answer;
      this.setState(
        {
          numberOfQuestions: questions.length,
          currentQuestion,
          nextQuestion,
          previousQuestion,
          answer,
          previousRandomNumbers: [],
        },
        () => {
          this.showOptions();
        }
      );
    }
  };

  componentDidMount() {
    const {
      questions,
      currentQuestion,
      nextQuestion,
      previousQuestion,
    } = this.state;
    axios
      .get("/quiz/questions")
      .then((responce) => {
        let data = responce.data;
        this.setState({
          questions: data,
        });

        this.displayQuestions(
          questions,
          currentQuestion,
          nextQuestion,
          previousQuestion
        );
        this.startTimer();
      })
      .catch(() => {
        this.setState({errorMessage : "Error retrieving Quiz Data!!!!"})
      });
  }

  componentWillUnmount(){
    clearInterval(this.interval);
}

 
   handleOptionClick = (event) => {
    if (
      event.target.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
    ) {
      this.correctAnswer();
    } else {
      this.wrongAnswer();
    }
  };

  handleButtonClick = (event) => {
    switch (event.target.id) {
        case 'next-button':
            this.handleNextButtonClick();
            break;

        case 'previous-button':
            this.handlePreviousButtonClick();
            break;

        case 'quit-button':
            this.handleExitButtonClick();
            break;

        default:
            break;
    }
}

  handleNextButtonClick = () => {
    const { nextQuestion } = this.state;
    if (nextQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex + 1,
        }),
        () => {
          const {
            questions,
            currentQuestion,
            nextQuestion,
            previousQuestion,
          } = this.state;
          this.displayQuestions(
            questions,
            currentQuestion,
            nextQuestion,
            previousQuestion
          );
        }
      );
    }else{
      M.toast({ 
        html: "Next question is not available",
        classes: "tost-valid",
        displayLength: 1000,
      })
    }
  };

  handlePreviousButtonClick = () => {
    const { previousQuestion } = this.state;
    if (previousQuestion !== undefined) {
      this.setState(
        (prevState) => ({
          currentQuestionIndex: prevState.currentQuestionIndex - 1,
        }),
        () => {
          const {
            questions,
            currentQuestion,
            nextQuestion,
            previousQuestion,
          } = this.state;
          this.displayQuestions(
            questions,
            nextQuestion,
            previousQuestion,
            currentQuestion
          );
        }
      );
    }else{
      M.toast({ 
        html: "There is no previous question",
        classes: "tost-valid",
        displayLength: 1000,
      })
    }
  };

  correctAnswer = () => {
    M.toast({
      html: "Correct",
      classes: "tost-valid",
      displayLength: 1000,
    }); 
    this.setState(
      (prevState) => ({
        score: prevState.score + 1,
        correctAnswers: prevState.correctAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
           const {
          questions,
          currentQuestion,
          nextQuestion,
          previousQuestion,
        } = this.state;
        if(nextQuestion === undefined){
          this.endGame();
        }else{
        this.displayQuestions(
          questions,
          currentQuestion,
          nextQuestion,
          previousQuestion
        );
        }
      }
    );
  };

  wrongAnswer = () => {
    navigator.vibrate(1000);
    M.toast({
      html: "Wrong Answer",
      classes: "tost-invalid",
      displayLength: 1000,
    });
    this.setState(
      (prevState) => ({
        wrongAnswers: prevState.wrongAnswers + 1,
        currentQuestionIndex: prevState.currentQuestionIndex + 1,
        numberOfAnsweredQuestions: prevState.numberOfAnsweredQuestions + 1,
      }),
      () => {
        const {
          questions,
          currentQuestion,
          nextQuestion,
          previousQuestion,
        } = this.state;
        if(this.state.nextQuestion === undefined){
          this.endGame();
        }else{
          this.displayQuestions(
            questions,
            currentQuestion,
            nextQuestion,
            previousQuestion
          );
        }
  
      }
    );
  };

  showOptions = () => {
    const options = Array.from(document.querySelectorAll(".option"));
    options.forEach((option) => {
      option.style.visibility = "visible";
    });

    this.setState({
      usedFiftyFifty: false,
    });
  };

  handleHints = () => {
    if (this.state.hints > 0) {
      const options = Array.from(document.querySelectorAll(".option"));
      let indexOfAnswer;
      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      while (true) {
        let randomNumber = Math.round(Math.random() * 3);
        if (
          randomNumber !== indexOfAnswer &&
          !this.state.previousRandomNumbers.includes(randomNumber)
        ) {
          options.forEach((option, index) => {
            if (index === randomNumber) {
              option.style.visibility = "hidden";
              this.setState((prevState) => ({
                hints: prevState.hints - 1,
                previousRandomNumbers: prevState.previousRandomNumbers.concat(
                  randomNumber
                ),
              }));
            }
          });
          break;
        }
        if (this.state.previousRandomNumbers.length >= 3) break;
      }
    }
  };

  handleFiftyFifty = () => {
    if (this.state.fiftyFifty > 0 && this.state.usedFiftyFifty === false) {
      const options = document.querySelectorAll(".option");
      const randomNumbers = [];
      let indexOfAnswer;

      options.forEach((option, index) => {
        if (
          option.innerHTML.toLowerCase() === this.state.answer.toLowerCase()
        ) {
          indexOfAnswer = index;
        }
      });

      let count = 0;
      do {
        const randomNumber = Math.round(Math.random() * 3);
        if (randomNumber !== indexOfAnswer) {
          if (
            randomNumbers.length < 2 &&
            !randomNumbers.includes(randomNumber) &&
            !randomNumbers.includes(indexOfAnswer)
          ) {
            randomNumbers.push(randomNumber);
            count++;
          } else {
            while (true) {
              const newRandomNumber = Math.round(Math.random() * 3);
              if (
                !randomNumbers.includes(randomNumber) &&
                !randomNumbers.includes(indexOfAnswer)
              ) {
                newRandomNumber.push(newRandomNumber);
                count++;
                break;
              }
            }
          }
        }
      } while (count < 2);
      options.forEach((option, index) => {
        if (randomNumbers.includes(index)) {
          option.style.visibility = "hidden";
        }
      });
      this.setState((prevState) => ({
        fiftyFifty: prevState.fiftyFifty - 1,
        usedFiftyFifty: true,
      }));
    }
    else if(this.state.fiftyFifty === 0){
      M.toast({
          html: "You dont have more 50/50s left",
          classes: "fiftyFifty-tost",
          displayLength: 1000
      })
  }
  };

  startTimer = () => {
    const countDownTime = Date.now() + 900000;
    this.interval = setInterval(() => {
      const now = new Date();
      const distance = countDownTime - now;

      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      if (distance < 0) {
        clearInterval(this.interval);
        this.setState({
            time: {
              minutes: 0,
              seconds: 0,
            }
        }, () => {
            this.endGame();
          });
      } else {
        this.setState({
          time: {
            minutes,
            seconds,
          }});
      }
    }, 1000);
  };

endGame = () => {
  let userMatric = window.prompt('Please Enter your Matric Number to Confirm it is you');
  axios.post('/users/oneUser', qs.stringify({'matric' : userMatric }))
  .then(() => {
    const { state } = this;
    const playerStats = {
      score: state.score,
      numberOfQuestions: state.numberOfQuestions,
      numberOfAnsweredQuestions: state.correctAnswers + state.wrongAnswers,
      correctAnswers: state.correctAnswers,
      wrongAnswers: state.wrongAnswers,
      fiftyFiftyUsed: 2 - state.fiftyFifty,
      hintsUsed: 5 - state.hints,
      matric: userMatric
  };

  axios({
    url: "/users/quizStat",
    method: "POST",
    data: playerStats, 
  })
    .then(() => {
      M.toast({
        html: "Quiz data was sucessfully submitted",
        classes: "tost-valid",
        displayLength: 1000 
      })})
     .catch(() => { 
      M.toast({ 
        html: "SOMETHING FAILED",
        classes: "tost-invalid",
        displayLength: 1000
      })
    });
    
    setTimeout(() => {
      this.props.history.push('/thanksPage');
          }, 1000);

  })
  .catch(() => {
    M.toast({ 
      html: "PLEASE ENTER A VALID MATRIC NUMBER AND TRY AGAIN",
      classes: "tost-invalid",
      displayLength: 3000,
      completeCallback: () => {this.matricConfirmation();}
    })
  })
}

  render() {
    const {
      questions,
      currentQuestion,
      currentQuestionIndex,
      numberOfQuestions,
      hints,
      fiftyFifty,
      time,
      previousQuestion,
      nextQuestion,
      errorMessage
    } = this.state;
    return (
      <Fragment>
        {questions.length > 0 ? (
          <Fragment> 
            <Questionnaire
              PreviousQuestion={previousQuestion}
              NextQuestion={nextQuestion}
              Time={time}
              FiftyFifty={fiftyFifty}
              Hints={hints}
              HandleButtonClick={this.handleButtonClick}
              HandleOptionClick={this.handleOptionClick}
              HandleNextButtonClick={this.handleNextButtonClick}
              HandlePreviousButtonClick={this.handlePreviousButtonClick}
              HandleExitButtonClick={this.handleExitButtonClick}
              CurrentQuestion={currentQuestion}
              CurrentQuestionIndex={currentQuestionIndex}
              NumberOfQuestions={numberOfQuestions}
              HandleHints={this.handleHints}
              HandleFiftyFifty={this.handleFiftyFifty}
            />
          </Fragment>
        ) : (
        <h1>{this.state.loading && <div className='text-center pb-4'>{showLoading()}</div>}</h1>
          
       /*    <h1>Loading......</h1>  */
        )}

        { errorMessage ? <h1>{errorMessage}</h1> : null}
      </Fragment>
    );
  }
}

export default QuizParentComponent;
