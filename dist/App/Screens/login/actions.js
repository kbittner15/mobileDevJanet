import { getFirestore } from "redux-firestore";
import { SET_EMAIL, SET_PASSWORD } from './types';
export const SetEmail = email => ({
  type: SET_EMAIL,
  payload: email
});
export const SetPassword = password => ({
  type: SET_PASSWORD,
  payload: password
});