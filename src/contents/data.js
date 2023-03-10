import Cookies from 'js-cookie';
import React, { Component } from 'react';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import LoadApp from '../components/loadApp';
import generateModal from './functions/ModalGenerators';
import { _DisconnectIcon } from './images';
import { verifyUser } from './api/capi-user';

export class Data extends Component {

    access = {
        token: undefined,
        username: undefined
    };

    dataSettings = {
        light: false,
        cols: 4
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
        tmp = Cookies.get('dataSettings');
        if (!!tmp) {
            this.dataSettings = JSON.parse(tmp);
        } else {
            this.setDataSettings(this.dataSettings);
        }
        var width = Math.max(document.documentElement.clientWidth, window.innerWidth || 0);
        if (width < 920) {//Se il dispositivo è piccolo
            this.dataSettings.light = true;
            this.dataSettings.cols = 2;
        }
    }

    setDataSettings(data) {
        this.dataSettings = data;
        Cookies.set('dataSettings', JSON.stringify(this.dataSettings));
    }

    getDataSettings() {
        return this.dataSettings;
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
            verifyUser(this.access, onCheck, onCheckFail)
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

export const datax = { DataHandler: new Data() };

export function handleDisconnect() {
    LoadApp.addModal(
        generateModal(2, "Disconnettersi?", _DisconnectIcon, "Disconnessione", () => {
            return <>
                <Container fluid >
                    <Row md="auto">
                        <Container fluid md="auto" className="text-center">
                            <Col md="auto" className="text-center">
                                <Row md="auto">
                                    <span className="h5 lead">Stai per disconnetterti: dopo il loguot dovrai eseguire nuovamente l'accesso.</span>
                                </Row>
                            </Col>
                        </Container>
                    </Row>
                </Container>
            </>;
        }, () => {
            return <>
                <Button variant='secondary' onClick={datax.DataHandler.releaseAccess}>Disconnetti</Button>
            </>
        }, () => { })
    );
}