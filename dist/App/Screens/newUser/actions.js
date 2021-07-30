import { getFirestore } from "redux-firestore";
import { SET_NEW_USER } from './types';
export const setNewUser = newUser => ({
  type: SET_NEW_USER,
  payload: newUser
});
export const SignUserIn = () => async (dispatch, getState) => {
  try {
    const {
      signupReducer: {
        email
      },
      signupReducer: {
        firstName
      },
      signupReducer: {
        lastName
      },
      signupReducer: {
        birthDate
      },
      signupReducer: {
        phoneNumber
      },
      signupReducer: {
        sex
      },
      signupReducer: {
        userHeight
      },
      signupReducer: {
        education
      },
      signupReducer: {
        religion
      },
      signupReducer: {
        ethnicity
      }
    } = getState(); //initialize database

    const firestore = getFirestore(); //query database 

    const querySnapshot = await firestore.get({
      collection: "Users",
      where: [['email', '==', email]],
      where: [['password', '==', password]]
    });
    querySnapshot.forEach(doc => {
      let data = doc.data();
      dispatch(setCurrentUser(data));
    });
  } catch (error) {
    console.log(error);
  }
};