import { _get } from "./connections";

const GET_PARENTELE_EXTRA = 'extra/get/parentele';
const GET_CONFEZIONI_EXTRA = 'extra/get/confezioni';
const GET_DONATORI_EXTRA = 'extra/get/donatori';
const GET_MOTIVI_EXTRA = 'extra/get/motivi';
const GET_UTENTI_EXTRA = 'extra/get/utenti';

/**
 * Restituisce una lista di tutte le parentele.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getParenteleExtra(success_handler, error_handler) {
    _get(GET_PARENTELE_EXTRA, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutte le confezioni.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getConfezioniExtra(success_handler, error_handler) {
    _get(GET_CONFEZIONI_EXTRA, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutti i donatori.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getDonatoriExtra(success_handler, error_handler) {
    _get(GET_DONATORI_EXTRA, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutti i motivi di modifica.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getMotiviExtra(success_handler, error_handler) {
    _get(GET_MOTIVI_EXTRA, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutti gli utenti registrati.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getUtentiExtra(success_handler, error_handler) {
    _get(GET_UTENTI_EXTRA, {}, success_handler, error_handler);
}