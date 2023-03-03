import React, { Component } from "react";
import Logo from "./logo.js";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';


import usericon from "../../resources/images/user.png";

export default class ProgrammNavbar extends Component {

    state = {
        key: '#home'
    }

    render() {
        return (
            <>
                <Navbar collapseOnSelect bg="dark" expand="lg" variant="dark" sticky="top">
                    <Container fluid>
                        <Navbar.Brand href="#">
                            <Logo />
                            <span className="ms-2">Caritas Grumello</span>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto" activeKey={this.state.key} onSelect={(selectedKey) => this.setState({ key: selectedKey })}>
                                <Nav.Link href="#home" onClick={() => this.props.home()}>Home</Nav.Link>
                                <Nav.Link href="#famiglie" onClick={() => this.props.fams()}>Famiglie</Nav.Link>
                                <Nav.Link href="#magazzino" onClick={() => this.props.mag()}>Magazzino</Nav.Link>
                                <Nav.Link href="#borse" onClick={() => this.props.bag()}>Borse</Nav.Link>
                            </Nav>
                            <Nav className="me-auto">
                                <Navbar.Text>Collegato come:{' '}</Navbar.Text>
                                <NavDropdown title={<><img alt="User" src={usericon} />{this.props.username} </>} id="basic-nav-dropdown" menuVariant="dark">
                                    <NavDropdown.Item onClick={() => this.props.handleUser()} href="#user/handle" id="handBtnNav">Gestisci</NavDropdown.Item>
                                    <NavDropdown.Item onClick={() => this.props.handleSettings()} href="#user/settings" id="settBtnNav">Impostazioni</NavDropdown.Item>
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