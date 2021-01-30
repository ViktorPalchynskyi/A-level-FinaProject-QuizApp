import C from './actionType';
import axios from '../../axios/axios-quiz';

export function createQuizQuestion(item) {
   return{
      type: C.CREATE_QUIZ_QUESTION,
      item
   };
}

export function resetQuizCreation() { 
   return{
      type: C.RESET_QUIZ_CREATION
   };
}

export function finishCreateQuiz() {
   return async (dispatch, getState) => { 
      await axios.post('/quizes.json', getState().create.quiz);
      dispatch(resetQuizCreation());
   };
}