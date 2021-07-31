import initialState from './initialState';
import { MATCH_ID, PEOPLE } from './types';
export default ((state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case MATCH_ID:
      {
        return { ...state,
          match: { ...state.match,
            matchId: payload
          }
        };
      }

    default:
      {
        return state;
      }
  }
});