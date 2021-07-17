import { validators } from '../../validation/lib';
const {
  isUserEmailValid,
  isCompanyEmailValid,
  isUniversityEmailValid
} = validators;
import { SetEmailError, ClearEmailError, SetPasswordError, SetNewPasswordError, ClearPasswordError } from './actions';
/**
 * User Email Validators
 * =========================
 * - Check all conditions of a possible user's email possibilities
 */

export const isNewUserEmailValid = email => Boolean(isUniversityEmailValid(email) || isCompanyEmailValid(email));
/**
 * Simple Password Validator
 */

export const isPasswordValid = password => Boolean(!!password && typeof password === 'string' && password.length >= 8);
/**
 * Simple Password Repetition Validator
 */

export const doPasswordsMatch = (password, repeated) => Boolean(!!password && password === repeated);
/**
 * Verify double-password inputs for new user creation and resetting password
 */

export const isValidPassword = passwordError => (dispatch, getState) => {
  const {
    personaReducer: {
      password
    }
  } = getState();
  const ipv = isPasswordValid(password);

  if (!ipv) {
    dispatch(SetPasswordError(!!passwordError ? passwordError : !!password ? 'Your password must have at least 8 characters.' : 'Please enter a password for your account.'));
  } else {
    dispatch(ClearPasswordError());
  }

  return ipv;
};
/**
 * Verify double-password inputs for new user creation and resetting password
 */

export const isValidPasswordPair = (isChangingPassword = false) => (dispatch, getState) => {
  const {
    personaReducer: {
      password,
      passwordConfirm
    }
  } = getState();
  const ivp = dispatch(isValidPassword());
  const dpm = doPasswordsMatch(password, passwordConfirm);

  if (ivp && !dpm) {
    if (isChangingPassword) {
      dispatch(SetNewPasswordError('These passwords do not match.'));
    } else {
      dispatch(SetPasswordError('These passwords do not match.'));
    }
  } else if (ivp && dpm) {
    dispatch(ClearPasswordError());
  }

  return ivp && dpm;
};
/**
 * Verify Email and Password structure for user creation / sign in
 */

export const isValidEmail = (isNewUser = true) => (dispatch, getState) => {
  const {
    personaReducer: {
      email
    }
  } = getState(); // Email Check

  const iev = isNewUser ? isNewUserEmailValid(email) : isUserEmailValid(email);

  if (!iev) {
    dispatch(SetEmailError(!!email ? 'You must use your university (.edu) or corporate email.' : 'You must specify an email address.'));
  } else {
    dispatch(ClearEmailError());
  }

  return iev;
};
/**
 * Verify Email and Password Pair for user creation
 */

export const areSignUpCredentialsValid = () => dispatch => {
  const ive = dispatch(isValidEmail());
  const ivpp = dispatch(isValidPasswordPair());
  return ive && ivpp;
};
/**
 * Verify Email and Password for user sign in
 */

export const areSignInCredentialsValid = () => dispatch => {
  const ive = dispatch(isValidEmail(false));
  const ivp = dispatch(isValidPassword('Please enter the password for your account.'));
  return ive && ivp;
};