import React from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import axios from '../../axios/axios-quiz';
import Loader from "../../components/UI/Loader/Loader";

class Quiz extends React.Component {
    state = {
        quizeFinished: false,
        activeQuestion : 0,
        answerState : null,
        results: [],
        quiz:[],
        loading: true
    };
    async componentDidMount() {
        try {
            const response = await axios.get(`/quizes/${this.props.match.params.id}.json`)
            const quiz = response.data
            this.setState({
                quiz,
                loading: false
            })

        }catch (e) {

        }
        console.log("Quiz ID:" + this.props.match.params.id)
    }

    onClickHandler = answerId =>{
         if(this.state.answerState){
             const key = Object.keys(this.state.answerState)
             if( this.state.answerState[key]==='success'){
                 return
             }
         }
         const results = this.state.results;
         const question = this.state.quiz[this.state.activeQuestion];
         if(answerId === question.rightAnswerId){
             if(!results[question.id]) {
                 results[question.id] = 'success'
             }
            this.setState({
                 answerState: {[answerId] : 'success'},
                 results
             })

             if(this.quizeFinished()){
                 const timeout = window.setTimeout(()=>{
                     this.setState({
                         quizeFinished: true
                     })
                     window.clearTimeout(timeout);
                 },1000)

             }else {
                 this.setState({
                     activeQuestion: this.state.activeQuestion + 1,
                     answerState: null
                 })
             }

         }else {
             results[question.id] = 'error'
             this.setState({
                 answerState: {[answerId] : 'error'},
                 results
             })
         }

     }
     quizeFinished(){
         return (this.state.activeQuestion+1) === this.state.quiz.length
     }
    retryHandler = ()=> {
         this.setState({
             quizeFinished: false,
             activeQuestion : 0,
             answerState : null,
             results: {}
         }, ()=>{
             console.log(this.state.results)
         })
    }
    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1> Ответьте на все вопросы </h1>
                    {
                        this.state.loading
                            ? <Loader/>
                            :
                            this.state.quizeFinished ?
                                <FinishedQuiz
                                    results = {this.state.results}
                                    quiz = {this.state.quiz}
                                    retryHandler = {this.retryHandler}
                                />
                                :
                                <ActiveQuiz
                                    answers= {this.state.quiz[this.state.activeQuestion].answers}
                                    onClickHandler = {this.onClickHandler}
                                    question = {this.state.quiz[this.state.activeQuestion].question}
                                    quizLength = {this.state.quiz.length}
                                    activeQuestionNumber = {this.state.activeQuestion + 1}
                                    answerState = {this.state.answerState}
                                />
                    }
                </div>
            </div>
        )
    };
}
export default Quiz;