import React, { Component } from "react";
import ProgrammNavbar from './navbar';
import Home from './body/home';
import LoginModule from "./login";
import { datax, handleDisconnect } from "../contents/data.js";
import Logo from "./logo";
import axios from "axios";
import Footer from "./footer";

import { handleUserAction } from '../contents/functions/UserHandlers.js';

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import ToastContainer from "react-bootstrap/ToastContainer";
import Toast from "react-bootstrap/Toast";
import { FamNavbar } from "./body/famiglia/FamNavbar";
import { MagNavbar } from "./body/magazzino/MagNavbar";
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

    removeMessage = (i)=>{
        const msg = this.state.messages;
        msg.splice(i, 1);
        this.setState({ messages: msg });
    }
    
    access_app = () => {
        return <>
            <Container fluid>
                <Row className="text-center">
                    <Container fluid >
                        <Col className="text-center">
                            <Row>
                                <span className="mt-5"><Logo size={64} /><p className="h1 ">Database Caritas</p></span>
                            </Row>
                            <Row>
                                <Col className="text-center mt-4">
                                    <Button type="submit" variant="primary" className="align-self-center" onClick={this.handleOnSubmitAccess}> Avvia App </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Container>
                </Row>
            </Container>
        </>
    };

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

    setupPage = (username) => {
        this.setState({
            navbar: <ProgrammNavbar
                username={username}
                handleUser={() => { handleUserAction(this); }}
                home={this.setHome}
                fams={this.setFams}
                mag={this.setMag}
                handleSettings={() => this.setState({ body: <SettingsPage /> })}
                handleDisconnect={() => { handleDisconnect(this) }} />,
            footer: <Footer
                handleLogout={datax.DataHandler.releaseAccess
                    /*  () => {
                         this.setState({
                             modal: OkDialog("Errore generico", "Testo dell'errore generico", () => { this.setState({ modal: <></> }) }, true)
                         });
                     } */
                }
                username={username} />
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
            body: datax.DataHandler.hasLogged(this.handleOnSubmitAccess, this.access_app)
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
