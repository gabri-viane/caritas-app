import React, { Component } from "react";
import datax from "../../contents/data";
import axios from "axios";

import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Button from "react-bootstrap/esm/Button";
import Form from "react-bootstrap/esm/Form";

const API_PATH = 'http://localhost:80/caritas-api/index.php';

class User extends Component {

    state = {
        username: '',
        email: '',
        auth: false,
        body: <></>
    }

    componentDidMount() {
        switch (this.props.type) {
            case 'disconnect':
                this.setState({
                    body: <>
                        <Container fluid className="mt-5">
                            <Row md="auto">
                                <Container fluid md="auto" className="text-center">
                                    <Col md="auto" className="text-center">
                                        <Row md="auto">
                                            <span className="h5 lead">Stai per disconnetterti: dopo il loguot dovrai eseguire nuovamente l'accesso.</span>
                                        </Row>
                                        <Row md="auto" className="text-center">
                                            <Col md="auto" className="text-center">
                                                <Button onClick={datax.DataHandler.releaseAccess}>Disconnetti</Button>
                                            </Col>
                                        </Row>
                                    </Col>
                                </Container>
                            </Row>
                        </Container>
                    </>
                });
                break;
            case 'handle':
                axios({
                    method: 'get',
                    url: API_PATH,
                    headers: {
                        'content-type': 'application/json'
                    },
                    data: { k: 'user', username: datax.DataHandler.access.username, token: datax.DataHandler.access.token }
                })
                    .then(result => {
                        console.log("Response Logged: " + JSON.stringify(result.data));
                        this.setState({
                            username: result.data.username,
                            email: result.data.email,
                            auth: result.data.auth
                        }, () => {
                            if (this.state.auth) {
                                this.setState({ body: this.onAuthHandle() });
                            } else {
                                this.setState({ body: this.onErrorHandle("Non autorizzato") });
                            }
                        });
                    }).catch(error => this.setState({
                        body: this.onErrorHandle(error.msg)
                    }));
                break;
            default:
                this.setState({ body: <></> });
                break;
        }
    }

    onAuthHandle() {
        return <>
            <Container fluid md="auto">
                <Form>
                    <Form.Group className="mb-3" controlId="emailgorup">
                        <Form.Label>Indirizzo email</Form.Label>
                        <Form.Control type="email" placeholder="name@example.com" />
                    </Form.Group>
                    <Form.Group className="mb-3" controlId="usernamegroup">
                        <Form.Label>Username</Form.Label>
                        <Form.Control as="text" rows={3} />
                    </Form.Group>
                </Form>
            </Container>
        </>;
    }

    onErrorHandle(error) {
        return <>{error}</>;
    }

    render() {
        return <>
            {this.state.body}
        </>;
    }

}

export default User;
