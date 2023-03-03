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


export function handleUserAction(generateLoginModule, el) {
    datax.DataHandler.isLogged(() => {
        el(<User
            handleDisconnect={() => { handleDisconnect() }}
            handleModify={(params) => handleModify(params, (err) => { alert(err) })} />
        );
    }, (error) => {
        el(generateLoginModule(error.res.msg));
    });
};