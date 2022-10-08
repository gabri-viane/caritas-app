import axios from "axios";
import { datax } from "../data";
const API_PATH =  process.env.REACT_APP_API_PATH;// + process.env.REACT_APP_WEB_API_REF;

function conn(path, values, success_handler, error_handler) {
    if (values.method === 'post') {
        axios.post(API_PATH + path,
            values, {
            headers: {
                'content-type': 'application/json',
                'X-Auth-Username': datax.DataHandler.access.username,
                'X-Auth-Token': datax.DataHandler.access.token
            }
        }).then(result => {
            let dt = result.data;
            console.log("Response Post: " + JSON.stringify(dt));
            if (dt.auth && dt.res.exec) {
                success_handler(dt);
            } else {
                error_handler(dt);
            }
        })
            .catch(error => { error_handler(error); });
    } else if (values.method === 'get') {
        axios.get(
            API_PATH + path,
            {
                params: values,
                headers: {
                    'content-type': 'application/json',
                    'X-Auth-Username': datax.DataHandler.access.username,
                    'X-Auth-Token': datax.DataHandler.access.token
                }
            }
        ).then(result => {
            let dt = result.data;
            //console.log("Response Get: " + JSON.stringify(dt));
            if (dt.auth) {
                success_handler(dt);
            } else {
                error_handler(dt);
            }
        })
            .catch(error => error_handler(error));
    } else if (values.method === 'put') {
        axios.put(
            API_PATH + path,
            values,
            {
                headers: {
                    'content-type': 'application/json',
                    'X-Auth-Username': datax.DataHandler.access.username,
                    'X-Auth-Token': datax.DataHandler.access.token
                }
            }
        ).then(result => {
            let dt = result.data;
            //console.log("Response Put: " + JSON.stringify(dt));
            if (dt.auth && dt.res.exec) {
                success_handler(dt);
            } else {
                error_handler(dt);
            }
        }).catch(error => error_handler(error.data));
    } else if (values.method === 'delete') {
        axios.delete(
            API_PATH + path,
            {
                headers: {
                    'content-type': 'application/json',
                    'X-Auth-Username': datax.DataHandler.access.username,
                    'X-Auth-Token': datax.DataHandler.access.token
                }
                /* ,
                data: {
                    'X-Auth-Username': values.username,
                    'X-Auth-Token': values.token
                } */
            }
        ).then(result => {
            let dt = result.data;
            //console.log("Response Delete: " + JSON.stringify(dt));
            if (dt.auth && dt.res.exec) {
                success_handler(dt);
            } else {
                error_handler(dt);
            }
        }).catch(error => error_handler(error.data));
    }
}


export function verify(values, success_handler, error_handler) {
    user({ method: 'post', link: 'user', k: 'access', username: values.username, token: values.token }, success_handler, error_handler);
}

export function user(values, success_handler, error_handler) {
    conn("/user/" + values['k'], values, success_handler, error_handler);
}

export function fam(values, success_handler, error_handler) {
    conn("/fam/" + values['k'], values, success_handler, error_handler);
}

export function mag(values, success_handler, error_handler) {
    conn("/mag/" + values['k'], values, success_handler, error_handler);
}

export function extra(values, success_handler, error_handler) {
    conn("/extra/" + values['k'], values, success_handler, error_handler);
}