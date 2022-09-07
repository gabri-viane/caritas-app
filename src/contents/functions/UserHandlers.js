import React from 'react';
import User from "./../../components/extra/user";
import { datax, handleDisconnect } from "../data.js";
import { user } from '../database/Connection';



export function handleModify(instance, instance2) {
    //instance.setState({ body: <><span>Modificato correttamente</span></> });

    user({ ...{ method: 'put', k: 'update' }, ...instance2.state }, (dt) => { alert("Dati modificati correttamente"); }, (dt) => { alert("Dati non modificati"); })
};


export function handleUserAction(instance) {
    datax.DataHandler.isLogged(() => {
        instance.setState({ showLogin: false, body: <User handleDisconnect={() => { handleDisconnect(instance) }} handleModify={(instance2) => handleModify(instance, instance2)} /> });
    }, (error) => {
        instance.setState({ showLogin: true, body: instance.generateLoginModule(error.msg) });
    });
};