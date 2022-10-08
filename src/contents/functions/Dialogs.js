import React, { useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import ErrorIcon from "../../resources/images/error.png";
import editIcon from "../../resources/images/pencil.png";
import SuccessIcon from "../../resources/images/success.png";
import WarningIcon from "../../resources/images/warning.png";
import { Container, Form } from "react-bootstrap";

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

export function InputIntegerDialog(title, text, yes_handler, no_handler, on_exit, default_value) {

    const [value, setValue] = useState(default_value);

    const noEvent = (e) => {
        if (e) {
            e.preventDefault();
        }
        no_handler();
        on_exit();
    };

    const yesEvent = (e) => {
        console.log(value);
        e.preventDefault();
        yes_handler(value);
        on_exit();
    }

    return <>
        <Modal show={true} onHide={noEvent} centered>
            <Modal.Header closeButton>
                <Modal.Title><img src={editIcon} alt="Editing" /> {title}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Container>
                    <span className="lead warp">{text}</span>
                    <Form.Control as="input" type="number" defaultValue={default_value || 0} className="mt-2" onChange={(e) => setValue(e.target.value)} />
                </Container>
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