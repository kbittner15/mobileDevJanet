/**
 * Janus Reducers API - Registered Reducers
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * This is the registry of the exposed reducers.
 * If a model's `reducers.js` default export is
 * not proxied here and in the respective `index.js`
 * file, then it is not exposed via the Janus Reducers API.
 */


export { reducers as loginReducer} from './screens/login'
