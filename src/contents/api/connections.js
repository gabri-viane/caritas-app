import axios from "axios";
import { datax } from "../data";
const API_PATH = process.env.REACT_APP_API_PATH;// + process.env.REACT_APP_WEB_API_REF;

export function _post(path, values, success_handler, error_handler) {
    axios.post(
        API_PATH + path,
        values,
        {
            headers: {
                'content-type': 'application/json',
                'x-auth-username': datax.DataHandler.access.username,
                'x-auth-token': datax.DataHandler.access.token
            }
        }
    ).then(result => {
        let dt = result.data;
        //console.log("Response Post: " + JSON.stringify(dt));
        if (dt.auth && dt.res.exec) {
            success_handler(dt);
        } else {
            error_handler(dt);
        }
    }).catch(error => {
        error_handler(error);
    });
}

export function _get(path, values, success_handler, error_handler) {
    axios.get(
        API_PATH + path,
        {
            params: values,
            headers: {
                'content-type': 'application/json',
                'x-auth-username': datax.DataHandler.access.username,
                'x-auth-token': datax.DataHandler.access.token
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
}

export function _put(path, values, success_handler, error_handler) {
    axios.put(
        API_PATH + path,
        values,
        {
            headers: {
                'content-type': 'application/json',
                'x-auth-username': datax.DataHandler.access.username,
                'x-auth-token': datax.DataHandler.access.token
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
}

export function _delete(path, values, success_handler, error_handler) {
    axios.delete(
        API_PATH + path,
        {
            headers: {
                'content-type': 'application/json',
                'x-auth-username': datax.DataHandler.access.username,
                'x-auth-token': datax.DataHandler.access.token
            }
        }
    ).then(result => {
        let dt = result.data;
        //console.log("Response Delete: " + JSON.stringify(dt));
        if (dt.auth && dt.res.exec) {
            success_handler(dt);
        } else {
            error_handler(dt);
        }
    }).catch(error => {
        error_handler(error.data);
    });
}