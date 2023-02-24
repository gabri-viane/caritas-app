import { _get, _post, _delete, _put } from './connections';

/********************************
 *            GET
 *******************************/
//Borse
const GET_ALL_BOR = 'bor/get/all';
const GET_ALL_LAST_BOR = 'bor/get/last';
const GET_ID_LAST_BOR = 'bor/get/last/';//+ID_BORSA
const GET_IDFAM_LAST_BOR = 'bor/get/last/idfam/';//+ID_FAM
const GET_BORSA_BOR = 'bor/get/borsa/';//+ID_BORSA
const GET_INFO_BORSA_BOR = 'bor/get/borsa/info/';//+ID_BORSA
const GET_ALIMENTI_BORSA_BOR = 'bor/get/borsa/alim/';//+ID_BORSA
const GET_ALIMENTI_BORSA_BOR_F = 'bor/get/borsa/alimf/';//+ID_BORSA
const GET_IGIENE_BORSA_BOR = 'bor/get/borsa/igiene/';//+ID_BORSA
const GET_IGIENE_BORSA_BOR_F = 'bor/get/borsa/igienef/';//+ID_BORSA

/**
 * Restituisce una lista di tutte le borse.
 * 
 * [ID,IDFAM,DataConsegna,Note,Consegnata,Famiglia,NumeroElementi]
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAllBorse(success_handler, error_handler) {
    _get(GET_ALL_BOR, {}, success_handler, error_handler);
}

/**
 * Restituisce una lista di tutte le ultime borse.
 * 
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAllLastBorse(success_handler, error_handler) {
    _get(GET_ALL_LAST_BOR, {}, success_handler, error_handler);
}

/**
 * Restituisce una borsa tramite IDBorsa cercandola nella
 * lista delle ultime borse consegnate.
 * 
 * @param {Number} idborsa ID dell'ultima borsa
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getIDLastBorse(idborsa, success_handler, error_handler) {
    _get(GET_ID_LAST_BOR + idborsa, {}, success_handler, error_handler);
}

/**
 * Restituisce una borsa tramite IDFAM cercandola nella
 * lista delle ultime borse consegnate.
 * 
 * @param {Number} idfam ID della famiglia
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getIDFAMLastBorse(idfam, success_handler, error_handler) {
    _get(GET_IDFAM_LAST_BOR + idfam, {}, success_handler, error_handler);
}

/**
 * Restituisce una borsa tramite IDBorse.
 * 
 * @param {Number} idborsa ID della borsa
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getBorsa(idborsa, success_handler, error_handler) {
    _get(GET_BORSA_BOR + idborsa, {}, success_handler, error_handler);
}

/**
 * Restituisce le informazioni di una borsa tramite IDBorse.
 * 
 * @param {Number} idborsa ID della borsa
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getInformazioniBorsa(idborsa, success_handler, error_handler) {
    _get(GET_INFO_BORSA_BOR + idborsa, {}, success_handler, error_handler);
}

/**
 * Restituisce gli alimenti di una borsa tramite IDBorse.
 * 
 * @param {Number} idborsa ID della borsa
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAlimentiBorsa(idborsa, success_handler, error_handler) {
    _get(GET_ALIMENTI_BORSA_BOR + idborsa, {}, success_handler, error_handler);
}

/**
 * Restituisce gli alimenti in formato IDBorse-IDFAM-IDProdotti-Nome-Totale di una borsa tramite IDBorse.
 * 
 * @param {Number} idborsa ID della borsa
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getAlimentiBorsaF(idborsa, success_handler, error_handler) {
    _get(GET_ALIMENTI_BORSA_BOR_F + idborsa, {}, success_handler, error_handler);
}

/**
 * Restituisce gli elementi di igiene di una borsa tramite IDBorse.
 * 
 * @param {Number} idborsa ID della borsa
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getIgieneBorsa(idborsa, success_handler, error_handler) {
    _get(GET_IGIENE_BORSA_BOR + idborsa, {}, success_handler, error_handler);
}

/**
 * Restituisce gli elementi di igiene  in formato IDBorse-IDFAM-IDProdotti-Nome-Totale-IsIgiene di una borsa tramite IDBorse.
 * 
 * @param {Number} idborsa ID della borsa
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getIgieneBorsaF(idborsa, success_handler, error_handler) {
    _get(GET_IGIENE_BORSA_BOR_F + idborsa, {}, success_handler, error_handler);
}

/**
 * Restituisce gli elementi di una borsa tramite IDBorse 
 * (funzioni getAlimentiBorsaF e getIgieneBorsaF composte).
 * 
 * @param {Number} idborsa ID della borsa
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function getElementiBorsa(idborsa, success_handler, error_handler) {
    getAlimentiBorsa(idborsa, (dt_a) => {
        getIgieneBorsa(idborsa, (dt_i) => {
            dt_i.query = [...dt_a.query, ...dt_i.query];
            success_handler(dt_i);
        }, error_handler);
    }, error_handler);
}

/********************************
 *            ADD
 *******************************/
const ADD_BORSA_BOR = 'bor/add';
const ADD_ELEMENTO_BORSA_BOR = 'bor/add/borsa/';//+ID_BORSE + /elem
const ADD_ELEMENTI_BORSA_BOR = 'bor/add/borsa/';//+ID_BORSE + /elems

/**
 * Crea un'array rappresentante la borsa per inviarla alle API correttamente:
 * in modo che i nomi delle chiavi dell'array siano quelle richieste dal server.
 * 
 * @param {Number} idfam ID della famiglia
 * @param {Date} data_consegna Data di consegna della borsa
 * @param {String} note Le note della borsa
 * @param {Boolean} consegnata Segna se la borsa è stata consegnata oppure no
 * @returns L'array formato dalle coppie chiavi-valori corretti
 */
export function boxBorsaValues(idfam, data_consegna, note = null, consegnata = false) {
    return {
        IDFAM: idfam,
        Consegna: data_consegna ? data_consegna.getTime() / 1000 : new Date().getTime() / 1000,
        Note: note ? (note.trim().length > 0 ? note : null) : null,
        Consegnata: consegnata
    };
}

/**
 * Aggiunge una nuova borsa.
 * 
 * @param {Array} values Oggetto di parametri creati con 'boxBorsaValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function addBorsa(values, success_handler, error_handler) {
    _post(ADD_BORSA_BOR, values, success_handler, error_handler);
}

/**
 * Crea un'array rappresentante un'elemento borsa per inviarla alle API correttamente:
 * in modo che i nomi delle chiavi dell'array siano quelle richieste dal server.
 * 
 * @param {Number} idprodotto ID del prodotto
 * @param {Number} totale La quantità del prodotto da aggiungere/modificare alla borsa: se 0 o rimuove l'elemento
 * @param {Boolean} editing Deve essere {true} se si sta modificando l'elemento di una borsa 
 * @param {Boolean} sottrai Sottrai dal magazzino il prodotto oppure no.
 * @returns L'array formato dalle coppie chiavi-valori corretti
 */
export function boxElementoBorsaValues(idprodotto, totale, editing = false, sottrai = true) {
    return {
        IDProdotti: idprodotto,
        Totale: totale,
        Sottrai: sottrai,
        Editing: editing
    };
}

/**
 * Aggiunge un elemento ad una borsa.
 * 
 * @param {Array} values Oggetto di parametri creati con 'boxElementoBorsaValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function addElementoBorsa(idborsa, values, success_handler, error_handler) {
    _post(ADD_ELEMENTO_BORSA_BOR + idborsa + '/elem', values, success_handler, error_handler);
}

/**
 * Aggiunge un'array di elementi ad una borsa.
 * 
 * @param {Array} values Array di oggetti di parametri creati con 'boxElementoBorsaValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function addElementiBorsa(idborsa, values, success_handler, error_handler) {
    _post(ADD_ELEMENTI_BORSA_BOR + idborsa + '/elems', values, success_handler, error_handler);
}

/********************************
 *            UPDATE
 *******************************/
const UPDATE_BORSA_BOR = 'bor/update/borsa/';//+ID_BORSA
const UPDATE_ELEMENTO_BORSA_BOR = 'bor/update/elem/';//+ID_BORSA

/**
 * Aggiorna i valori di una borsa.
 * 
 * @param {Number} idborsa ID della borsa da modificare
 * @param {Array} values Oggetto di parametri creati con 'boxBorsaValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function updateBorsa(idborsa, values, success_handler, error_handler) {
    _put(UPDATE_BORSA_BOR + idborsa, values, success_handler, error_handler);
}

/**
 * Aggiorna i valori di una borsa.
 * 
 * @param {Number} idborsa ID della borsa dell'elemento da modificare
 * @param {Array} values Oggetto di parametri creati con 'boxBorsaValues'
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function updateElementoBorsa(idborsa, values, success_handler, error_handler) {
    _put(UPDATE_ELEMENTO_BORSA_BOR + idborsa, values, success_handler, error_handler);
}

/********************************
 *            DELETE
 *******************************/
const DELETE_BORSA_BOR = 'bor/delete/borsa/';//+ID_BORSA

/**
 * Elimina una borsa tramite ID.
 * 
 * @param {Number} idborsa ID della borsa da modificare
 * @param {Function} success_handler 
 * @param {Function} error_handler 
 */
export function deleteBorsa(idborsa, success_handler, error_handler) {
    _delete(DELETE_BORSA_BOR + idborsa, {}, success_handler, error_handler);
}
