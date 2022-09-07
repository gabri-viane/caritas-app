import axios from "axios";
const API_PATH = 'http://localhost:80/caritas-api/index.php';

export function verify(values, success_handler, error_handler) {
    axios({
        method: 'post',
        url: API_PATH,
        headers: {
            'content-type': 'application/json'
        },
        data: { link: 'user', k: 'access', username: values.username, token: values.token }
    })
        .then(result => {
            let dt = result.data;
            //console.log("Response: " + JSON.stringify(dt));
            if (dt.auth) {
                success_handler(dt);
            } else {
                error_handler(dt);
            }
        })
        .catch(error => error_handler(error));
}

export function user(values, success_handler, error_handler) {
    if (values.method === 'post') {
        axios({
            method: 'post',
            url: API_PATH,
            headers: {
                'content-type': 'application/json'
            },
            data: values
        }).then(result => {
            let dt = result.data;
            if (dt.auth) {
                success_handler(dt);
            } else {
                error_handler(dt);
            }
        })
            .catch(error => error_handler(error));
    } else if (values.method === 'get') {
        axios.get(
            API_PATH + "/user", {
            params: values
        }).then(result => {
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
            API_PATH, {
            params: values
        }).then(result => {
            let dt = result.data;
            console.log("Response Put: " + JSON.stringify(dt));
            if (dt.auth) {
                success_handler(dt);
            } else {
                error_handler(dt);
            }
        })
            .catch(error => error_handler(error));
    }
}