import initialState from './initialState'
import {
    SET_FIRST_NAME,
    SET_LAST_NAME,
    SET_AGE,
    SET_PHONE,
    SET_EMAIL,
    SET_SEX,
    SET_USER_HEIGHT,
    SET_EDUCATION,
    SET_RELIGION,
    SET_PASSWORD,
    SET_DESCRIPTION,
    SET_HOMETOWN,
    SET_ETHNICITY,
    SET_FAMILY,
    SET_POLITICS,
    SET_FUTURE,
    SET_SUBSTANCES,
    SET_MEDIA,
    SET_PETS,
} from './types'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_FIRST_NAME: {
      return { ...state, 
           newUser:{
          ...state.newUser,
          firstName: payload 
        }
      }
    }
    case SET_LAST_NAME: {
        return { ...state, 
          newUser:{
            ...state.newUser,
          lastName: payload 
          }
        }
      }
    case SET_AGE: {
        return { ...state, 
          newUser:{
            ...state.newUser,
          birthDate: payload
         }
        } 
      }
    case SET_PHONE: {
        return { ...state, 
            newUser:{
                ...state.newUser,
                phoneNumber: payload 
            }
        }
      }  
    case SET_EMAIL:{
        return { ...state,
            newUser:{
                ...state.newUser,
             email: payload 
            }
        }
      } 
    case SET_SEX: {
        return { ...state,
            newUser:{
                ...state.newUser,
             sex: payload 
            }
            }
      } 
    case SET_USER_HEIGHT: {
        return { ...state, 
            newUser:{
                ...state.newUser,
                    profileData:{
                    ...state.newUser.profileData,
                    userHeight: payload
                    }
              }
            }
      } 
    case SET_EDUCATION: {
        return { ...state,
            newUser:{
              ...state.newUser,
                profileData: {
                    ...state.newUser.profileData,
             education: payload 
                }
            }
            }
      } 
    case SET_RELIGION: {
        return { ...state, 
          newUser:{
            ...state.newUser,
            questions: {
                ...state.newUser.questions,
          religion: payload 
            }
        }
      }
    } 
    case SET_PASSWORD: {
        return { ...state,
        newUser:{
            ...state.newUser,
            password:payload
        }
        }
    }
    case SET_DESCRIPTION:{
      return { ...state,
      newUser:{
        ...state.newUser,
        description:payload
      }}
    }
    case SET_HOMETOWN:{
      return{ ...state,
      newUser:{
        ...state.newUser,
        profileData:{
          ...state.newUser.profileData,
          hometown: payload
        }
      }}
    }
    case SET_ETHNICITY:{
      return { ...state,
      newUser:{
        ...state.newUser,
        profileData:{
          ...state.newUser.profileData,
          ethnicity: payload
        }
      }}
    }
    case SET_FAMILY:{
      return{ ...state,
      newUser:{
        ...state.newUser,
        questions:{
          ...state.newUser.questions,
          family: payload
        }
      }}
    }
    case SET_POLITICS:{
      return{...state,
      newUser:{
        ...state.newUser,
        questions:{
          ...state.newUser.questions,
          politics: payload
        }
      }}
    }
    case SET_FUTURE:{
      return{...state,
      newUser:{
        ...state.newUser,
        questions:{
          ...state.newUser.questions,
          future: payload
        }
      }}
    }
    case SET_SUBSTANCES:{
      return{...state,
      newUser:{
        ...state.newUser,
        questions:{
          ...state.newUser.questions,
          substances: payload
        }
      }}
    }
    case SET_MEDIA:{
      return{...state,
      newUser:{
        ...state.newUser,
        questions:{
          ...state.newUser.questions,
          media: payload
        }
      }}
    }
    case SET_PETS:{
      return{...state,
      newUser:{
        ...state.newUser,
        questions:{
          ...state.newUser.questions,
          pets: payload
        }
      }}
    }

    default: {
      return state
    }
  }
}