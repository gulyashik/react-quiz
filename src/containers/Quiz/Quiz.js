import React from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";

class Quiz extends React.Component {
    state = {
        quiz:[
            {
                question: 'Какого цвета небо?',
                rightAnswerId: 2,
                answers:[
                    {text: 'черное', id: 1},
                    {text: 'синее', id: 2},
                    {text: 'розовое', id: 3},
                    {text: 'голубое', id: 4}
                ]
            }
        ]
    };
     onClickHandler(answerId){
        console.log("Answer ID:" + answerId);
    }
    render(){
        return(
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1> Ответьте на все вопросы </h1>
                    <ActiveQuiz
                        answers= {this.state.quiz[0].answers}
                        onClickHandler = {this.onClickHandler}
                    />
                </div>
            </div>
        )
    };
}
export default Quiz;