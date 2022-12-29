import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import Logo from "./logo";

export default function accessApp(handleOnSubmitAccess) {
    return ()=><>
        <Container fluid>
            <Row className="text-center">
                <Container fluid >
                    <Col className="text-center">
                        <Row>
                            <span className="mt-5"><Logo size={64} /><p className="h1 ">Database Caritas</p></span>
                        </Row>
                        <Row>
                            <Col className="text-center mt-4">
                                <Button type="submit" variant="primary" className="align-self-center" onClick={handleOnSubmitAccess}> Avvia App </Button>
                            </Col>
                        </Row>
                    </Col>
                </Container>
            </Row>
        </Container>
    </>;
}