/**
 * Janus Actions API - Registered Actions
 * ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
 * This is the registry of the exposed actions.
 * If a model's `actions.js` exports are not
 * proxied here, then they are not exposed
 * via the Janus Actions API.
 */
export { actions as note } from './note';
export { actions as path } from './path';
export { actions as task } from './task';
export { actions as admin } from './admin';
export { actions as skill } from './skill';
export { actions as client } from './client';
export { actions as member } from './member';
export { actions as mentee } from './mentee';
export { actions as mentor } from './mentor';
export { actions as school } from './school';
export { actions as education } from './education';
export { actions as season } from './season';
export { actions as company } from './company';
export { actions as contact } from './contact';
export { actions as persona } from './persona';
export { actions as pipeline } from './pipeline';
export { actions as position } from './position';
export { actions as myCompany } from './mycompany';
export { actions as application } from './application';
export { actions as contactRequest } from './contactrequest';
export { actions as notification } from './notification';
export { actions as meeting } from './meeting';