import { getFirestore } from "redux-firestore";
import { SET_CURRENT_USER } from './types';
export const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  payload: currentUser
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
    } = getState(); //initialize database

    const firestore = getFirestore(); //query database 

    const querySnapshot = await firestore.get({
      collection: "Users",
      where: [['user.email', '==', email]],
      where: [['user.password', '==', password]]
    });
    querySnapshot.forEach(doc => {
      let data = doc.data();
      dispatch(setCurrentUser(data));
    });
  } catch (error) {
    console.log(error);
  }
};
export const SignUserIn = () => async (dispatch, getState) => {
  try {
    const {
      signupReducer: {
        newUser
      }
    } = getState();
    console.log({
      data: newUser,
      type: typeof newUser
    });
    let user = newUser; //initialize database

    const firestore = getFirestore(); //query database 

    const querySnapshot = await firestore.collection("Users").add({
      user
    });
    dispatch(setCurrentUser(user));
  } catch (error) {
    console.log(error);
  }
};
export const GetCurrentUser = () => async (dispatch, getState) => {
  const {
    userReducer: {
      currentUser
    }
  } = getState();
  return currentUser;
};