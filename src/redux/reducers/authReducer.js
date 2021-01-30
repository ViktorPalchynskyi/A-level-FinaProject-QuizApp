import C from '../actions/actionType';

const initialState = {
   token: '123jas2kll123j'
};

export default function authReducer(state = initialState, action) { 
   switch (action.type) {
      case C.AUTH_SUCCESS:
         return { 
            ...state,
            token: action.token
         };
      case C.AUTH_LOGOUT:
         return { 
            ...state,
            token: null
         };
   
      default:
         return state;
   }
}