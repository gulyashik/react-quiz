import React from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById} from '../../store/actions/quiz'

class Quiz extends React.Component {
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }

    onClickHandler = answerId =>{
         if(this.props.answerState){
             const key = Object.keys(this.props.answerState)
             if( this.props.answerState[key]==='success'){
                 return
             }
         }
         const results = this.props.results;
         const question = this.props.quiz[this.props.activeQuestion];
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
                     activeQuestion: this.props.activeQuestion + 1,
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
         return (this.props.activeQuestion+1) === this.props.quiz.length
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

                        this.props.loading || !this.props.quiz
                            ? <Loader/>
                            :
                            this.props.quizeFinished ?
                                <FinishedQuiz
                                    results = {this.props.results}
                                    quiz = {this.props.quiz}
                                    retryHandler = {this.retryHandler}
                                />
                                :
                                <ActiveQuiz
                                    answers= {this.props.quiz[this.props.activeQuestion].answers}
                                    onClickHandler = {this.onClickHandler}
                                    question = {this.props.quiz[this.props.activeQuestion].question}
                                    quizLength = {this.props.quiz.length}
                                    activeQuestionNumber = {this.props.activeQuestion + 1}
                                    answerState = {this.props.answerState}
                                />
                    }
                </div>
            </div>
        )
    };
}
function mapStateToProps(state){
    return {
        quizeFinished: state.quiz.quizeFinished,
        activeQuestion : state.quiz.activeQuestion,
        answerState : state.quiz.answerState,
        results: state.quiz.results,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}
function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id)=> dispatch(fetchQuizById(id))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Quiz);