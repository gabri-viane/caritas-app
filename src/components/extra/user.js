import React, { Component } from "react";
import { datax } from "../../contents/data";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { user } from "../../contents/database/Connection";
import Button from "react-bootstrap/esm/Button";
import Modal from "react-bootstrap/esm/Modal";

class User extends Component {

    setShow(val) {
        this.setState({ show: val });
    }


    handleClose = () => this.setShow(false);
    handleShow = () => this.setShow(true);

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

    reloadComp() {
        user({ ...{ method: 'get', k: 'get' }, ...datax.DataHandler.access },
            (dt) => {
                this.setState({
                    username: dt.username,
                    email: dt.email,
                    expire: dt.expire,
                    auth: dt.auth
                });
            },
            (dt) => { this.setState({ body: this.onErrorHandle(dt.msg) }); });
    }

    componentDidMount() {
        this.reloadComp();
    }

    edit = () => {
        let editing = !this.state.editing;
        this.setState({
            modify_btn: editing ? 'Scarta' : 'Modifica',
            editing: editing,
            save_btn: editing ? <Col md="auto" >
                <Button variant="success" onClick={this.handleShow}>Salva</Button>
            </Col> : <></>
        });
        this.reloadComp();
    }

    onErrorHandle(error) {
        return <>{error}</>;
    }

    handleChangeEventEmail = (e) => {
        e.preventDefault();
        this.setState({ email: e.target.value });
    }

    handleChangeEventUsername = (e) => {
        e.preventDefault();
        this.setState({ username: e.target.value });
    };

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
                    <Col >
                        <Button variant="primary" onClick={this.edit}>{this.state.modify_btn}</Button>
                    </Col>
                    <Col >
                        <Button variant="secondary" onClick={this.props.handleDisconnect} disabled={this.state.editing}>Disconnetti</Button>
                    </Col>
                    <Col >
                        <Button variant="danger" disabled={!this.state.editing}>Elimina</Button>
                    </Col>
                </Row>
                <Modal show={this.state.show} onHide={this.handleClose}>
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
                            this.handleClose();
                            this.props.handleModify({ newuser: this.state.username, password: this.state.password, newemail: this.state.email });
                            this.edit();
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
