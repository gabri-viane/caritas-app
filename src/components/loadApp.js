import React, { Component } from "react";

import Container from "react-bootstrap/Container";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { datax, handleDisconnect } from "../contents/data.js";
import accessApp from "./extra/access";

import ProgrammNavbar from './extra/navbar';
import Home from './body/home';
import LoginModule from "./user/login";
import SettingsPage from "./extra/settings";
import User from "./user/user";
import { FamNavbar } from "./body/famiglia/FamNavbar";
import { MagNavbar } from "./body/magazzino/MagNavbar";
import { BorseNavbar } from "./body/borse/BagNavbar";
import { ModalTemplate } from "../contents/functions/ModalGenerators";
import { _WarningIcon } from "../contents/images.js";
import { AdminNavbar } from "./body/admin/AdminNavbar.js";

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
        this.state.modals[0] = { modal: empty_modal };
    }

    /**
     * Aggiunge un messaggio alla lista di Toasts da mostrare.
     * Dopo 1000ms viene rimosso.
     * 
     * @param {String} icon 
     * @param {String} sender 
     * @param {String} message 
     */
    static addMessage(icon, sender, message, handler = () => { }) {
        const msg = LoadApp.app.state.messages;
        msg.unshift({ icon: icon, sender: sender, time: new Date().toLocaleTimeString(), text: message, handler: handler });
        LoadApp.app.setState({ messages: msg });
    }

    removeMessage = (i) => {
        const msg = this.state.messages;
        if (i) {
            msg.slice(i, 1);
        } else {
            msg.shift();
        }
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
            if (datax.DataHandler.dataSettings.light) {
                LoadApp.addMessage(_WarningIcon, "Impostazioni",
                    "Per il tuo dispositivo viene attivata la modalità ridotta in automatico.",
                    () => this.setState({ body: <SettingsPage /> }));
            }
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
        this.setState({ body: <BorseNavbar handleHome={this.setHome} /> });
    }

    setUser = () => {
        datax.DataHandler.isLogged(() => {
            this.setState({ body: <User handleDisconnect={handleDisconnect} /> });
        }, (error) => {
            this.setState({ body: this.generateLoginModule(error.res.msg) });
        });
    }

    setupPage = (username) => {
        this.setState({
            navbar: <ProgrammNavbar
                username={username}
                handleUser={this.setUser}
                home={this.setHome}
                fams={this.setFams}
                mag={this.setMag}
                bag={this.setBag}
                handleSettings={() => this.setState({ body: <SettingsPage /> })}
                handleDisconnect={() => { handleDisconnect(this) }}
                handleAdmin={()=>this.setState({ body: <AdminNavbar handleHome={this.setHome}/> })} />
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
            <div style={{ height: '100vh' }}>
                {this.state.navbar}
                <Container fluid role="main" md="auto">
                    {this.state.body}
                    <ToastContainer position="bottom-end" className="p-2">
                        {
                            this.state.messages.map((v, i) => {
                                const fun = v.handler ? () => { v.handler(); this.removeMessage(i) } : () => this.removeMessage(i);
                                return <Toast key={i} onClose={() => this.removeMessage()} delay={5000} autohide>
                                    <Toast.Header>
                                        <img src={v.icon} onClick={fun} className="rounded me-2" alt="" />
                                        <strong className="me-auto" onClick={fun}>{v.sender}</strong>
                                        <small className="text-muted" onClick={fun}>{v.time}</small>
                                    </Toast.Header>
                                    <Toast.Body onClick={fun}>{v.text}</Toast.Body>
                                </Toast>
                            })
                        }
                    </ToastContainer>
                </Container>
                <ModalTemplate ID={this.state.modal.ID} show={this.state.show} title={this.state.modal.title} body={this.state.modal.body} body_params={this.state.modal.body_params}
                    footer={this.state.modal.footer} footer_params={this.state.modal.footer_params}
                    icon_src={this.state.modal.icon.icon_src} alt={this.state.modal.icon.alt} on_close_action={this.state.modal.exit_action}
                    on_exit={this.removeModal} size={this.state.modal.size} />
            </div>
        </>

    };
}

export default LoadApp;
