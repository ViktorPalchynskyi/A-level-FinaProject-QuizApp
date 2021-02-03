import axios from 'axios';
import C from './actionType';

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