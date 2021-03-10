import classes from './ActiveQuiz.module.css';
import AnswerList from "../AnswerList/AnswerList";

const ActiveQuiz =props =>(
            <div className={classes.ActiveQuiz}>
                <p className={classes.Question}>
                    <span>
                        <strong> {props.activeQuestionNumber}. </strong> &nbsp;
                        {props.question}
                    </span>
                    <small> {props.activeQuestionNumber} из {props.quizLength} </small>
                </p>
                <AnswerList
                    answerState = {props.answerState}
                    answers = {props.answers}
                    onClickHandler = {props.onClickHandler}
                />
            </div>
)
export default ActiveQuiz;