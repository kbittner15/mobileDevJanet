import initialState from './initialState'
import {
  STORE_PERSONA,
  SET_LOADING,
  STORE_SESSION,
  SET_NUMBER_UNREAD_MESSAGE,
  SET_NUMBER_UNREAD_THREAD,
  SAVE_ACTIVE_PERSONA_DEMO_MODE,
  SAVE_SESSION_DEMO_MODE,
  RESTORE_ACTIVE_PERSONA_DEMO_MODE,
  RESTORE_SESSION_DEMO_MODE,
  SAVE_PUSH_NOTIFICATION_INFO,
  SET_EMAIL,
  SET_PASSWORD,
  SET_CONFIRM_PASSWORD,
  SET_EMAIL_ERROR,
  SET_PASSWORD_ERROR,
  SET_NEW_PASSWORD_ERROR,
  CLEAR_EMAIL_ERROR,
  CLEAR_PASSWORD_ERROR,
  CLEAR_NEW_PASSWORD_ERROR,
  CLEAR_CREDENTIALS,
  SAVE_BEHAVIOR_REPORTS_SUSTAINED,
  SAVE_PERSONA_NOTIFICATIONS,
  SET_OLD_PASSWORD,
  AUTH_RUNTIME_CACHE
} from './types'

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case SET_EMAIL: {
      return { ...state, email: !!payload ? payload.trim() : payload }
    }
    case SET_PASSWORD: {
      return { ...state, password: payload }
    }
    case SET_CONFIRM_PASSWORD: {
      return { ...state, passwordConfirm: payload }
    }
    case SET_OLD_PASSWORD: {
      return { ...state, oldPassword: payload }
    }
    case SET_EMAIL_ERROR: {
      return { ...state, errors: { ...state.errors, email: payload } }
    }
    case SET_PASSWORD_ERROR: {
      return { ...state, errors: { ...state.errors, password: payload } }
    }
    case SET_NEW_PASSWORD_ERROR: {
      return { ...state, errors: { ...state.errors, newPassword: payload } }
    }
    case CLEAR_EMAIL_ERROR: {
      return { ...state, errors: { ...state.errors, email: undefined } }
    }
    case CLEAR_PASSWORD_ERROR: {
      return { ...state, errors: { ...state.errors, password: undefined } }
    }
    case CLEAR_NEW_PASSWORD_ERROR: {
      return { ...state, errors: { ...state.errors, newPassword: undefined } }
    }
    case CLEAR_CREDENTIALS: {
      return { ...state, email: undefined, password: undefined, passwordConfirm: undefined, oldPassword: undefined, authCache: null }
    }
    case STORE_PERSONA: {
      return { ...state, persona: payload, activePersona: !!payload && payload.activePersona }
    }
    case STORE_SESSION: {
      return { ...state, session: payload }
    }
    case SET_LOADING: {
      return { ...state, loading: payload }
    }
    case SET_NUMBER_UNREAD_MESSAGE: {
      return { ...state, numberUnreadMessage: payload }
    }
    case SET_NUMBER_UNREAD_THREAD: {
      return { ...state, numberUnreadThread: payload }
    }    
    case SAVE_ACTIVE_PERSONA_DEMO_MODE: {
      return { ...state,  savedActivePersonaForDemoMode: payload }
    }
    case SAVE_SESSION_DEMO_MODE: {
      return { ...state,  savedSessionForDemoMode: payload }
    }
    case RESTORE_ACTIVE_PERSONA_DEMO_MODE: {
      return { ...state,  activePersona: payload, persona: { ...state.persona, activePersona: payload } }
    }
    case RESTORE_SESSION_DEMO_MODE: {
      return { ...state,  session: payload }
    }
    case RESTORE_SESSION_DEMO_MODE: {
      return { ...state,  session: payload }
    }
    case SAVE_PUSH_NOTIFICATION_INFO: {
      return { ...state, pushNotificationInfo: payload}
    }    
    case SAVE_BEHAVIOR_REPORTS_SUSTAINED: {
      return { ...state, behaviorReportsSustained: payload}
    }
    case SAVE_PERSONA_NOTIFICATIONS: {
      return { ...state, notifications: payload}
    }
    /**
     *   Auth Runtime Cache    : internal state for tracking repetitive auth attempts,
     * providing extra frontend-only security features such as email-abuse warnings and
     * throttling failed login attempts on the client. Obscurity is marginally helpful
     */
    case AUTH_RUNTIME_CACHE: {
      return { ...state, authCache: payload }
    }
    default:
      return state
  }
}
