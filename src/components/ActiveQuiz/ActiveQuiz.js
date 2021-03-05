import classes from './ActiveQuiz.module.css';
import AnswerList from "../AnswerList/AnswerList";

const ActiveQuiz =props =>(
            <div className={classes.ActiveQuiz}>
                <p className={classes.Question}>
                    <span>
                        <strong> {props.activeQuestionNumber}. </strong> &nbsp;
                        Как дела?
                    </span>
                    <small> {props.activeQuestionNumber} из {props.quizLength} </small>
                </p>
                {console.log(props.answers)}
                <AnswerList
                    answerState = {props.answerState}
                    answers = {props.answers}
                    onClickHandler = {props.onClickHandler}
                />
            </div>
)
export default ActiveQuiz;