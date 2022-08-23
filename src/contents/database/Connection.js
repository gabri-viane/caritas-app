import axios from "axios";
const API_PATH = 'http://localhost:80/caritas-api/index.php';

export function verify(values, success_handler, error_handler) {
    axios({
        method: 'post',
        url: API_PATH,
        headers: {
            'content-type': 'application/json'
        },
        data: { k: 'access', username: values.username, token: values.token }
    })
        .then(result => {
            let dt = result.data;
            console.log("Response: " + JSON.stringify(dt));
            if (dt.auth) {
                success_handler(dt);
            } else {
                error_handler(dt);
            }
        })
        .catch(error => error_handler(error));
}