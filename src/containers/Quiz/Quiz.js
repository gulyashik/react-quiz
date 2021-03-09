import React from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";

class Quiz extends React.Component {
    state = {
        quizeFinished: true,
        activeQuestion : 0,
        answerState : null,
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
                    {text: '1705', id: 3},
                    {text: '1805', id: 4}
                ],
            }
        ]
    };
     onClickHandler = answerId =>{
         if(this.state.answerState){
             console.log(this.state.answerState)
             const key = Object.keys(this.state.answerState)
             console.log(key)
             if( this.state.answerState[key]==='success'){
                 return
             }
         }
         const question = this.state.quiz[this.state.activeQuestion];
         if(answerId === question.rightAnswerId){
            this.setState({
                 answerState: {[answerId] : 'success'}
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
             this.setState({
                 answerState: {[answerId] : 'error'}
             })
         }

     }
     quizeFinished(){
         return (this.state.activeQuestion+1) === this.state.quiz.length
     }
    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1> Ответьте на все вопросы </h1>
                    {this.state.quizeFinished ?
                        <FinishedQuiz
                        />
                        :
                        <ActiveQuiz
                            answers= {this.state.quiz[this.state.activeQuestion].answers}
                            onClickHandler = {this.onClickHandler}
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