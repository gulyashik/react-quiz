import axios from "axios";

export default axios.create({
    baseURL:'https://react-quiz-bf1a2-default-rtdb.firebaseio.com'
})