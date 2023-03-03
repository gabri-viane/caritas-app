import React, { Component } from "react";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import { datax } from "../../contents/data";
import { _WarningIcon } from "../../contents/images";

class Footer extends Component {

    render() {
        return <>
                <Container fluid bg="dark" expand="lg" variant="dark" sticky="bottom">
                    <Row id="bottom" className="text-center">
                        <Col sm>
                            <span>Connesso come: <span className="fw-bold">{this.props.username}</span></span>
                        </Col>
                        <Col md>
                            {
                                datax.DataHandler.dataSettings.light ? <><img src={_WarningIcon} alt="Modalità ridotta" /> <span>Sei in modalità ridotta: nelle tabelle premi la riga per visualizzare le opzioni</span></> : <></>
                            }
                        </Col>
                        <Col sm>
                            <a href="#logout" onClick={this.props.handleLogout} className="link-light">Disconnettiti</a>
                        </Col>
                        <Col sm>
                            Copyright &copy; {new Date().getFullYear()} Vnl-Eng.net
                        </Col>
                    </Row>
                </Container>
        </>
    }
}

export default Footer;