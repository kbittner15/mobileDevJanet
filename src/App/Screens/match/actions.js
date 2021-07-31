
import { getFirestore } from "redux-firestore"

import {
  MATCH_ID,
  PEOPLE
} from './types'

export const SetMatchId = ID => ({
  type: MATCH_ID,
  payload: ID,
})

export const GetUser = () => async(dispatch, getState) => {

 dispatch(SetMatchId(currentUser.id))

}


