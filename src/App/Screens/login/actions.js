import database from '../../../firebase/firebase'

import {
  SET_EMAIL,
  SET_PASSWORD,
} from './types'

export const SetEmail = email => ({
  type: SET_EMAIL,
  payload: email,
})
export const SetPassword = password => ({
  type: SET_PASSWORD,
  payload: password,
})

export const LogUserIn = () => async (dispatch, getState) => {
  try {
    const {
      loginReducer: { email },
      loginReducer: { password }
    } = getState()
  
  let firestoreRef = database.collection('Users').doc('UserData')
  let unsubscribe = this.firestoreRef.onSnapshot(this.getCollection)

  let query = []
  let result = []
  querySnapshot.forEach((res) => {
      console.log(res.data())
    const { firstName, lastName, age, img} = res.data();
    query.push({
      key: res.key,
      res,
      firstName,
      lastName,
      age,
      img,
    })
  })
  result = {firstName}

  
    

    console.log({loginUser: email,
    loginUserPassword: password})

  console.log({result})

// add method to conect to database here 

console.log("success")
} catch (error) {
  console.log("error")
  }
}