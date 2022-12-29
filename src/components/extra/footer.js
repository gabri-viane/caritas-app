import React, { Component } from "react";
import Row from "react-bootstrap/esm/Row";
import Container from "react-bootstrap/esm/Container";

class Footer extends Component {

    render() {
        return <>
            <Container className="bg-dark">
                <Row id="bottom" className="text-center fixed-bottom">
                    <div className="col-4">
                        <span>Connesso come: <span className="fw-bold">{this.props.username}</span></span>
                    </div>
                    <div className="col-4">

                    </div>
                    <div className="col-4">
                        <a href="#logout" onClick={this.props.handleLogout} className="link-dark">Disconnettiti</a>
                    </div>
                    <div className="col-12">
                        Copyright &copy; {new Date().getFullYear()} Vnl-Eng.net
                    </div>
                </Row>
            </Container>
        </>
    }
}

//export default Footer;