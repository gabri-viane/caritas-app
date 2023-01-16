import React from 'react';
import User from "./user";
import { datax, handleDisconnect } from '../../contents/data';
import { user } from '../../contents/database/Connection';

export function handleModify(params, success_handler, error_handler) {
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