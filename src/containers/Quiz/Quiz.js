import React from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {
    state = {
        quizeFinished: false,
        activeQuestion : 0,
        answerState : null,
        results: [],
        quiz:[
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                id:0,
                answers:[
                    {text: 'черное', id: 1},
                    {text: 'синее', id: 2},
                    {text: 'розовое', id: 3},
                    {text: 'голубое', id: 4}
                ]
            },
            {
                question: 'В каком году основан Санкт-Петербург?',
                rightAnswerId: 3,
                id:1,
                answers:[
                    {text: '1700', id: 1},
                    {text: '1701', id: 2},
                    {text: '1703', id: 3},
                    {text: '1805', id: 4}
                ],
            }
        ]
    };
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