import { SET_EMAIL, SET_PASSWORD } from './types';
export const SetEmail = email => ({
  type: SET_EMAIL,
  payload: email
});
export const SetPassword = password => ({
  type: SET_PASSWORD,
  payload: password
});
export const LogUserIn = () => async (dispatch, getState) => {
  try {
    const {
      loginReducer: {
        email
      },
      loginReducer: {
        password
      }
    } = getState();
   

    console.log("success");
  } catch (error) {
    console.log("error");
  }
};