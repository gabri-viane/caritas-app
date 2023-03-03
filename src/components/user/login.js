import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import LoadApp from "../loadApp.js";
import Logo from "../extra/logo.js";
import { OkDialog } from "../../contents/functions/DialogGenerators.js";
import { datax } from "../../contents/data.js";
import { loginUser } from "../../contents/api/capi-user.js";

class LoginModule extends Component {

    state = {
        username: '',
        password: '',
        datas: null
    }

    handleUsernameChanged = (event) => {
        this.setState({ username: event.target.value });
    }

    handlePasswordChanged = (event) => {
        this.setState({ password: event.target.value });
    }

    login = (e) => {
        loginUser(this.state.username, this.state.password, (dt) => {
            this.setState({
                auth: dt.auth,
                token: dt.res.token
            }, () => {
                if (this.state.auth) {
                    datax.DataHandler.setLoginAccessData(this.state.token, this.state.username);
                    this.props.handleSuccess();
                }
            });
        }, (dt) => {
            LoadApp.addModal(OkDialog("Impossibile accedere", "Non è stato possibile accedere", () => {},false,true));
        });
    }

    render() {
        return <>
            <Container fluid className="mt-5">
                <Row className="text-center align-text-top">
                    <Col lg>
                        <h4 className="h3"><Logo className="align-text-bottom" /><span className="ms-3">Accedi al database</span></h4>
                    </Col>
                </Row>
                <Row className="text-center">
                    <Col lg>
                        <span className="h6">{this.props.extraInfo}</span>
                    </Col>
                </Row>
                <Row className="mt-4 justify-content-center">
                    <Col md='auto'>
                        <Form>
                            <Form.Group className="mb-3" controlId="usernamegroup">
                                <Form.Label className="lead "><span role="img" aria-label="Username Icon">&#128100;</span> Utente: </Form.Label>
                                <Form.Control type="text" autoComplete="true" value={this.state.username} onChange={this.handleUsernameChanged} />
                            </Form.Group>
                            <Form.Group className="mb-3" controlId="passwordgroup">
                                <Form.Label className="lead"><span role="img" aria-label="Password Icon">&#128273;</span> Password:</Form.Label>
                                <Form.Control type="password" autoComplete="true" value={this.state.password} onChange={this.handlePasswordChanged} />
                            </Form.Group>
                            <Form.Group className=" mt-1 align-right">
                                <Button className="btn-secondary me-1" onClick={this.props.handleCancel}>Annulla</Button>
                                <Button className="btn-primary ms-1" onClick={this.login}>Accedi</Button>
                            </Form.Group>
                        </Form>
                    </Col>
                </Row>
            </Container>
        </>;
    }

}
export default LoginModule;