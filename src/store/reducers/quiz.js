import {
    FETCH_QUIZES_START,
    FETCH_QUIZES_SUCCESS,
    FETCH_QUIZES_ERROR,
    FETCH_QUIZ_SUCCESS,
    QUIZ_SET_STATE,
    FINISHED_QUIZ,
    QUIZ_NEXT_QUESTION,
    RETRY_QUIZ
} from '../actions/actionTypes'

const initialState = {
    quizes: [],
    loading: false,
    error: null,
    quizeFinished: false,
    activeQuestion: 0,
    answerState: null,
    results: {},
    quiz: null
};
export default function quizReducer(state = initialState, action) {
    switch (action.type) {
        case FETCH_QUIZES_START:
            return {
                ...state, loading: true
            }
        case FETCH_QUIZES_SUCCESS:
            return {
                ...state, loading: false, quizes: action.quizes
            }
        case FETCH_QUIZES_ERROR:
            return {
                ...state, loading: false, error: action.error
            }
        case FETCH_QUIZ_SUCCESS:
            return {
                ...state, loading: false, quiz: action.quiz
            }
        case QUIZ_SET_STATE:
            return {
                ...state, answerState:action.answerState, results: action.results
            }
        case FINISHED_QUIZ:
            return {
                ...state, quizeFinished :true
            }
        case QUIZ_NEXT_QUESTION:
            return {
                ...state, activeQuestion: action.activeQuestion, answerState: null
            }
        case RETRY_QUIZ :
            return {
                ...state,
                quizeFinished: false,
                activeQuestion: 0,
                answerState: null,
                results: {}
            }
        default:
            return state
    }
}