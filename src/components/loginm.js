import { Modal } from "react-bootstrap";
import React, { Component, useState } from "react";


class LoginModal extends Component {

    state = {
        isOpen: false,
        title: "prova"
    };

    showModal = () => {
        this.setState({ isOpen: true });
    };

    hideModal = () => {
        this.setState({ title: "Trasitioning...", isOpen: false });
    };

    modalLoaded = () => {
        this.setState({ title: "Modal ready" });
    };

    render() {
        return (
            <Modal show={this.state.isOpen} onHide={this.hideModal()} onEntered={this.modalLoaded()}>
                <Modal.Header></Modal.Header>
            </Modal>

        );
    }
}

export default LoginModal;