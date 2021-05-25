import axios from "../../axios/axios-quiz";
import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISHED_QUIZ,
    QUIZ_NEXT_QUESTION,
    RETRY_QUIZ
} from './actionTypes'

export function fetchQuizes() {
    return async dispatch => {
        dispatch(fetchQuizesStart())
        try {
            const response = await axios.get('/quizes.json')
            const quizes = []
            Object.keys(response.data).forEach((key, index) => {
                quizes.push({
                    id: key,
                    name: `Тест № ${index + 1}`
                })
            })
            dispatch(fetchQuizesSuccess(quizes))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}
export function retryQuiz() {
    return {
        type: RETRY_QUIZ
    }
}
export function quizSetState(answerState, results) {
    return {
        type: QUIZ_SET_STATE,
        answerState, results
    }
}
export function finishedQuiz() {
    return {
        type: FINISHED_QUIZ
    }
}
export function quizNextQuestion(activeQuestion) {
    return {
        type : QUIZ_NEXT_QUESTION,
        activeQuestion
    }
}
export function quizAnswerClick(answerId) {
    return (dispatch,getState)=> {
        const state = getState().quiz
        console.log(state)
        if (state.answerState) {
            const key = Object.keys(state.answerState)
            if (state.answerState[key] === 'success') {
                return
            }
        }
        const results = state.results;
        const question = state.quiz[state.activeQuestion];
        console.log(answerId+ "question.rightAnswerId" + question.rightAnswerId)
        if (answerId === question.rightAnswerId) {
            if (!results[question.id]) {
                results[question.id] = 'success'
            }
            quizSetState({[answerId]: 'success'},results)

            if (isQuizeFinished(state)) {
                const timeout = window.setTimeout(() => {
                    dispatch(finishedQuiz())
                    window.clearTimeout(timeout);
                }, 1000)

            } else {
                dispatch(quizNextQuestion(state.activeQuestion + 1))
            }

        } else {
            results[question.id] = 'error'
            dispatch(quizSetState({[answerId]: 'error'},results))
        }
    }
}

export function fetchQuizById(id) {
    return async dispatch => {
        dispatch(fetchQuizesStart)
        try {
            const response = await axios.get(`/quizes/${id}.json`)
            const quiz = response.data
            dispatch(fetchQuizeSuccess(quiz))
        } catch (e) {
            dispatch(fetchQuizesError(e))
        }
    }
}

export function fetchQuizesStart() {
    return {
        type: FETCH_QUIZES_START
    }
}

export function fetchQuizesSuccess(quizes) {
    return {
        type: FETCH_QUIZES_SUCCESS,
        quizes: quizes
    }
}

export function fetchQuizeSuccess(quiz) {
    return {
        type: FETCH_QUIZ_SUCCESS,
        quiz: quiz
    }
}

export function fetchQuizesError(e) {
    return {
        type: FETCH_QUIZES_ERROR,
        error: e
    }
}
function isQuizeFinished(state) {
    return (state.activeQuestion + 1) === state.quiz.length
}