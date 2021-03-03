import classes from './ActiveQuiz.module.css';
import AnswerList from "../AnswerList/AnswerList";

const ActiveQuiz =props =>(
            <div className={classes.ActiveQuiz}>
                <p className={classes.Question}>
                    <span>
                        <strong> 1. </strong> &nbsp;
                        Как дела?
                    </span>
                    <small> 2 из 10 </small>
                </p>
                {console.log(props.answers)}
                <AnswerList
                    answers = {props.answers}
                    onClickHandler = {props.onClickHandler}
                />
            </div>
)
export default ActiveQuiz;