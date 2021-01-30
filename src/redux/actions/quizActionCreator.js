import axios from '../../axios/axios-quiz';
import C from './actionType';

export function fetchQuizes() { 
   return async dispatch => { 
      dispatch(fetchQuizesStart());
      try{ 
         const res = await axios.get('/quizes.json');
   
         const quizes = [];
   
         Object.keys(res.data).forEach((key, index) => { 
           quizes.push({
             id:key,
             name: `Тест № ${index + 1}`
           });
         });
         dispatch(fetchQuizesSuccess(quizes));
        } catch(e) {
          dispatch(fetchQuizesError(e));
        }
   };
}

export function fetchQuizById(quizId){
  return async dispatch => {
    dispatch(fetchQuizesStart());
    try{
      const res = await axios.get(`/quizes/${quizId}.json`);
      const quiz = res.data;

      dispatch(fetchQuizeSuccess(quiz));
   } catch (e){ 
      dispatch(fetchQuizesError(e));
   }
  };
}

export function fetchQuizesStart () {
  return { 
    type: C.FETCH_QUIZES_START
  };
}


export function fetchQuizesSuccess (quizes) {
  return { 
    type: C.FETCH_QUIZES_SUCCESS,
    quizes
  };
}

export function fetchQuizeSuccess (quiz) {
  return { 
    type: C.FETCH_QUIZ_SUCCESS,
    quiz
  };
} 

export function fetchQuizesError (e) {
  return { 
    type: C.FETCH_QUIZES_ERROR, 
    error: e
  };
}

export function quizSetState(answerState, results){
  return{ 
    type:C.QUIZ_SET_STATE,
    answerState, results
  };
}

export function  finishQuiz() {
  return{ 
    type: C.FINISH_QUIZ
  };
}

export function quizNextQuestion(questionNumber) { 
  return {
    type: C.QUIZ_NEXT_QUESTION,
    questionNumber
  };
}

export function retryQuiz() { 
  return{ 
    type: C.QUIZ_RETRY,

  };
 }

export function quizAnswerClick(answerId){ 
  return (dispatch, getState) => { 
    const state = getState().quiz;
    if( state.answerState) {
      const key = Object.keys( state.answerState);
      if( state.answerState[key] === 'success') return;
   }

   const question =  state.quiz[ state.activeQuestion];
   const results = state.results; 


   if(question.rightAnswerId === answerId) {
      if(!results[question.id]){
         results[question.id] = 'success';
      }

      dispatch(quizSetState({[answerId]: 'success'}, results));

      const timeout = window.setTimeout(() => { 
         if(isQuizFinished(state)) {
           dispatch(finishQuiz());
         } else { 
            dispatch(quizNextQuestion(state.activeQuestion + 1));
         }


         window.clearTimeout(timeout);
      }, 1000);  
   } else { 
      results[question.id] = 'error';
      dispatch(quizSetState({[answerId]: 'error'}, results));
   }
  };
}

function isQuizFinished(state){
  return state.activeQuestion + 1 === state.quiz.length;
}