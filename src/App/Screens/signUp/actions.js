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
    SET_HOMETOWN,
    SET_FAMILY,
    SET_POLITICS,
    SET_FUTURE,
    SET_SUBSTANCES,
    SET_MEDIA,
    SET_DESCRIPTION,
    SET_PETS,
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
  export const SetDescription = description =>({
    type: SET_DESCRIPTION,
    payload: description,
  })
  export const SetHometown = hometown => ({
    type: SET_HOMETOWN,
    payload: hometown,
  })
  export const SetEthnicity = ethnicity =>({
    type: SET_ETHNICITY,
    payload: ethnicity,
  })
  export const SetFamily = family =>({
    type: SET_FAMILY,
    payload: family,
  })
  export const SetPolitics = politics =>({
    type: SET_POLITICS,
    payload: politics,
  })
  export const SetFuture = future => ({
    type: SET_FUTURE,
    payload: future,
  })
  export const SetSubstance = substance =>({
    type: SET_SUBSTANCES,
    payload: substance,
  })
  export const SetMedia = media =>({
    type: SET_MEDIA,
    payload: media,
  })
  export const SetPets = pets =>({
    type: SET_PETS,
    payload: pets,
  })
