import axios from 'axios';

export default axios.create({
   baseURL: 'https://react-quiz-d8a79-default-rtdb.firebaseio.com/'
})