import { getFirestore } from "redux-firestore"
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
    SET_ETHNICITY,
    SET_PASSWORD,
} from './types'

export const SetFirst = firstName => ({
    type: SET_FIRST_NAME,
    payload: firstName,
  })
  export const SetLast = lastName => ({
    type: SET_LAST_NAME,
    payload: lastName,
  })
  export const SetAge = birthDate => ({
    type: SET_AGE,
    payload: birthDate,
  })
  export const SetPhone = phoneNum => ({
    type: SET_PHONE,
    payload: phoneNum,
  })
  export const SetEmail = email => ({
    type: SET_EMAIL,
    payload: email,
  })
  export const SetSex = sex => ({
    type: SET_SEX,
    payload: sex,
  })
  export const SetUserHeight = userHeight => ({
    type: SET_USER_HEIGHT,
    payload: userHeight,
  })
  export const SetEducation = education => ({
    type: SET_EDUCATION,
    payload: education,
  })
  export const SetReligion = religion => ({
    type: SET_RELIGION,
    payload: religion,
  })
  export const SetPassword = password =>({
    type: SET_PASSWORD,
    payload: password,
  })