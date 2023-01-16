import React, { Component } from "react";
import { datax } from "../../contents/data";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";

export default class SettingsPage extends Component {

    state = datax.DataHandler.dataSettings;

    handleChangeSettingLight = (e) => {
        this.setState({ light: !this.state.light });
    }


    handleChangeSettingCols = (e) => {
        if (e.target.value > 0) {
            this.setState({ cols: e.target.value });
        } else {
            this.setState({ cols: 1 });
        }
    }

    render() {
        return <Container fluid >
            <Row>
                <span className="lead">Impostazioni programma</span>
            </Row>
            <Row className="mt-2 justify-content-center align-items-center" >
                <Col>
                    <Form>
                        <Form.Group className="mb-3 p-2" controlId="settingsgroup">
                            <Form.Check className="font-weight-light" type="switch" label="Tabelle dati ridotte"
                                checked={this.state.light === 'true' || this.state.light}
                                onChange={this.handleChangeSettingLight} />
                            <Container className="mt-2">
                                <Row className="align-items-left" md="auto">
                                    <Col md="auto">
                                        <Form.Label className="font-weight-light">Numero di colonne di elementi borse</Form.Label>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Control type="number" aria-label="Numero colonne creazione borse"
                                            style={{ maxWidth: '60px' }}
                                            value={this.state.cols}
                                            onChange={this.handleChangeSettingCols} />
                                    </Col>
                                </Row>
                            </Container>
                            <Button className="mt-3" onClick={(e) => datax.DataHandler.setDataSettings(this.state)}>Salva tutto</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>;
    }
}