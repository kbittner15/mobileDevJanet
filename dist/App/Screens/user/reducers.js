import initialState from './initialState';
import { SET_CURRENT_USER, SET_PEOPLE_CARDS } from './types';
export default ((state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case SET_CURRENT_USER:
      {
        return { ...state,
          currentUser: payload
        };
      }

    case SET_PEOPLE_CARDS:
      {
        return { ...state,
          peopleCards: payload
        };
      }

    default:
      {
        return state;
      }
  }
});