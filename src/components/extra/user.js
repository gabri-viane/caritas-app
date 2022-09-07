import React, { Component } from "react";
import { datax } from "../../contents/data";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import { user } from "../../contents/database/Connection";
import Button from "react-bootstrap/esm/Button";
import OverlayTrigger from "react-bootstrap/esm/OverlayTrigger";
import Tooltip from "react-bootstrap/esm/Tooltip";

class User extends Component {

    state = {
        username: '',
        email: '',
        expire: new Date().toLocaleDateString(),
        auth: false,
        editing: false,
        modify_btn: 'Modifica',
        save_btn: <></>,
        body: <></>
    }

    reloadComp() {
        user({ ...{ method: 'get', k: 'retrive' }, ...datax.DataHandler.access },
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
                <Button variant="success" onClick={() => { this.props.handleModify(this); this.edit(); }}>Salva</Button>
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
                <Row className="mt-2">
                    {this.state.save_btn}
                    <Col md="auto">
                        <Button variant="primary" onClick={this.edit}>{this.state.modify_btn}</Button>
                    </Col>
                    <Col md="auto">
                        <Button variant="secondary" onClick={this.props.handleDisconnect} disabled={this.state.editing}>Disconnetti</Button>
                    </Col>
                    <Col md="auto">
                        <OverlayTrigger
                            delay={{ hide: 450, show: 300 }}
                            overlay={(props) => (
                                <Tooltip {...props}>
                                    Questa opzione non è reversibile.
                                </Tooltip>
                            )}
                            placement="bottom">
                            <Button variant="danger" disabled={!this.state.editing}>Elimina</Button>
                        </OverlayTrigger>
                    </Col>
                </Row>
            </Container>
        </>;
    }

}

export default User;
