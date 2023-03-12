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

    handleChangeSettingDebug = (e) => {
        this.setState({ debug: !this.state.debug });
    }
    handleChangeSettingCols = (e) => {
        if (e.target.value > 0) {
            this.setState({ cols: e.target.value });
        } else {
            this.setState({ cols: 3 });
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
                            <Container className="mt-2">
                                <Row className="align-items-left" md="auto">
                                    <Col md="auto">
                                        <Form.Label className="font-weight-light">Tabelle dati ridotte</Form.Label>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Check className="font-weight-light" type="switch" aria-label="Tabelle dati ridotte"
                                            checked={this.state.light === 'true' || this.state.light}
                                            onChange={this.handleChangeSettingLight} />
                                    </Col>
                                </Row>
                                <Row className="align-items-left" md="auto">
                                    <Col md="auto">
                                        <Form.Label className="font-weight-light">Numero di colonne di elementi borse</Form.Label>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Select style={{ maxWidth: '60px' }} aria-label="Numero colonne creazione borse"
                                            value={this.state.cols} onChange={this.handleChangeSettingCols}>
                                            <option value={1}>1</option>
                                            <option value={2}>2</option>
                                            <option value={3}>3</option>
                                            <option value={4}>4</option>
                                            <option value={6}>6</option>
                                            <option value={12}>12</option>
                                        </Form.Select>
                                    </Col>
                                </Row>
                                <Row className="align-items-left" md="auto">
                                    <Col md="auto">
                                        <Form.Label className="font-weight-light">Debug</Form.Label>
                                    </Col>
                                    <Col md="auto">
                                        <Form.Check className="font-weight-light" type="switch" aria-label="Tabelle dati ridotte"
                                            checked={this.state.debug === 'true' || this.state.debug}
                                            onChange={this.handleChangeSettingDebug} />
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