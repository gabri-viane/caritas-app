import React, { Component } from "react";
import ProgrammNavbar from './extra/navbar';
import Home from './body/home';
import LoginModule from "./user/login";
import { datax, handleDisconnect } from "../contents/data.js";
import axios from "axios";
import accessApp from "./extra/access";

import { handleUserAction } from "./user/UserHandlers";

import Container from "react-bootstrap/Container";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { FamNavbar } from "./body/famiglia/FamNavbar";
import { MagNavbar } from "./body/magazzino/MagNavbar";
import { BagEditor } from "./body/borse/BagHandlers";
import SettingsPage from "./extra/settings";

const API_PATH = process.env.REACT_APP_API_PATH; //"http://localhost:80/caritas-api/index.php";//+process.env.REACT_APP_WEB_API_REF;

/*eslint no-extend-native: ["error", { "exceptions": ["Date"] }]*/
Date.prototype.toDateInputValue = (function () {
    var local = new Date(this);
    local.setMinutes(this.getMinutes() - this.getTimezoneOffset());
    return local.toJSON().slice(0, 10);
});

class LoadApp extends Component {

    static app;

    state = {
        showLogin: false,
        navbar: <></>,
        body: <></>,
        footer: <></>,
        user_page: <></>,
        modal: <></>,
        messages: []
    };

    constructor(props) {
        if (LoadApp.app) {
            return LoadApp.app
        }
        super(props);
        LoadApp.app = this;
    }

    static addMessage(icon, sender, message) {
        const msg = this.app.state.messages;
        msg.unshift({ icon: icon, sender: sender, time: new Date().toLocaleDateString(), text: message });
        this.app.setState({ messages: msg });
    }

    removeMessage = (i) => {
        const msg = this.state.messages;
        msg.splice(i, 1);
        this.setState({ messages: msg });
    }

    //<button type="submit" className="btn btn-primary align-self-center " onClick={this.register}> Registrati App </button>

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
        this.setState({ body: <BagEditor></BagEditor> });
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
            this.setState({ showLogin: false, body: this.access_app() });
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
            </Container>
            {this.state.modal}
        </>
        //{this.state.footer}
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
