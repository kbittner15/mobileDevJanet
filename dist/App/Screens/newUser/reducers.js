import initialState from './initialState';
import { SET_NEW_USER } from './types';
export default ((state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case SET_NEW_USER:
      {
        return { ...state,
          newUser: payload
        };
      }

    default:
      {
        return state;
      }
  }
});