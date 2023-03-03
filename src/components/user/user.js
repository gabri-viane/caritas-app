import React, { Component } from "react";
import { datax } from "../../contents/data";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";
import { getUser, modifyUser } from "../../contents/api/capi-user";
import LoadApp from "../loadApp";
import { OkDialog } from "../../contents/functions/DialogGenerators";

class User extends Component {

    /**
     * Mostra o nascondi il modale per cambiare i dati utente
     * @param {boolean} val Mostra(true) o nascondi(false)
     */
    setShow(val) {
        this.setState({ show: val });
    }


    handleClose = () => this.setShow(false);//Nascondi modale di modifica
    handleShow = () => this.setShow(true);//Mostra modale di modifica

    state = {
        username: '',
        email: '',
        expire: new Date().toLocaleDateString(),
        auth: false,
        editing: false,
        modify_btn: 'Modifica',
        show: false,
        save_btn: <></>,
        body: <></>
    }

    /**
     * Richiedi i dati dell'utente e impostali nello stato.
     * Nel caso di errore mostra il messaggio
     */
    reloadComp() {
        getUser((dt) => {
            this.setState({
                username: dt.username,
                email: dt.email,
                expire: dt.expire,
                auth: dt.auth
            });
        },
            (dt) => {
                //Se c'è un'errore imposta l'intero corpo con il messaggio.
                this.setState({ body: this.onErrorHandle(dt.msg) });
            });
    }

    componentDidMount() {
        this.reloadComp();
    }

    /**
     * Avvia la modalità di editing cambiando i testi dei pulsanti
     * e aggiungendo il pulsante di salvataggio
     */
    edit = () => {
        let editing = !this.state.editing;
        this.setState({
            modify_btn: editing ? 'Scarta' : 'Modifica',
            editing: editing,
            save_btn: editing ? <Col>
                <Button variant="success" onClick={this.handleShow}>Salva</Button>
            </Col> : <></>
        });
        this.reloadComp();//Richiedi nuovamente i dati prima e dopo essere entrato/uscito dalla modifica
    }


    /**
    * Imposta un'errore che viene mostrato
    */
    onErrorHandle(error) {
        return <>{error}</>;
    }


    /**
    * Aggiorna l'email alla tippizzazione
    */
    handleChangeEventEmail = (e) => {
        e.preventDefault();
        this.setState({ email: e.target.value });
    }

    /**
    * Aggiorna la il nome utente  alla tippizzazione
    */
    handleChangeEventUsername = (e) => {
        e.preventDefault();
        this.setState({ username: e.target.value });
    };

    /**
    * Aggiorna la password alla tippizzazione
    */
    handleChangeEventPassword = (e) => {
        e.preventDefault();
        this.setState({ password: e.target.value });
    };

    render() {
        return <>
            <Container fluid md="auto" className="mt-2" style={{ maxWidth: 420 }}>
                <Form>
                    <Form.Group className="mb-3" controlId="emailgorup">
                        <Form.Label className="lead">Indirizzo email:</Form.Label>
                        <Form.Control type="email" disabled={!this.state.editing} /*defaultValue={this.state.email}*/ value={this.state.email} onChange={this.handleChangeEventEmail} />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="usernamegroup">
                        <Form.Label className="lead">Username:</Form.Label>
                        <Form.Control type="text" rows={3} disabled={!this.state.editing} /*defaultValue={this.state.username}*/ value={this.state.username} onChange={this.handleChangeEventUsername} />
                    </Form.Group>
                </Form>
                <Row>
                    <span className="lead text-primary">Autorizzato: {this.state.auth ? "Sì" : "No"}</span>
                    <span className="text-secondary">Con token: {datax.DataHandler.access.token}</span>
                    <span className="text-secondary">Scadenza: {this.state.expire}</span>
                </Row>
                <Row className="mt-2" mx="auto">
                    {this.state.save_btn}
                    <Col>
                        <Button variant="primary" onClick={this.edit}>{this.state.modify_btn}</Button>
                    </Col>
                    <Col>
                        <Button variant="secondary" onClick={this.props.handleDisconnect} disabled={this.state.editing}>Disconnetti</Button>
                    </Col>
                    <Col >
                        <Button variant="danger" disabled={!this.state.editing}>Elimina</Button>
                    </Col>
                </Row>
                <Modal show={this.state.show} onHide={this.handleClose}>
                    {/*Modale che mostra l'inserimento password per cambiare i dati dell'utente*/}
                    <Modal.Header closeButton>
                        <Modal.Title>Conferma cambio dati</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span>Dopo che avrai completato l'operazione dovrai eseguire nuovamente il login.</span>
                        <Form>
                            <Form.Group className="mb-3" controlId="passwordgroup">
                                <Form.Label className="lead">Conferma password:</Form.Label>
                                <Form.Control type="password" autoComplete="true" onChange={this.handleChangeEventPassword} />
                            </Form.Group>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Chiudi
                        </Button>
                        <Button variant="primary" onClick={() => {
                            this.handleClose();//Chiudi il modale
                            //aggiorna le credenziali inviandole all'handler corretto
                            modifyUser(this.state.username, this.state.email, this.state.password, (dt) => {
                                this.edit();//switch della modalità da edit a non-edit
                                datax.DataHandler.releaseAccess();
                            }, (dt) => {
                                LoadApp.addModal(OkDialog("Errore salvataggio", "Non è stato possibile modificare i dati utente", this.edit, false, false));
                            });
                            //this.props.handleModify({ newuser: this.state.username, password: this.state.password, newemail: this.state.email });
                        }}>
                            Salva modifiche
                        </Button>
                    </Modal.Footer>
                </Modal>
            </Container>
        </>;
    }

}

export default User;
