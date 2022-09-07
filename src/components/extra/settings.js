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

    render() {
        return <Container fluid mx="auto" my="auto">
            <Row className="mt-2 justify-content-center align-items-center" >
                <Col md="auto">
                    <Form>
                        <Form.Group className="mb-3" controlId="settingsgroup">
                            <Form.Check className="font-weight-light" type="switch" label="Tabelle dati ridotte"
                                checked={this.state.light === 'true' || this.state.light}
                                onChange={this.handleChangeSettingLight} />
                            <Button onClick={(e) => datax.DataHandler.setDataSettings(this.state)}>Salva tutto</Button>
                        </Form.Group>
                    </Form>
                </Col>
            </Row>
        </Container>;
    }
}