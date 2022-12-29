import { _get, _post, _delete, _put } from "./connections";

const GET_ALL_FAMILES = 'fam/get/all';
const GET_ADDRESS_FAMILES = 'fam/get/address';
const GET_CODF_FAMILES = 'fam/get/codice';
const GET_BOTH_FAMILES = 'fam/get/both';
const GET_DICHS_FAMILES = 'fam/get/dichs';
const GET_ID_FAMILES = 'fam/get/id/';//+ID
const GET_IDFAM_FAMILES = 'fam/get/idfam/';//+ID_FAM
const GET_FULL_ID_FAMILES = 'fam/get/id/data/';//+ID
const GET_FULL_IDFAM_FAMILES = 'fam/get/idfam/data/';//+ID_FAM
const GET_COMP_ID_FAMILES = 'fam/get/id/';//+ID + 'comp' + ID_COMP
const GET_COMP_IDFAM_FAMILES = 'fam/get/idfam/';//+ID_FAM + 'comp' + ID_COMP

/**
 * Restituisce una lista di tutte le famiglie.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAllFamilies(success_handler, error_handler) {
    _get(GET_ALL_FAMILES, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutte le famiglie che hanno un indirizzo
 * civico.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAddressFamilies(success_handler, error_handler) {
    _get(GET_ADDRESS_FAMILES, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutte le famiglie che hanno un codice
 * fiscale associato al dichiarante.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getCodiceFiscaleFamilies(success_handler, error_handler) {
    _get(GET_CODF_FAMILES, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutte le famiglie che hanno sia un indirizzo
 * civico che un codice ficale associto al dichiarante.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAddressAndCodiceFamilies(success_handler, error_handler) {
    _get(GET_BOTH_FAMILES, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutti i dichiaranti delle famiglie.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getDichiarantiFamilies(success_handler, error_handler) {
    _get(GET_DICHS_FAMILES, {}, success_handler, error_handler);
}

/**
 * Restituisce una famiglia tramite ID.
 * 
 * @param {Number} id
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getIDFamilies(id, success_handler, error_handler) {
    _get(GET_ID_FAMILES + id, {}, success_handler, error_handler);
}

/**
 * Restituisce una famiglia tramite IDFAM.
 * 
 * @param {Number} idfam
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getIDFAMFamilies(idfam, success_handler, error_handler) {
    _get(GET_IDFAM_FAMILES + idfam, {}, success_handler, error_handler);
}

/**
 * Restituisce una famiglia, con tutti i dati: dichiarante e componenti, tramite ID.
 * 
 * @param {Number} id
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getIDFamiliesComplete(id, success_handler, error_handler) {
    _get(GET_FULL_ID_FAMILES + id, {}, success_handler, error_handler);
}

/**
 * Restituisce una famiglia, con tutti i dati: dichiarante e componenti, tramite IDFAM.
 * 
 * @param {Number} idfam
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getIDFAMFamiliesComplete(idfam, success_handler, error_handler) {
    _get(GET_FULL_IDFAM_FAMILES + idfam, {}, success_handler, error_handler);
}

/**
 * Restituisce un componente di una famiglia tramite l'ID della famiglia
 * e l'IDCOMP del componente.
 * 
 * @param {Number} id ID della famiglia
 * @param {Number} idcomp ID del componente
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getCompIDFamily(id, idcomp, success_handler, error_handler) {
    _get(GET_COMP_ID_FAMILES + id + '/comp/' + idcomp, {}, success_handler, error_handler);
}

/**
 * Restituisce un componente di una famiglia tramite l'IDFAM della famiglia
 * e l'IDCOMP del componente.
 * 
 * @param {Number} idfam IDFAM della famiglia
 * @param {Number} idcomp ID del componente
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getCompIDFAMFamily(idfam, idcomp, success_handler, error_handler) {
    _get(GET_COMP_IDFAM_FAMILES + idfam + '/comp/' + idcomp, {}, success_handler, error_handler);
}

const ADD_FAMILY = 'fam/add';
const ADD_COMP_FAMILY = 'fam/add/comp/';//+ID_FAM

/**
 * Crea un'array rappresentante la famiglia per inviarlo alle API correttamente:
 *  in modo che i nomi delle chiavi dell'array siano quelle richieste dal server.
 * 
 * @param {Number} idfam 
 * @param {String} nome_dichiarante 
 * @param {String} cognome_dichiarante 
 * @param {String} indirizzo 
 * @param {String} telefono 
 * @param {String} nome_coniuge 
 * @param {String} cognome_coniuge 
 * @param {Date} data_nascita 
 * @param {String} codice_fiscale 
 * @returns L'array formato dalle coppie chiavi-valori corretti
 */
export function boxFamilyValues(idfam, nome_dichiarante, cognome_dichiarante,
    indirizzo, telefono, codice_fiscale, nome_coniuge = null, cognome_coniuge = null, data_nascita = null) {
    return {
        IDFAM: idfam,
        NDic: nome_dichiarante,
        CDic: cognome_dichiarante,
        CodiceF: codice_fiscale,
        Indirizzo: indirizzo,
        Telefono: telefono,
        NCon: nome_coniuge,
        CCon: cognome_coniuge,
        DNascita: data_nascita ? data_nascita.getTime() / 1000 : null
    };
}

/**
 * Aggiunge una nuova famiglia.
 * 
 * @param {Array} values Array di parametri creati con 'boxFamilyValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function addFamily(values, success_handler, error_handler) {
    _post(ADD_FAMILY, values, success_handler, error_handler);
}

/**
 * Crea un'array rappresentante il componente per inviarlo alle API correttamente:
 * in modo che i nomi delle chiavi dell'array siano quelle richieste dal server.
 * 
 * @param {String} nome 
 * @param {String} cognome 
 * @param {Date} data_nascita 
 * @param {Number} parentela 
 * @returns L'array formato dalle coppie chiavi-valori corretti
 */
export function boxComponentValues(nome, cognome, data_nascita, parentela) {
    return {
        Nome: nome,
        Cognome: cognome,
        Nascita: data_nascita.getTime() / 1000,
        Parentela: parentela
    };
}

/**
 * Aggiunge un nuovo componente ad una famiglia con IDFAM.
 * 
 * @param {Number} idfam
 * @param {Array} values Array di parametri creati con 'boxComponentValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function addComponentFamily(idfam, values, success_handler, error_handler) {
    _post(ADD_COMP_FAMILY + idfam, values, success_handler, error_handler);
}

const UPDATE_FAMILY = 'fam/update/';//+ID_FAM
const UPDATE_COMP_FAMILY = 'fam/update/';//+ID_FAM + 'comp' + ID_COMP

/**
 * Aggiorna i valori di una famiglia con IDFAM.
 * 
 * @param {Number} idfam 
 * @param {Array} values Array di parametri creati con 'boxFamilyValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function updateFamily(idfam, values, success_handler, error_handler) {
    _put(UPDATE_FAMILY + idfam, values, success_handler, error_handler);
}

/**
 * Aggiorna i valori di in componente di una famiglia con IDFAM e IDCOMP.
 * 
 * @param {Number} idfam 
 * @param {Number} idcomp 
 * @param {Array} values Array di parametri creati con 'boxFamilyValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function updateComponentFamily(idfam, idcomp, values, success_handler, error_handler) {
    _put(UPDATE_COMP_FAMILY + idfam + '/comp/' + idcomp, values, success_handler, error_handler);
}

const DELETE_FAMILY = 'fam/delete/';//+ID_FAM
const DELETE_COMP_FAMILY = 'fam/update/';//+ID_FAM + 'comp' + ID_COMP

/**
 * Elimina una famiglia con IDFAM.
 * 
 * @param {Number} idfam 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function deleteFamily(idfam, success_handler, error_handler) {
    _delete(DELETE_FAMILY + idfam, {}, success_handler, error_handler);
}

/**
 * Elimina un componente di una famiglia con IDFAM e IDCOMP.
 * 
 * @param {Number} idfam 
 * @param {Number} idcomp 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function deleteComponentFamily(idfam, idcomp, success_handler, error_handler) {
    _delete(DELETE_COMP_FAMILY + idfam + '/comp/' + idcomp, {}, success_handler, error_handler);
}