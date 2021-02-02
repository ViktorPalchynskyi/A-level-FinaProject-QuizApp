import C from '../actions/actionType';

const initialState = {
   quiz: []
};

export default function createReducer(state=initialState, action) {
   switch (action.type) {
      case C.CREATE_QUIZ_QUESTION:
         return { 
            ...state,
            quiz: [...state.quiz, action.item]
         };
      case C.RESET_QUIZ_CREATION:
         return { 
            ...state,quiz:[]
         };
      default:
         return state;
   }
}