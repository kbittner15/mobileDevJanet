import Auth, { CognitoHostedUIIdentityProvider } from '@aws-amplify/auth';
import { API, graphqlOperation } from 'aws-amplify';
import { authStates as AuthStates, roles } from '../../enums/lib'; // Control Personas

import { ResetAllData as ResetMenteeData, GetMenteeFromPersona } from '../mentee/actions';
import { ResetAllData as ResetMentorData, GetMentorFromPersona } from '../mentor/actions';
import { ResetAllData as ResetMemberData, StoreMember } from '../member/actions'; // Persona Fragments

import { TrackAction, LogError, SetSuccessUI } from '../client/actions';
import { getUserId, getUserGroups } from './helpers';
import { getPersona, updatePersona } from './graphql';
import { STORE_PERSONA, SET_LOADING, STORE_SESSION, SET_NUMBER_UNREAD_MESSAGE, SET_NUMBER_UNREAD_THREAD, SAVE_ACTIVE_PERSONA_DEMO_MODE, SAVE_SESSION_DEMO_MODE, RESTORE_ACTIVE_PERSONA_DEMO_MODE, RESTORE_SESSION_DEMO_MODE, SET_EMAIL, SET_PASSWORD, CLEAR_CREDENTIALS, SET_EMAIL_ERROR, SET_PASSWORD_ERROR, SET_NEW_PASSWORD_ERROR, CLEAR_EMAIL_ERROR, CLEAR_PASSWORD_ERROR, CLEAR_NEW_PASSWORD_ERROR, SET_CONFIRM_PASSWORD, SET_OLD_PASSWORD, SAVE_PUSH_NOTIFICATION_INFO, SAVE_BEHAVIOR_REPORTS_SUSTAINED, SAVE_PERSONA_NOTIFICATIONS, AUTH_RUNTIME_CACHE } from './types'; // Primative Actions

export const StorePersona = persona => ({
  type: STORE_PERSONA,
  payload: persona
});
export const StoreSession = session => ({
  type: STORE_SESSION,
  payload: session
});
export const SetPersonaLoading = loading => ({
  type: SET_LOADING,
  payload: loading
}); // In-App Auth Controls

export const SetUserEmail = email => ({
  type: SET_EMAIL,
  payload: email
});
export const SetUserPassword = password => ({
  type: SET_PASSWORD,
  payload: password
});
export const SetUserPasswordConfirm = password => ({
  type: SET_CONFIRM_PASSWORD,
  payload: password
});
export const SetUserOldPassword = oldPassword => ({
  type: SET_OLD_PASSWORD,
  payload: oldPassword
});
export const ClearUserCredentials = () => ({
  type: CLEAR_CREDENTIALS,
  payload: null
}); // internal state only - sensitive

const UpdateAuthCache = cache => ({
  type: AUTH_RUNTIME_CACHE,
  payload: cache
});

export const SetEmailError = error => ({
  type: SET_EMAIL_ERROR,
  payload: error
});
export const SetPasswordError = error => ({
  type: SET_PASSWORD_ERROR,
  payload: error
});
export const SetNewPasswordError = error => ({
  type: SET_NEW_PASSWORD_ERROR,
  payload: error
});
export const ClearEmailError = () => ({
  type: CLEAR_EMAIL_ERROR,
  payload: null
});
export const ClearPasswordError = () => ({
  type: CLEAR_PASSWORD_ERROR,
  payload: null
});
export const ClearNewPasswordError = () => ({
  type: CLEAR_NEW_PASSWORD_ERROR,
  payload: null
});
export const SaveUserActivePersonaForDemoMode = persona => ({
  type: SAVE_ACTIVE_PERSONA_DEMO_MODE,
  payload: persona
});
export const SaveUserSessionForDemoMode = session => ({
  type: SAVE_SESSION_DEMO_MODE,
  payload: session
});
export const SavePushNotificationInfo = pushNotificationInfo => ({
  type: SAVE_PUSH_NOTIFICATION_INFO,
  payload: pushNotificationInfo
});
export const SaveBehaviorReportsSustained = behaviorReportsSustained => ({
  type: SAVE_BEHAVIOR_REPORTS_SUSTAINED,
  payload: behaviorReportsSustained
});
export const SavePersonaNotifications = personaNotifications => ({
  type: SAVE_PERSONA_NOTIFICATIONS,
  payload: personaNotifications
});
export const RestoreUserActivePersonaForDemoMode = savedActivePersonaForDemoMode => ({
  type: RESTORE_ACTIVE_PERSONA_DEMO_MODE,
  payload: savedActivePersonaForDemoMode
});
export const RestoreUserSessionForDemoMode = savedSessionForDemoMode => ({
  type: RESTORE_SESSION_DEMO_MODE,
  payload: savedSessionForDemoMode
}); // Load this User's Persona and save the associated specific Persona data; controlled, do not export.

const GetUserPersona = () => async (dispatch, getState) => {
  try {
    const {
      personaReducer: {
        session
      }
    } = getState();
    if (!session || !session.id) throw new Error('No session data');
    dispatch(TrackAction('userLoadingPersonaData'));
    dispatch(SetPersonaLoading(true));
    const persona = (await API.graphql(graphqlOperation(getPersona, {
      id: session.id
    }))).data.getPersona;

    if (persona && persona.id === session.id) {
      dispatch(TrackAction('userLoadedPersonaData'));
    }

    dispatch(StorePersona(persona));
    dispatch(SetPersonaLoading(false));
  } catch (error) {
    dispatch(TrackAction('failedToLoadUserPersonaData'));
    dispatch(LogError(error));
  }
};

export const UpdateActivePersona = newPersona => async (dispatch, getState) => {
  try {
    const {
      personaReducer: {
        session
      }
    } = getState();
    if (!session || !session.id) throw 'No session data';
    dispatch(SetPersonaLoading(true));
    const persona = (await API.graphql(graphqlOperation(updatePersona, {
      input: {
        id: session.id,
        activePersona: newPersona,
        // Deprecated; remove
        primaryRole: newPersona
      }
    }))).data.updatePersona;
    dispatch(StorePersona(persona));

    if (newPersona === roles.admin) {
      dispatch(StoreMember(null));
    }

    dispatch(SetPersonaLoading(false));
  } catch (error) {
    dispatch(LogError(error));
  }
};
export const SetAuthSession = updates => (dispatch, getState) => {
  try {
    const {
      personaReducer: {
        persona,
        session
      }
    } = getState();
    const {
      user,
      state,
      error
    } = { ...session,
      ...updates
    };
    const userId = getUserId(user);
    const userGroups = getUserGroups(user); // if signing out, clear the state and bail

    if (state === AuthStates.signIn) {
      dispatch(StoreSession({
        user: null,
        state,
        error,
        id: userId,
        groups: userGroups
      }));
      dispatch(StorePersona(null));
      dispatch(SetPersonaLoading(false));
      return;
    } // ensure loader starts in the correct state


    if (state === AuthStates.loading) {
      dispatch(SetPersonaLoading(true));
    } // Save updated session data, whatever it is (many states pass through this)


    dispatch(StoreSession({
      user,
      state,
      error,
      id: userId,
      groups: userGroups
    })); // We have sync'd the session data; now sync the persona with it

    if (user && userId) {
      // if already logged into this persona, turn off the loader
      if (persona && userId === persona.id) {
        dispatch(SetPersonaLoading(false));
        return;
      } // get this user's persona data


      dispatch(TrackAction('userAuthenticated'));
      dispatch(GetUserPersona());
    }
  } catch (error) {
    dispatch(LogError(error));
  }
}; // Get fresh user data from server, intentionally skipping cache

export const SyncCognitoData = (bypassCache = true, callback) => async dispatch => {
  try {
    // Always Refresh the Access Token, in case it has expired or changed
    await Auth.currentSession(); // Then download latest User data. We do this after updating the Session so that we have permission

    const refreshUser = await Auth.currentAuthenticatedUser({
      bypassCache
    });
    dispatch(SetAuthSession({
      user: refreshUser,
      state: AuthStates.signedIn,
      error: null
    }));
    if (callback) callback();
  } catch (error) {
    // throws error if user is unauthenticated, don't log it, just take them to sign-in screen.
    dispatch(SetAuthSession({
      user: null,
      state: AuthStates.signIn,
      error
    }));
  }
};
/**
 * Launches the OAuth flow, calling component will have to subscribe to Hub for changes
 */

export const LaunchOAuthFlow = (provider = 'Cognito') => async dispatch => {
  try {
    dispatch(TrackAction('launchOAuthFlow'));
    dispatch(SetAuthSession({
      state: AuthStates.loading
    }));
    await Auth.federatedSignIn({
      provider: CognitoHostedUIIdentityProvider[provider]
    });
  } catch (error) {
    dispatch(LogError(error));
    dispatch(SetAuthSession({
      user: null,
      state: AuthStates.signIn,
      error
    }));
  }
};
/**
 * Sign Up via Email Password
 */

export const SignUp = () => async (dispatch, getState) => {
  try {
    const {
      personaReducer: {
        email,
        password,
        session
      }
    } = getState();
    const {
      user
    } = await Auth.signUp({
      username: email.trim().toLowerCase(),
      password,
      attributes: {
        email: email.trim().toLowerCase()
      }
    });
    dispatch(StoreSession({ ...session,
      user
    }));
    return user;
  } catch (error) {
    dispatch(LogError(error));
    throw error;
  }
};
export const ChangePassword = () => async (dispatch, getState) => {
  try {
    const {
      personaReducer: {
        oldPassword,
        password,
        session
      }
    } = getState();
    const currentUser = await Auth.currentAuthenticatedUser();
    const {
      user: updatedUser
    } = await Auth.changePassword(currentUser, oldPassword, password);
    await dispatch(StoreSession({ ...session,
      user: updatedUser
    }));
    await dispatch(SetSuccessUI('Successfully changed password!'));
  } catch (error) {
    if (!!error && error.code === 'LimitExceededException') {
      dispatch(SetNewPasswordError('Password reset limit exceeded. Try again later.'));
    } else if (!!error && error.code === 'NotAuthorizedException') {
      dispatch(SetPasswordError('Incorrect current password.'));
    } else if (!!error) {
      dispatch(LogError(error));
    }
  }
};
/**
 * Sign In via Email Password
 */

export const SignIn = (emailFallback = '', passwordFallback = '') => async (dispatch, getState) => {
  const {
    personaReducer: {
      email,
      password,
      session,
      authCache
    }
  } = getState();
  /**
   * This section should be moved to a dedicated authentication module within Persona
   */

  const byTimeAsc = (a, b) => a.time < b.time ? -1 : 1;

  const minutes = 60000;
  const seconds = 1000;

  const shouldBlockAttempt = (failedSignInAttempts = []) => {
    if (!failedSignInAttempts || !failedSignInAttempts.length) return false; // don't block if first attempt

    const sortedAttempts = failedSignInAttempts.sort(byTimeAsc);
    const mostRecentAttempt = sortedAttempts[sortedAttempts.length - 1] || {
      time: Date.now(),
      delay: -1
    };
    const timeDelayExpires = mostRecentAttempt.time + mostRecentAttempt.delay * seconds;
    return Date.now() < timeDelayExpires;
  };

  const getSecondsRemaining = (failedSignInAttempts = []) => {
    if (!failedSignInAttempts || !failedSignInAttempts.length) return 0;
    const sortedAttempts = failedSignInAttempts.sort(byTimeAsc);
    const mostRecentAttempt = sortedAttempts[sortedAttempts.length - 1] || {
      time: Date.now(),
      delay: -1
    };
    const timeDelayExpires = mostRecentAttempt.time + mostRecentAttempt.delay * seconds;
    return Math.floor((timeDelayExpires - Date.now()) / seconds);
  };

  const getDensityOfRecentAttempts = (failedSignInAttempts = []) => {
    if (!failedSignInAttempts || !failedSignInAttempts.length) return 0;

    const onlyLastInterval = attempt => attempt.time > new Date(Date.now() - 5 * minutes);

    return failedSignInAttempts.filter(onlyLastInterval).length;
  };

  const getAppropriateDelayForFailure = (density, delay) => {
    const draftAnswer = Math.floor((density * delay || 1) / 2);
    if (delay === draftAnswer) return draftAnswer + density;
    return draftAnswer;
  };

  const appendFailedSignInAttempt = (fails = []) => {
    let newFailedAttempt = {};

    if (fails.length) {
      const density = getDensityOfRecentAttempts(fails);
      newFailedAttempt = {
        time: Date.now(),
        density,
        delay: getAppropriateDelayForFailure(density, fails[fails.length - 1].delay)
      };
    } else {
      newFailedAttempt = {
        time: Date.now(),
        density: 0,
        delay: 0
      };
    }

    return [...fails, newFailedAttempt];
  };

  if (!shouldBlockAttempt(!!authCache && authCache.fails || undefined)) {
    try {
      /**
       * First Authentication attempt
       *  - Substitute 'fallback' values when paramaters aren't specified (for type-safety guarantees)
       *  - Lowercase email letters for consistency
      */
      const firstSignInAttempt = await Auth.signIn({
        username: (email || emailFallback).trim().toLowerCase(),
        password: password || passwordFallback
      });
      dispatch(ClearUserCredentials());
      dispatch(UpdateAuthCache(null));
      return firstSignInAttempt;
    } catch (error) {
      console.log({
        attempt: 'one',
        failureReason: error.message
      });

      if (error.code === 'UserNotConfirmedException') {
        // User needs to confirm email, so resend a code and save the email for any UI usages
        dispatch(StoreSession({ ...session,
          username: email || emailFallback
        }));
        dispatch(RequestMFAVerificationCode(true));
      } else if (error.code === 'NotAuthorizedException' && error.message === 'Incorrect username or password.') {
        // Only retry if the first time; after that start skipping the second attempt
        if (!authCache || !authCache.shouldSkipRetryWithCasing) {
          /**
           * Second Authentication attempt
           *  - Substitute 'fallback' values when paramaters aren't specified (for server-side-type-safety guarantees)
           *  - Try email using raw input incase transformation was problematic
          */
          try {
            const secondSignInAttempt = await Auth.signIn({
              username: email || emailFallback,
              password: password || passwordFallback
            });
            dispatch(ClearUserCredentials());
            dispatch(UpdateAuthCache(null));
            return secondSignInAttempt;
          } catch (error) {
            console.log({
              attempt: 'two',
              failureReason: error.message
            });

            if (error.code === 'UserNotConfirmedException') {
              // User needs to confirm email, so resend a code and save the email for any UI usages
              dispatch(StoreSession({ ...session,
                username: email || emailFallback
              }));
              dispatch(RequestMFAVerificationCode(true));
            } else if (error.message === 'Password attempts exceeded') {
              // Server-side rejection of password attempt limit exceeded
              dispatch(UpdateAuthCache({ ...authCache,
                fails: appendFailedSignInAttempt(!!authCache && authCache.fails || undefined)
              }));
              dispatch(SetEmailError('Incorrect email or password.'));
              dispatch(LogError(null, `Too many sign-in attempts, please wait 30s before retrying.`));
            } else {
              // This is where we land when the user legitimately failed a login attempt
              dispatch(UpdateAuthCache({ ...authCache,
                shouldSkipRetryWithCasing: true,
                fails: appendFailedSignInAttempt(!!authCache && authCache.fails || undefined)
              }));
              dispatch(SetEmailError('Incorrect email or password.'));
            } // pass the Error back to the frontend for any ui updates


            throw error;
          }
        } else {
          // This is where we land when the user legitimately failed a login attempt
          dispatch(UpdateAuthCache({ ...authCache,
            shouldSkipRetryWithCasing: true,
            fails: appendFailedSignInAttempt(!!authCache && authCache.fails || undefined)
          }));
          dispatch(SetEmailError('Incorrect email or password.'));
        }
      } else if (error.message === 'Password attempts exceeded') {
        // Server-side rejection of password attempt limit exceeded
        dispatch(UpdateAuthCache({ ...authCache,
          fails: appendFailedSignInAttempt(!!authCache && authCache.fails || undefined)
        }));
        dispatch(SetEmailError('Incorrect email or password.'));
        dispatch(LogError(null, `Too many sign-in attempts, please wait 30s before retrying.`));
      } else {
        // We land here if the user failed first login attempt for misc. reasons
        dispatch(UpdateAuthCache({ ...authCache,
          fails: appendFailedSignInAttempt(!!authCache && authCache.fails || undefined)
        }));
        dispatch(SetEmailError('Incorrect email or password.'));
      } // pass the Error back to the frontend for any ui updates


      throw error;
    }
  } else {
    dispatch(SetEmailError(`Too many sign-in attempts. please wait ${getSecondsRemaining(!!authCache && authCache.fails)}s before retrying.`));
    dispatch(LogError(null, `Too many sign-in attempts, please wait ${getSecondsRemaining(!!authCache && authCache.fails)}s before retrying`)); // If user failing continuously on an email that doesn't exist, let's turn on the casing retry once more

    dispatch(UpdateAuthCache({ ...authCache,
      shouldSkipRetryWithCasing: false
    })); // pass the Error back to the frontend for any ui updates

    throw new Error('Password attempts exceeded');
  }
};
/**
 * Clear Persona data and sign out through OAuth
 */

export const SignOut = () => dispatch => {
  try {
    dispatch(TrackAction('userSigningOut'));
    dispatch(ResetMenteeData());
    dispatch(ResetMentorData());
    dispatch(ResetMemberData()); // No need to reset Persona model data; handled by SyncCognitoData signout callback

    Auth.signOut({
      global: true
    });
  } catch (error) {
    dispatch(LogError(error));
  }
};
/**
 * Send an MFA code from the UI to the function that handles it in the backend
 */

export const SubmitMFAVerificationCode = (mfaAttempt, shouldUseCognito = false) => async (dispatch, getState) => {
  try {
    const {
      personaReducer: {
        session,
        persona,
        email,
        password
      }
    } = getState();
    let response = null;

    if (shouldUseCognito) {
      response = await Auth.confirmSignUp(session.user.username, mfaAttempt); // Automatically sign the user in with their credentials from creating their account

      if (!!response && !response.errors && !!password && !!email) {
        dispatch(SignIn(email, password));
      }
    } else {
      response = await API.post('actionsApi', `/verify-mfa-code`, {
        body: {
          code: mfaAttempt
        }
      });
    }

    if (!!response) {
      if (!!response.errors) {
        throw new Error('Failure Validating Code'); // throws to the containing try/catch block
      }

      if (!shouldUseCognito) {
        // Save into frontend copy to stay synced with backend status
        if (persona.activePersona === roles.mentor) {
          dispatch(GetMentorFromPersona());
        } else if (persona.activePersona === roles.mentee) {
          dispatch(GetMenteeFromPersona());
        }
      }

      dispatch(SetSuccessUI('Verification Code Accepted!'));
    }
  } catch (error) {
    dispatch(LogError(null, 'That was not the correct verification code.'));
    throw new Error('Invalid Access Code'); // pass the clean error to the frontend so that it can use it for updating error UI
  }
};
/**
 * Request an MFA code from the UI to the function that handles it in the backend
 */

export const RequestMFAVerificationCode = (shouldUseCognito = false) => async (dispatch, getState) => {
  try {
    const {
      personaReducer: {
        session,
        email
      }
    } = getState();
    let successfullySentEmail = null;

    if (shouldUseCognito) {
      successfullySentEmail = await Auth.resendSignUp(!!session.user ? session.user.username : email);
    } else {
      successfullySentEmail = await API.post('actionsApi', `/send-persona-confirmation-email`);
    }

    if (!!successfullySentEmail) {
      dispatch(SetSuccessUI('We sent a verification code to your email.'));
    }

    return !!successfullySentEmail;
  } catch (error) {
    dispatch(LogError(error));
  }
};
/**
 * Send an MFA code to email verify the identity of someone trying to reset their password
 */

export const RequestForgotPasswordResetCode = () => async (dispatch, getState) => {
  try {
    const {
      personaReducer: {
        email
      }
    } = getState();
    const successfullySentEmail = await Auth.forgotPassword(email);

    if (!!successfullySentEmail) {
      dispatch(SetSuccessUI('We sent a verification code to your email.'));
    }

    return !!successfullySentEmail;
  } catch (error) {
    if (!!error && error.code === 'LimitExceededException') {
      dispatch(SetEmailError('Reset Attempt Limit Reached'));
      dispatch(LogError(error, 'Reset attempt limit reached, please try again after some time.'));
      throw error;
    }

    dispatch(LogError(error));
    throw error;
  }
};
/**
 * Change a user's password with the authority of the code provided (should have been sent to an email)
 */

export const ChangePasswordWithCredentials = code => async (dispatch, getState) => {
  try {
    const {
      personaReducer: {
        email,
        password
      }
    } = getState();
    await Auth.forgotPasswordSubmit(email, code, password);
    dispatch(SetSuccessUI('Password Changed.'));
    return true;
  } catch (error) {
    if (!!error && error.code === 'CodeMismatchException') {
      dispatch(LogError(null, 'That was not the correct reset code.'));
    } else {
      dispatch(LogError(error));
    }

    throw error;
  }
};
/**
 * Connects to this persona's mentor object or provisions a new one
 */

export const SelectMentor = () => async (dispatch, getState) => {
  try {
    const {
      mentorReducer: {
        newMentor
      }
    } = getState();
    dispatch(TrackAction('selectingMentorPersona'));
    dispatch(SetPersonaLoading(true));
    const updatedPersona = await API.post('actionsApi', `/request-to-join-mentor-group`, {
      body: {
        email: newMentor && newMentor.contactInfo && newMentor.contactInfo.email
      }
    });
    dispatch(SyncCognitoData(true, () => {
      dispatch(TrackAction('selectedMentorPersona'));
      dispatch(StorePersona(updatedPersona));
      dispatch(SetPersonaLoading(false));
    }));
  } catch (error) {
    dispatch(TrackAction('failedToSelectMentorPersona'));
    dispatch(LogError(error));
    dispatch(SetPersonaLoading(false));
  }
};
/**
 * Connects to this persona's mentee object or provisions a new one
 */

export const SelectMentee = () => async (dispatch, getState) => {
  try {
    const {
      menteeReducer: {
        newMentee
      }
    } = getState();
    dispatch(TrackAction('selectingMenteePersona'));
    dispatch(SetPersonaLoading(true));
    const updatedPersona = await API.post('actionsApi', `/request-to-join-mentee-group`, {
      body: {
        email: newMentee && newMentee.contactInfo && newMentee.contactInfo.email
      }
    });
    dispatch(SyncCognitoData(true, () => {
      dispatch(TrackAction('selectedMenteePersona'));
      dispatch(StorePersona(updatedPersona));
      dispatch(SetPersonaLoading(false));
    }));
  } catch (error) {
    dispatch(TrackAction('failedToSelectMenteePersona'));
    dispatch(LogError(error));
    dispatch(SetPersonaLoading(false));
  }
};
/**
 * Connects to this persona's member object or provisions a new one
 */

export const SelectMember = () => async dispatch => {
  try {
    dispatch(TrackAction('selectingMemberPersona'));
    dispatch(SetPersonaLoading(true));
    const updatedPersona = await API.post('actionsApi', `/request-to-join-member-group`);
    dispatch(SyncCognitoData(true, () => {
      dispatch(TrackAction('selectedMemberPersona'));
      dispatch(StorePersona(updatedPersona));
      dispatch(SetPersonaLoading(false));
    }));
  } catch (error) {
    dispatch(TrackAction('failedToSelectMemberPersona'));
    dispatch(LogError(error));
    dispatch(SetPersonaLoading(false));
  }
};
/**
 * Set the number of unread messages
 */

export const SetNumberUnreadMessage = payload => ({
  type: SET_NUMBER_UNREAD_MESSAGE,
  payload
});
/**
 * Set the number of unread threads
 */

export const SetNumberUnreadThread = payload => ({
  type: SET_NUMBER_UNREAD_THREAD,
  payload
});