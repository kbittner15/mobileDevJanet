import initialState from './initialState';
import { SET_FIRST_NAME, SET_LAST_NAME, SET_AGE, SET_PHONE, SET_EMAIL, SET_SEX, SET_USER_HEIGHT, SET_EDUCATION, SET_RELIGION, SET_PASSWORD } from './types';
export default ((state = initialState, {
  type,
  payload
}) => {
  switch (type) {
    case SET_FIRST_NAME:
      {
        return { ...state,
          newUser: { ...state.newUser,
            firstName: payload
          }
        };
      }

    case SET_LAST_NAME:
      {
        return { ...state,
          newUser: { ...state.newUser,
            lastName: payload
          }
        };
      }

    case SET_AGE:
      {
        return { ...state,
          newUser: { ...state.newUser,
            birthDate: payload
          }
        };
      }

    case SET_PHONE:
      {
        return { ...state,
          newUser: { ...state.newUser,
            phoneNumber: payload
          }
        };
      }

    case SET_EMAIL:
      {
        return { ...state,
          newUser: { ...state.newUser,
            email: payload
          }
        };
      }

    case SET_SEX:
      {
        return { ...state,
          newUser: { ...state.newUser,
            sex: payload
          }
        };
      }

    case SET_USER_HEIGHT:
      {
        return { ...state,
          newUser: { ...state.newUser,
            userHeight: payload
          }
        };
      }

    case SET_EDUCATION:
      {
        return { ...state,
          newUser: { ...state.newUser,
            education: payload
          }
        };
      }

    case SET_RELIGION:
      {
        return { ...state,
          newUser: { ...state.newUser,
            religion: payload
          }
        };
      }

    case SET_PASSWORD:
      {
        return { ...state,
          newUser: { ...state.newUser,
            password: payload
          }
        };
      }

    default:
      {
        return state;
      }
  }
});