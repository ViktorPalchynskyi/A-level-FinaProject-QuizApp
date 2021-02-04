import  C from '../actions/actionType';

const initialState = {
   token: localStorage.getItem('token'),
   isAuthenicated: null,
   loading: true,
   user:null
};

export default function (state=initialState, action) {

   const {type, payload} = action; 

   switch (type) {
      case C.USER_LOADED: 
      return { 
         ...state, 
         isAuthenicated: true,
         loading: false,
         user: payload
      };

      case C.REGISTER_SUCCESS:
      case C.LOGIN_SUCCESS:
         localStorage.setItem('token', payload.token);
         return { 
            ...state,
            ...payload,
            isAuthenicated: true,
            loading: false
         };

      case C.REGISTER_FAIL:
      case C.AUTH_ERROR: 
      case C.LOGIN_FAIL:
      case C.LOGOUT:
         
         localStorage.removeItem('token');
         return { 
            ...state,
            token: null,
            isAuthenicated: false,
            loading: false
         };


         
      default:
         return state;
   }
}