import { getFirestore } from "redux-firestore"
import {
  SET_CURRENT_USER,
  SET_PEOPLE_CARDS,
  SET_LIKES,
  SET_DISLIKES,
} from './types'

export const setCurrentUser = currentUser => ({
  type: SET_CURRENT_USER,
  payload: currentUser
})

export const SetPeopleCard = peopleCards => ({
  type: SET_PEOPLE_CARDS,
  payload: peopleCards
})
export const SetLikes = likes => ({
  type: SET_LIKES,
  payload: likes
})

export const SetDislikes = dislikes => ({
  type: SET_DISLIKES,
  payload: dislikes
})

export const GetLikes = (newLikes) => async (dispatch, getState)=>{

  const {
    userReducer:{
      currentUser:{
        profileData:{
          likes
        }
      }
    },
  } = getState()

    likes.push(newLikes)
  dispatch(SetLikes(likes))
}

export const GetDislikes = (newDislikes) => async (dispatch, getState) => {
  const {
    userReducer:{
      currentUser:{
        profileData:{
          dislikes
        }
      }
    }
  } = getState()

  dislikes.push(newDislikes)
  dispatch(SetDislikes(dislikes))
}

export const GetCurrentUser =  () => async (dispatch, getState) => {
  const {
    userReducer: { currentUser }
  } = getState()
  return currentUser
}

export const GetCards = () => () => {
const {
  userReducer: {peopleCards}
} = getState()
  return peopleCards
}



export const LogUserIn = () => async (dispatch, getState) => {
  try {

    const {
      loginReducer: { email },
      loginReducer: { password }
    } = getState()

    //initialize database
    const firestore = getFirestore()

    //query database 
    const querySnapshot = await firestore.get({
      collection: "Users",
      where: [['user.email', '==', email]],
      where: [['user.password', '==', password]]
    });

    querySnapshot.forEach(doc => {
      let data = doc.data()
      dispatch(setCurrentUser(data))
    });

} catch (error) {
  console.log(error)
  }
}

export const SignUserUp = () => async (dispatch, getState) => {
  try {

    const {
      signupReducer: { newUser }
    } = getState()

    console.log({
       data: newUser, type: typeof newUser
    })
    
    let user = newUser
    //initialize database
    const firestore = getFirestore()

    //query database 
    const querySnapshot = await firestore.collection("Users").add({  
      user
    });

    dispatch(setCurrentUser(user))

} catch (error) {
  console.log(error)
  }
}


export const GetUserCards =  () => async (dispatch, getState) =>{
  try{
    
    const firestore = getFirestore()

    const querySnapshot = await firestore.get({
      collection: "Users",
      limit: 6
    })
    var cardsArray = []
    querySnapshot.forEach(doc => {
      let data = doc.data()
      cardsArray.push(data)
    });
    dispatch(SetPeopleCard(cardsArray))

  }catch(e){
    console.log(e, "problem getting user cards")
  }
}



