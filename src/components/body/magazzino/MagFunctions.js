import { mag, extra } from "../../../contents/database/Connection";

export function showMag(success_handler, error_handler, k_url) {
    mag({ ...{ method: 'get', k: "show/" + k_url } }, (dt) => { success_handler(dt) }, (dt) => { error_handler(dt) });
}

export function showProds(success_handler, error_handler, k_url) {
    mag({ ...{ method: 'get', k: "prod/" + k_url } }, (dt) => { success_handler(dt) }, (dt) => { error_handler(dt) });
}

export function updateProd(success_handler, error_handler, k_url, values) {
    mag({ ...values, ...{ method: 'put', k: "prod/update/" + k_url } }, (dt) => { success_handler(dt) }, (dt) => { error_handler(dt) });
}

export function deleteProd(success_handler, error_handler, k_url) {
    mag({ ...{ method: 'delete', k: "del/" + k_url.id_prod } }, (dt) => { success_handler(dt) }, (dt) => { error_handler(dt) });
}

export function createProd(success_handler, error_handler, values) {
    mag({ ...values, ...{ method: 'post', k: "add/prod" } }, (dt) => { success_handler(dt) }, (dt) => { error_handler(dt) });
}

export function requestConfezioni(success_handler) {
    extra({ ...{ method: 'get', k: "confezioni" } }, success_handler, (dt) => { alert(dt) });
}