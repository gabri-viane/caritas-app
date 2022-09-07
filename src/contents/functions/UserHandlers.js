import React from 'react';
import User from "./../../components/extra/user";
import { datax, handleDisconnect } from "../data.js";
import { user } from '../database/Connection';



export function handleModify(instance, params, success_handler, error_handler) {
    //instance.setState({ body: <><span>Modificato correttamente</span></> });
    user({
        ...{
            method: 'put',
            k: 'update'
        },
        ...params
    }, (dt) => {
        success_handler(dt);
    }, (dt) => {
        error_handler(dt);
    });
};


export function handleUserAction(instance) {
    datax.DataHandler.isLogged(() => {
        instance.setState({
            showLogin: false,
            body: <User
                handleDisconnect={() => { handleDisconnect(instance) }}
                handleModify={(params) => handleModify(instance, params, (err) => { alert(err) })} />
        });
    }, (error) => {
        instance.setState({
            showLogin: true,
            body: instance.generateLoginModule(error.res.msg)
        });
    });
};