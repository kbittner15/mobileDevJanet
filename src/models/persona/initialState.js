export default {
  persona: null,
  activePersona: null, // Short name for the Persona that has been selected
  session: null, // Cognito data
  loading: true, // hang on loader while logging in
  numberUnreadMessage: null,
  numberUnreadThread: null,
  savedSessionForDemoMode: null, // save the session of the 'real' user to be able to restore its persona after turning off demo mode
  savedActivePersonaForDemoMode: null // save the role of the 'real' user to be able to know to call GetMentorFromPersona or GetMenteeFromPersona 
}
