import React, { Component } from "react";
import axios from "axios";

import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { handleUserAction } from "./user/UserHandlers";
import { datax, handleDisconnect } from "../contents/data.js";
import accessApp from "./extra/access";

import ProgrammNavbar from './extra/navbar';
import Home from './body/home';
import LoginModule from "./user/login";
import SettingsPage from "./extra/settings";
import { FamNavbar } from "./body/famiglia/FamNavbar";
import { MagNavbar } from "./body/magazzino/MagNavbar";
import { BorseNavbar } from "./body/borse/BagNavbar";
import { ModalTemplate } from "../contents/functions/ModalGenerators";

const API_PATH = process.env.REACT_APP_API_PATH; //"http://localhost:80/caritas-api/index.php";//+process.env.REACT_APP_WEB_API_REF;

/*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/
Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

class LoadApp extends Component {

    static app;
    /**
     * Lista di modali
     */
    modal_list = [];

    state = {
        showLogin: false,
        navbar: <></>,
        body: <></>,
        footer: <></>,
        show: false,
        modal: {},//modale corrente
        modals: [],
        messages: []
    };

    constructor(props) {
        if (LoadApp.app) {
            return LoadApp.app
        }
        super(props);
        LoadApp.app = this;
        this.state.footer = <></>;
        const empty_modal = {
            ID: 0,
            title: <></>,
            body: () => <></>,
            body_params: {},
            footer: () => <></>,
            footer_params: {},
            icon: {
                icon_src: null,
                alt: ''
            },
            exit_action: () => { },
            size: 'md'
        };
        this.state.modal = empty_modal;
        this.state.modal[0] = { modal: empty_modal };
    }

    /**
     * Aggiunge un messaggio alla lista di Toasts da mostrare.
     * Dopo 1000ms viene rimosso.
     * 
     * @param {String} icon 
     * @param {String} sender 
     * @param {String} message 
     */
    static addMessage(icon, sender, message) {
        const msg = LoadApp.app.state.messages;
        msg.unshift({ icon: icon, sender: sender, time: new Date().toLocaleDateString(), text: message });
        LoadApp.app.setState({ messages: msg });
    }

    removeMessage = (i) => {
        const msg = this.state.messages;
        msg.splice(i, 1);
        this.setState({ messages: msg });
    }

    //<button type="submit" className="btn btn-primary align-self-center " onClick={this.register}> Registrati App </button>

    static addModal(modal) {
        LoadApp.app._addModal(modal);
    }

    _addModal = (modal, show = true) => {
        const mods_list = this.state.modals;
        mods_list.push({ modal: modal });
        this.setState({
            show: show,
            modals: mods_list,
            modal: modal
        });
    }

    removeModal = () => {
        const mds = this.state.modals;
        if (mds.length > 2) {
            mds.pop();
            this.setState({ modal: mds[mds.length - 1].modal, show: true, modals: mds });
        } else {
            mds.pop();
            mds[0] = {
                modal: {
                    ID: 0,
                    title: <></>,
                    body: () => <></>,
                    body_params: {},
                    footer: () => <></>,
                    footer_params: {},
                    icon: {
                        icon_src: null,
                        alt: ''
                    },
                    exit_action: () => { },
                    size: 'md'
                }
            };
            this.setState({ modal: mds[mds.length - 1].modal, show: false, modals: mds });
        }
    }

    handleOnSubmitAccess = () => {
        datax.DataHandler.isLogged(() => {
            this.setupPage(datax.DataHandler.access.username);
            this.setState({ showLogin: false });
        }, (error) => {
            this.setState({ showLogin: true, body: this.generateLoginModule(error.msg) });
        });
    };

    setHome = () => {
        this.setState({ body: <Home /> })
    }

    setFams = () => {
        this.setState({ body: <FamNavbar handleHome={this.setHome} /> })
    }

    setMag = () => {
        this.setState({ body: <MagNavbar handleHome={this.setHome} /> })
    }

    setBag = () => {
        this.setState({ body: <BorseNavbar></BorseNavbar> });
    }

    setupPage = (username) => {
        this.setState({
            navbar: <ProgrammNavbar
                username={username}
                handleUser={() => { handleUserAction(this); }}
                home={this.setHome}
                fams={this.setFams}
                mag={this.setMag}
                bag={this.setBag}
                handleSettings={() => this.setState({ body: <SettingsPage /> })}
                handleDisconnect={() => { handleDisconnect(this) }} />
        });
        this.setHome();
    }

    generateLoginModule(extra) {
        return <LoginModule extraInfo={extra} handleSuccess={this.handleOnSubmitAccess} handleCancel={() => {
            this.setState({ showLogin: false, body: accessApp(this.handleOnSubmitAccess)() });
        }} />;
    }

    componentDidMount() {
        this.setState({
            body: datax.DataHandler.hasLogged(this.handleOnSubmitAccess, accessApp(this.handleOnSubmitAccess))
        });
    }

    render() {
        return <>
            {this.state.navbar}
            <Container fluid role="main" md="auto">
                {this.state.body}
                <ToastContainer position="bottom-end" className="p-2">
                    {
                        this.state.messages.map((v, i) => {
                            return <Toast key={i} onClose={() => this.removeMessage(i)} delay={10000} autohide>
                                <Toast.Header>
                                    <img src={v.icon} className="rounded me-2" alt="" />
                                    <strong className="me-auto">{v.sender}</strong>
                                    <small className="text-muted">{v.time}</small>
                                </Toast.Header>
                                <Toast.Body>{v.text}</Toast.Body>
                            </Toast>
                        })
                    }
                </ToastContainer>
                {this.state.footer}
            </Container>
            <ModalTemplate ID={this.state.modal.ID} show={this.state.show} title={this.state.modal.title} body={this.state.modal.body} body_params={this.state.modal.body_params}
                footer={this.state.modal.footer} footer_params={this.state.modal.footer_params}
                icon_src={this.state.modal.icon.icon_src} alt={this.state.modal.icon.alt} on_close_action={this.state.modal.exit_action}
                on_exit={this.removeModal} size={this.state.modal.size} />
        </>

    };

    register(event) {
        event.preventDefault();

        axios({
            method: 'post',
            url: API_PATH,
            headers: {
                'content-type': 'application/json'
            },
            data: { k: 'register', username: 'prova', password: 'password', email: 'prova@prova.prova' }
        })
            .then(result => {
                console.log("Response: " + JSON.stringify(result.data));
            })
            .catch(error => this.setState({
                error: error.message
            }));
    }
}

export default LoadApp;
