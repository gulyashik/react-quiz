import React from 'react';
import classes from './Quiz.module.css'
import ActiveQuiz from "../../components/ActiveQuiz/ActiveQuiz";
import FinishedQuiz from "../../components/FinishedQuiz/FinishedQuiz";
import Loader from "../../components/UI/Loader/Loader";
import {connect} from "react-redux";
import {fetchQuizById, quizAnswerClick, retryQuiz} from '../../store/actions/quiz'

class Quiz extends React.Component {
    componentDidMount() {
        this.props.fetchQuizById(this.props.match.params.id)
    }
    componentWillUnmount() {
        this.props.retryQuiz()
    }

    render() {
        return (
            <div className={classes.Quiz}>
                <div className={classes.QuizWrapper}>
                    <h1> Ответьте на все вопросы </h1>
                    {

                        this.props.loading || !this.props.quiz
                            ? <Loader/>
                            :
                            this.props.quizeFinished ?
                                <FinishedQuiz
                                    results={this.props.results}
                                    quiz={this.props.quiz}
                                    retryHandler={this.props.retryQuiz}
                                />
                                :
                                <ActiveQuiz
                                    answers={this.props.quiz[this.props.activeQuestion].answers}
                                    onClickHandler={this.props.quizAnswerClick}
                                    question={this.props.quiz[this.props.activeQuestion].question}
                                    quizLength={this.props.quiz.length}
                                    activeQuestionNumber={this.props.activeQuestion + 1}
                                    answerState={this.props.answerState}
                                />
                    }
                </div>
            </div>
        )
    };
}

function mapStateToProps(state) {
    return {
        quizeFinished: state.quiz.quizeFinished,
        activeQuestion: state.quiz.activeQuestion,
        answerState: state.quiz.answerState,
        results: state.quiz.results,
        quiz: state.quiz.quiz,
        loading: state.quiz.loading
    }
}

function mapDispatchToProps(dispatch) {
    return {
        fetchQuizById: (id) => dispatch(fetchQuizById(id)),
        quizAnswerClick: (answerId)=>dispatch(quizAnswerClick(answerId)),
        retryQuiz: ()=> dispatch(retryQuiz())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Quiz);