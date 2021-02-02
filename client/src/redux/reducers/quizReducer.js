import C from '../actions/actionType';

const initialState = {
   quizes: [],
   loading: false,
   error: null,
   results: {},
   isFinished: false,
   activeQuestion:0,
   answerState: null,
   quiz: null,
};

export default function quizReducer(state = initialState, action) { 

   switch (action.type) {
      case C.FETCH_QUIZES_START:
         return { 
            ...state, loading: true
         };
      case C.FETCH_QUIZES_SUCCESS:
         return { 
            ...state, loading: false, quizes: action.quizes
         };
      case C.FETCH_QUIZES_ERROR:
         return { 
            ...state, loading: false, error: action.error
         };
      case C.FETCH_QUIZ_SUCCESS:
         return{ 
           ...state, loading: false, quiz: action.quiz 
         };
      case C.QUIZ_SET_STATE:
         return {
            ...state, answerState: action.answerState, results: action.results
         };
      case C.FINISH_QUIZ:
         return{
            ...state, isFinished: true
         };
      case C.QUIZ_NEXT_QUESTION: 
         return{
            ...state, answerState: null, activeQuestion: action.questionNumber
         };
      case C.QUIZ_RETRY: 
         return{
            ...state, 
            activeQuestion: 0,
            answerState: null,
            isFinished: false,
            results: {}
         };
      default:
         return state;
   }
}