import React, { Component } from "react";
import LoadApp from "../../loadApp";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import generateModal from "../../../contents/functions/ModalGenerators";
import DataExchange from "../../../contents/DataExchange";
import { _AddUserIcon, _ErrorIcon, _SuccessIcon, _WarningIcon } from "../../../contents/images";
import { addUser } from "../../../contents/api/capi-user";

class UserEditorModal extends Component {

    state = {
        dtx: null,
        fam_query: [],

        username: '',
        email: ''
    }

    constructor(props) {
        super(props);
        this.state.dtx = props.dtx;
        props.dtx.subscribeFunctions(() => {
            this.handleSubmit();
        })
    }

    handleUsernameChange = (e) => {
        e.preventDefault();
        this.setState({ username: e.target.value });
    }

    handleEmailChange = (e) => {
        e.preventDefault();
        this.setState({ email: e.target.value });
    }

    handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }
        if (this.state.username.length < 6 || this.state.email.length < 3) {
            LoadApp.addMessage(_WarningIcon, "Utenti", "Inserire email e nome utente (min. 6 caratteri)");
            return;
        }
        addUser(this.state.username, this.state.email, () => {
            if (this.props.success_handler) {
                this.props.success_handler();
            }
            LoadApp.addMessage(_SuccessIcon, "Utenti", "Utente aggiunto con successo");
        }, (dt) => {
            if (this.props.error_handler) {
                this.props.error_handler();
            }
            console.log(dt);
            LoadApp.addMessage(_ErrorIcon, "Utenti", "Utente non registrato");
        })
    }

    render() {
        return <>
            <Container>
                <Form>
                    <Form.Text>
                        All'utente verrà inviata un'email di invito per registrarsi al programma.
                        Potrebbe essere necessario avvisare la persona in caso l'email venga segnata come spam.
                    </Form.Text>
                    <Form.Group className="mb-3 mt-3" controlId="bagdata">
                        <FloatingLabel controlId="floatingUsername" label="Nome utente" className="mt-1">
                            <Form.Control type="username" autoComplete="off" autoCorrect="off" value={this.state.username} onChange={this.handleUsernameChange} />
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingEmail" label="E-Mail" className="mt-1">
                            <Form.Control type="email" autoComplete="off" autoCorrect="off" value={this.state.email} onChange={this.handleEmailChange} />
                        </FloatingLabel>
                    </Form.Group>
                </Form>
            </Container>
        </>;
    }

}

export const fun_UserEditorModal = (close_action, success_handler, error_handler) => {

    const dt = new DataExchange();

    LoadApp.addModal(
        generateModal(500, "Registra Nuovo Utente",
            _AddUserIcon, "Gestione Utenti",
            //handleClose={(e) => { modal_close_action(); close_action(e); }}    
            (modal_close_action) => {
                return <UserEditorModal dtx={dt} success_handler={success_handler ? success_handler : undefined}
                    error_handler={error_handler ? error_handler : (dt_) => { console.log(dt_) }} />
            },
            (modal_close_action) => {
                return <>
                    <Button variant="secondary" onClick={(e) => {
                        modal_close_action();
                        close_action(e);
                    }}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={(e) => {
                        modal_close_action();
                        dt.setData({ close: true });
                        close_action(e);
                    }}>
                        Invita Utente
                    </Button>
                </>
            }, close_action)
    );
};