// Helper to grab the user id
export const getUserId = user => {
  if (
    user &&
    user.signInUserSession &&
    user.signInUserSession.idToken &&
    user.signInUserSession.idToken.payload &&
    user.signInUserSession.idToken.payload.sub
  ) {
    return user.signInUserSession.idToken.payload.sub
  }

  return null
}

// Helper to grab the user groups
export const getUserGroups = user => {
  if (
    user &&
    user.signInUserSession &&
    user.signInUserSession.idToken &&
    user.signInUserSession.idToken.payload &&
    user.signInUserSession.idToken.payload['cognito:groups']
  ) {
    return user.signInUserSession.idToken.payload['cognito:groups']
  }

  return null
}
