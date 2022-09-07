import { extra, fam } from "../../../contents/database/Connection";


export function showFams(success_handler, error_handler, k_url) {
    fam({ ...{ method: 'get', k: "show/" + k_url } }, (dt) => { success_handler(dt) }, (dt) => { error_handler(dt) });
}

export function updateFam(success_handler, error_handler, k_url, values) {
    fam({ ...values, ...{ method: 'put', k: "update/" + k_url } }, (dt) => { success_handler(dt) }, (dt) => { error_handler(dt) });
}

export function createFam(success_handler, error_handler, values) {
    fam({ ...values, ...{ method: 'post', k: "add" } }, (dt) => { success_handler(dt) }, (dt) => { error_handler(dt) });
}

export function deleteFam(success_handler, error_handler, k_url) {
    fam({ ...{ method: 'delete', k: "del/" + k_url.idfam } }, (dt) => { success_handler(dt) }, (dt) => { error_handler(dt) });
}

export function createComp(success_handler, error_handler, k_url, values) {
    fam({ ...values, ...{ method: 'post', k: "add/" + k_url } }, (dt) => { success_handler(dt) }, (dt) => { error_handler(dt) });
}

export function updateComp(success_handler, error_handler, k_url, values) {
    fam({ ...values, ...{ method: 'put', k: "update/" + k_url.idfam + "/" + k_url.idcomp } }, (dt) => { success_handler(dt) }, (dt) => { error_handler(dt) });
}

export function deleteComp(success_handler, error_handler, k_url) {
    fam({ ...{ method: 'delete', k: "del/" + k_url.idfam + '/comp/' + k_url.idcomp } }, (dt) => { success_handler(dt) }, (dt) => { error_handler(dt) });
}

export function requestParentele(success_handler) {
    extra({ ...{ method: 'get', k: "parentele" } }, success_handler, (dt) => { alert(dt) });
}

export function requestComponent(success_handler, error_handler, k_url) {
    fam({ ...{ method: 'get', k: "comp/" + k_url.idfam + "/" + k_url.idcomp } }, success_handler, (dt) => { error_handler(dt) });
}
