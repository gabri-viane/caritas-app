import { _get, _post, _delete, _put } from './connections';

const GET_ALL_MAG = 'mag/get/all';
const GET_AVAILABLES_MAG = 'mag/get/availables';
const GET_AVAILABLES_ORDERED_ASC_MAG = 'mag/get/availables/asc';
const GET_AVAILABLES_ORDERED_DESC_MAG = 'mag/get/availables/desc';
//Prodotti
const GET_ALL_PROD_MAG = 'mag/get/prod/all';
const GET_ID_PROD_MAG = 'mag/get/prod/';//+ID_PROD
//Entrate
const GET_ALL_ENTR_MAG = 'mag/get/entr/all';
const GET_FROM_ENTR_MAG = 'mag/get/entr/from/';//+ID_DON
const GET_AFTER_ENTR_MAG = 'mag/get/entr/after/';//+TIMESTAMP
const GET_BEFORE_ENTR_MAG = 'mag/get/entr/before/';//+TIMESTAMP
const GET_PROD_ENTR_MAG = 'mag/get/entr/prod/';//+ID_PROD
const GET_ID_ENTR_MAG = 'mag/get/entr/id/';//+ID_ENTR
//Modifiche magazzino
const GET_ALL_EDIT_MAG = 'mag/get/edit/all';
const GET_FROM_EDIT_MAG = 'mag/get/edit/from/';//+ID_MOT
const GET_AFTER_EDIT_MAG = 'mag/get/edit/after/';//+TIMESTAMP
const GET_BEFORE_EDIT_MAG = 'mag/get/edit/before/';//+TIMESTAMP
const GET_PROD_EDIT_MAG = 'mag/get/edit/prod/';//+ID_PROD
const GET_ID_EDIT_MAG = 'mag/get/edit/id/';//+ID_EDIT

/**
 * Restituisce una lista di tutto il magazzino.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAllMagazzino(success_handler, error_handler) {
    _get(GET_ALL_MAG, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutto il magazzino.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAvailablesMagazzino(success_handler, error_handler) {
    _get(GET_AVAILABLES_MAG, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutti gli ID dei prodotti del
 * magazzino in ordine CRESCENTE del nome.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAvailablesASCMagazzino(success_handler, error_handler) {
    _get(GET_AVAILABLES_ORDERED_ASC_MAG, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutti gli ID dei prodotti del
 * magazzino in ordine DECRESCENTE del nome.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAvailablesDESCMagazzino(success_handler, error_handler) {
    _get(GET_AVAILABLES_ORDERED_DESC_MAG, {}, success_handler, error_handler);
}


/**
 * Restituisce una lista di tutti i prodotti del magazzino.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAllProdottiMagazzino(success_handler, error_handler) {
    _get(GET_ALL_PROD_MAG, {}, success_handler, error_handler);
}

/**
 * Restituisce un prodotto registrato con IDPROD.
 * 
 * @param {Number} idprod
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getIDProdottiMagazzino(idprod, success_handler, error_handler) {
    _get(GET_ID_PROD_MAG + idprod, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutte le entrate del magazzino.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAllEntrateMagazzino(success_handler, error_handler) {
    _get(GET_ALL_ENTR_MAG, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di entrate di un donatore IDDON.
 * 
 * @param {Number} iddon
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getFromEntrateMagazzino(iddon, success_handler, error_handler) {
    _get(GET_FROM_ENTR_MAG + iddon, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di entrate dopo una certa data.
 * 
 * @param {Date} after
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAfterEntrateMagazzino(after, success_handler, error_handler) {
    _get(GET_AFTER_ENTR_MAG + after.getTime() / 1000, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di entrate prima di una certa data.
 * 
 * @param {Date} before
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getBeforeEntrateMagazzino(before, success_handler, error_handler) {
    _get(GET_BEFORE_ENTR_MAG + before.getTime() / 1000, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di entrate di un certo prodotto IDPROD.
 * 
 * @param {Number} idprod
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getProdottoEntrateMagazzino(idprod, success_handler, error_handler) {
    _get(GET_PROD_ENTR_MAG + idprod, {}, success_handler, error_handler);
}

/**
 * Restituisce una singola entrata con IDENTR.
 * 
 * @param {Number} identr
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getIDEntrateMagazzino(identr, success_handler, error_handler) {
    _get(GET_ID_ENTR_MAG + identr, {}, success_handler, error_handler);
}


/**
 * Restituisce una lista di tutte le modifiche del magazzino.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAllModificheMagazzino(success_handler, error_handler) {
    _get(GET_ALL_EDIT_MAG, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di modifiche per un motivo IDMOT.
 * 
 * @param {Number} idmot
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getFromModificheMagazzino(idmot, success_handler, error_handler) {
    _get(GET_FROM_EDIT_MAG + idmot, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di modifiche dopo una certa data.
 * 
 * @param {Date} after
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAfterModificheMagazzino(after, success_handler, error_handler) {
    _get(GET_AFTER_EDIT_MAG + after.getTime() / 1000, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di modifiche prima di una certa data.
 * 
 * @param {Date} before
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getBeforeModificheMagazzino(before, success_handler, error_handler) {
    _get(GET_BEFORE_EDIT_MAG + before.getTime() / 1000, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di modifiche di un certo prodotto IDPROD.
 * 
 * @param {Number} idprod
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getProdottoModificheMagazzino(idprod, success_handler, error_handler) {
    _get(GET_PROD_EDIT_MAG + idprod, {}, success_handler, error_handler);
}

/**
 * Restituisce una singola modifica con IDEDIT.
 * 
 * @param {Number} idedit
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getIDModificheMagazzino(idedit, success_handler, error_handler) {
    _get(GET_ID_EDIT_MAG + idedit, {}, success_handler, error_handler);
}

const ADD_PROD_MAG = 'mag/add/prod';
const ADD_ENTR_MAG = 'mag/add/entr';
const ADD_EDIT_MAG = 'mag/add/edit';

/**
 * Crea un'array rappresentante il prodotto per inviarlo alle API correttamente:
 * in modo che i nomi delle chiavi dell'array siano quelle richieste dal server.
 * 
 * @param {String} nome_prodotto 
 * @param {Number} idconf ID della confezione
 * @param {Boolean} is_magazzino 
 * @param {Boolean} is_fresco 
 * @param {Boolean} is_igiene 
 * @param {Boolean} is_extra 
 * @returns L'array formato dalle coppie chiavi-valori corretti
 */
export function boxProdottoValues(nome_prodotto, idconf,
    is_magazzino, is_fresco, is_igiene, is_extra) {
    return {
        Nome: nome_prodotto,
        IDConfezioni: idconf,
        IsMagazzino: is_magazzino,
        IsFresco: is_fresco,
        IsIgiene: is_igiene,
        IsExtra: is_extra
    };
}

/**
 * Aggiunge un nuovo prodotto.
 * 
 * @param {Array} values Oggetto di parametri creati con 'boxProdottoValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function addProdottoMagazzino(values, success_handler, error_handler) {
    _post(ADD_PROD_MAG, values, success_handler, error_handler);
}

/**
 * Crea un'array rappresentante l'entrata per inviarlo alle API correttamente:
 * in modo che i nomi delle chiavi dell'array siano quelle richieste dal server.
 * 
 * @param {Number} idprod ID del prodotto
 * @param {Number} iddon ID del donatore
 * @param {Number} totale Totale donato
 * @param {Date} data_arrivo Data di arrivo dell'entrata
 * @returns L'array formato dalle coppie chiavi-valori corretti
 */
export function boxEntrataValues(idprod, iddon, totale, data_arrivo) {
    return {
        IDProdotti: idprod,
        IDDonatori: iddon,
        Totale: totale,
        Arrivo: data_arrivo.getTime() / 1000
    };
}

/**
 * Aggiunge una nuova entrata.
 * 
 * @param {Array} values Oggetto di parametri creati con 'boxEntrataValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function addEntrataMagazzino(values, success_handler, error_handler) {
    _post(ADD_ENTR_MAG, values, success_handler, error_handler);
}

/**
 * Crea un'array rappresentante l'entrata per inviarlo alle API correttamente:
 * in modo che i nomi delle chiavi dell'array siano quelle richieste dal server.
 * 
 * @param {Number} idprod 
 * @param {Number} idmot 
 * @param {Number} totale 
 * @param {Boolean} sottrai 
 * @returns 
 */
export function boxModificaValues(idprod, idmot, totale, sottrai) {
    return {
        IDProdotti: idprod,
        IDMotivi: idmot,
        Totale: totale,
        Sottrai: sottrai
    };
}

/**
 * Aggiunge una nuova modifica magazzino.
 * 
 * @param {Array} values Oggetto di parametri creati con 'boxModificaValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function addModificaMagazzino(values, success_handler, error_handler) {
    _post(ADD_EDIT_MAG, values, success_handler, error_handler);
}

const UPDATE_PROD_MAG = 'mag/update/prod/';//+ID_PROD
const UPDATE_ENTR_MAG = 'mag/update/entr/';//+ID_ENTR

/**
 * Aggiorna i valori di un prodotto con IDPROD.
 * 
 * @param {Number} idprod 
 * @param {Array} values Oggetto di parametri creati con 'boxProdottoValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function updateProdottoMagazzino(idprod, values, success_handler, error_handler) {
    _put(UPDATE_PROD_MAG + idprod, values, success_handler, error_handler);
}

/**
 * Aggiorna i valori di una entrata con IDENTR.
 * 
 * @param {Number} identr 
 * @param {Array} values Oggetto di parametri creati con 'boxEntrataValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function updateEntrataMagazzino(identr, values, success_handler, error_handler) {
    _put(UPDATE_ENTR_MAG + identr, values, success_handler, error_handler);
}

const DELETE_PROD_MAG = 'mag/delete/prod/';
const DELETE_ENTR_MAG = 'mag/delete/entr/';

/**
 * Elimina un prodotto con IDPROD.
 * 
 * @param {Number} idprod 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function deleteProdottoMagazzino(idprod, success_handler, error_handler) {
    _delete(DELETE_PROD_MAG + idprod, success_handler, error_handler);
}

/**
 * Elimina una entrata con IDENTR.
 * 
 * @param {Number} identr 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function deleteEntrataMagazzino(identr, success_handler, error_handler) {
    _delete(DELETE_ENTR_MAG + identr, success_handler, error_handler);
}
