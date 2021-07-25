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