import React from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ErrorIcon from "../../resources/images/error.png";
import SuccessIcon from "../../resources/images/success.png";
import WarningIcon from "../../resources/images/warning.png";

export function ConfirmDialog(title, text, yes_handler, no_handler, on_exit) {

    const noEvent = (e) => {
        e.preventDefault();
        no_handler();
        on_exit();
    };

    const yesEvent = (e) => {
        e.preventDefault();
        yes_handler();
        on_exit();
    }

    return <>
        <Modal show={true} onHide={noEvent} centered>
            <Modal.Header closeButton>
                <Modal.Title><img src={WarningIcon} alt="Attenzione" /> {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className="lead warp">{text}</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={noEvent}>
                    No
                </Button>
                <Button variant="primary" onClick={yesEvent}>
                    Sì
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}

export function OkDialog(title, text, on_exit, success = false) {
    return <>
        <Modal show={true} onHide={on_exit} centered>
            <Modal.Header closeButton>
                <Modal.Title><img src={success ? SuccessIcon : ErrorIcon} alt={success ? "Successo" : "Errore"} /> {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <span className="lead warp">{text}</span>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={on_exit}>
                    Ok
                </Button>
            </Modal.Footer>
        </Modal>
    </>
}