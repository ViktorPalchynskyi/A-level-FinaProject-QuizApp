import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import C from './actionType';

export const loadUser = () => async dispatch => { 
   if(localStorage.token) { 
      setAuthToken(localStorage.token);
   }

   try {
      const res = await axios.get('/api/auth');

      dispatch({
         type: C.USER_LOADED,
         payload: res.data
      });
   } catch (err) {
      dispatch({
         type: C.AUTH_ERROR
      }); 
   }
};

export const register = ({name,email, password}) => async dispatch => {
   const config = { 
      headers: { 
         'Content-Type': 'application/json'
      }
   };

   const body = JSON.stringify({ name,email,password});

   try {
      const res = await axios.post('api/users',body,config);

      dispatch({
         type: C.REGISTER_SUCCESS,
         payload: res.data
      });

      dispatch(loadUser());
   } catch (err) {
      const errors = err.response.data.errors;

      if(errors) {
         console.log(errors);
      }

     dispatch({
        type: C.REGISTER_FAIL
     }); 
   }
};

export const login = (email, password) => async dispatch => {
   const config = { 
      headers: { 
         'Content-Type': 'application/json'
      }
   };

   const body = JSON.stringify({email,password});

   try {
      const res = await axios.post('api/auth',body,config);

      dispatch({
         type: C.LOGIN_SUCCESS,
         payload: res.data
      });

      dispatch(loadUser());
   } catch (err) {
      const errors = err.response.data.errors;

      if(errors) { 
         console.log(errors);
         
      }

     dispatch({
        type: C.LOGIN_FAIL
     }); 
   }
}; 

export const logout = () => dispatch => {
   dispatch({type: C.LOGOUT});
};