import { datax } from "../data";
import { _get, _post, _put } from "./connections";

const VERIFY_USER = 'user/access/';
const GET_USER = 'user/get/';
const LOGIN_USER = 'user/login/';
const UPDATE_USER = 'user/update/';
const CREATE_USER = 'user/add/';

/**
 * Verifica tramite username e token se l'utente ha accesso.
 * 
 * @param {Object} access Oggetto che contiene il token e username da verificare 
 * @param {Function} success_handler Callback di successo
 * @param {Function} error_handler Callback di fallimento
 */
export function verifyUser(access, success_handler, error_handler) {
    _post(VERIFY_USER, { username: access.username, token: access.token }, success_handler, error_handler);
}

/**
 * Richiede i dati dell'utente tramite username e token.
 * 
 * @param {Function} success_handler Callback di successo
 * @param {Function} error_handler Callback di fallimento
 */
export function getUser(success_handler, error_handler) {
    _get(GET_USER, datax.DataHandler.access, success_handler, error_handler);
}

/**
 * Richiede il token d'accesso eseguendo il login con username e password.
 * 
 * @param {String} username Username da inviare
 * @param {String} password Password da inviare
 * @param {Function} success_handler Callback di successo
 * @param {Function} error_handler Callback di fallimento
 */
export function loginUser(username, password, success_handler, error_handler) {
    _post(LOGIN_USER, { username: username, password: password }, success_handler, error_handler);
}

/**
 * Modifica i dati di un utente.
 * 
 * @param {String} new_username Nuovo username per l'account
 * @param {String} new_email Nuova email per l'account
 * @param {String} password password per confermare la Modifica
 * @param {Function} success_handler Callback di successo
 * @param {Function} error_handler Callback di fallimento
 */
export function modifyUser(new_username, new_email, password, success_handler, error_handler) {
    _put(UPDATE_USER, { newuser: new_username, password: password, newemail: new_email }, success_handler, error_handler)
}

/**
 * Crea un nuovo 'spazio' dati per un utente da registrare.
 * 
 * @param {String} username Nuovo username per l'account
 * @param {String} email Nuova email per l'account
 * @param {Function} success_handler Callback di successo
 * @param {Function} error_handler Callback di fallimento
 */
export function addUser(username, email, success_handler, error_handler) {
    _post(CREATE_USER, { username: username, email: email }, success_handler, error_handler)
}