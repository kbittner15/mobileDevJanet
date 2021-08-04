import initialState from './initialState';
import { SET_CURRENT_USER, SET_PEOPLE_CARDS, SET_LIKES, SET_DISLIKES } from './types';
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

    case SET_LIKES:
      {
        return { ...state,
          currentUser: { ...state.currentUser,
            profileData: { ...state.currentUser.profileData,
              likes: payload
            }
          }
        };
      }

    case SET_DISLIKES:
      {
        return { ...state,
          currentUser: { ...state.currentUser,
            profileData: { ...state.currentUser.profileData,
              dislikes: payload
            }
          }
        };
      }

    default:
      {
        return state;
      }
  }
});