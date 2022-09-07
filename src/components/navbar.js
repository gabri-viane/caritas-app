import React, { Component } from "react";
import Logo from "../components/logo.js";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import usericon from "../resources/images/user.png";

class ProgrammNavbar extends Component {

    render() {
        return (
            <>
                <Navbar bg="dark" expand="lg" variant="dark" sticky="top">
                    <Container>
                        <Navbar.Brand href="#">
                            <Logo />
                            <span className="ms-2">Caritas Grumello</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link onClick={() => this.props.home()} href="#home">Home</Nav.Link>
                                <Nav.Link href="#famiglie">Famiglie</Nav.Link>
                                <Nav.Link href="#borse">Borse</Nav.Link>
                            </Nav>
                            <Nav>
                                <NavDropdown title={<><img alt="Logo Caritas DB App" src={usericon} /> {this.props.username} </>} id="basic-nav-dropdown">
                                    <NavDropdown.Item onClick={() => this.props.handleUser("handle")} href="#user/handle" id="handBtnNav">Gestisci</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => this.props.handleDisconnect()} href="#disconnect" id="discBtnNav">Disconnettiti</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                    </Container>
                </Navbar>
            </>
        );
    }

}

export default ProgrammNavbar;