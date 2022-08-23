import Cookies from 'js-cookie';
import { verify } from './database/Connection';
import { Component } from 'react';

export class Data extends Component {

    access = {
        token: undefined,
        username: undefined
    };

    constructor(props) {
        super(props);
        this.initData();
    }

    initData() {
        //Leggo se ho eseguito il login
        let tmp = Cookies.get('access');
        if (!!tmp) {
            tmp = tmp.split(";", 2);
            this.access.token = tmp[1];
            this.access.username = tmp[0];
        }
    }

    setLoginAccessData(token, user) {
        //var inFifteenSeconds = new Date(new Date().getTime() + 15 * 1000);
        //Cookies.set('user2', psw, { expires: inFifteenSeconds });
        Cookies.set('access', "" + user + ";" + token, { expires: 30 /*scade in 30gg*/ /*inFifteenSeconds*/, secure: true });
        this.access.token = token;
        this.access.username = user;
    }

    releaseAccess() {
        Cookies.remove('access');
        window.location.reload();
    }

    isLogged(onCheck, onCheckFail) {
        if ((!!this.access.token) && (!!this.access.username)) {
            verify(this.access, onCheck, onCheckFail)
        } else {
            onCheckFail({ msg: "Inserisci le credenziali per procedere:" });
        }
    }

    hasLogged(onCheck, onCheckFail) {
        if ((!!this.access.token) && (!!this.access.username)) {
            return onCheck();
        } else {
            return onCheckFail();
        }
    }

}

const datax = { DataHandler: new Data() };
export default datax; 