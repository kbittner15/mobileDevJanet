import initialState from './initialState'
import {
  SET_EMAIL,
  SET_PASSWORD,
  
} from './types'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_EMAIL: {
      return { ...state, email: payload }
    }
    case SET_PASSWORD: {
      return { ...state, password: payload }
    }
  }
}