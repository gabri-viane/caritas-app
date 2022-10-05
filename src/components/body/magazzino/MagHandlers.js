import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import { requestConfezioni, showProds, updateProd, createProd } from "./MagFunctions";
//import { AutoFamFullTable } from "../../../contents/functions/tableGen";


export class MagEditor extends Component {

    state = {
        create: false,
        show: false,
        edit: false,
        ID: -1,
        query: []
    };

    constructor(props) {
        super(props);
        this.state.ID = props.ID;
        this.state.edit = props.edit || props.create;
        this.state.create = props.create;
    }

    handleNameChange = (e) => {
        e.preventDefault();
        this.setState({ Nome: e.target.value.toUpperCase() });
    }

    handleConfezioneChange = (e) => {
        e.preventDefault();
        this.setState({ IDConfezioni: e.target.value });
    }

    handleIsMagazzinoChange = (e) => {
        this.setState({ IsMagazzino: !this.state.IsMagazzino });
    }

    handleIsFrescoChange = (e) => {
        this.setState({ IsFresco: !this.state.IsFresco });
    }

    handleIsExtraChange = (e) => {
        this.setState({ IsExtra: !this.state.IsExtra });
    }

    handleIsIgieneChange = (e) => {
        this.setState({ IsIgiene: !this.state.IsIgiene });
    }

    handleEdit = (e) => {
        e.preventDefault();
        updateProd((dt) => {
            if (!!this.props.success_handler) {
                this.props.success_handler(dt);
                this.props.handleClose();
            }
        },
            (dt) => {
                if (!!this.props.error_handler) {
                    this.props.error_handler(dt);
                }
            },
            this.state.ID,
            {
                ID: this.state.ID,
                Nome: this.state.Nome,
                IDConfezioni: this.state.IDConfezioni,
                IsMagazzino: this.state.IsMagazzino,
                IsFresco: this.state.IsFresco,
                IsIgiene: this.state.IsIgiene,
                IsExtra: this.state.IsExtra
            });
    }

    handleCreate = (e) => {
        e.preventDefault();
        createProd(
            (dt) => { //Devo aggiungere un prodotto
                if (!!this.props.success_handler) {
                    this.props.success_handler(dt);
                    this.props.handleClose();
                }
            },
            (dt) => {
                if (!!this.props.error_handler) {
                    this.props.error_handler(dt);
                }
            },
            {
                Nome: this.state.Nome,
                IDConfezioni: this.state.IDConfezioni,
                IsMagazzino: this.state.IsMagazzino,
                IsFresco: this.state.IsFresco,
                IsIgiene: this.state.IsIgiene,
                IsExtra: this.state.IsExtra
            });
    }

    componentDidMount() {
        requestConfezioni((dt) => {
            this.setState({ query: dt.query })
        });
        if (!this.state.create) {
            showProds((dt) => {
                this.setState({
                    show: true,
                    ID: !dt.query[0].ID ? '' : dt.query[0].ID,
                    Nome: !dt.query[0].Nome ? '' : dt.query[0].Nome,
                    Confezione: !dt.query[0].Confezione ? '' : dt.query[0].Confezione,
                    IDConfezioni: !dt.query[0].IDConfezioni ? '' : dt.query[0].IDConfezioni,
                    IsMagazzino: !dt.query[0].IsMagazzino ? false : dt.query[0].IsMagazzino,
                    IsFresco: !dt.query[0].IsFresco ? false : dt.query[0].IsFresco,
                    IsIgiene: !dt.query[0].IsIgiene ? false : dt.query[0].IsIgiene,
                    IsExtra: !dt.query[0].IsExtra ? false : dt.query[0].IsExtra
                });
            }, (dt) => {
                this.setState({
                    show: false
                });
            }, this.state.ID);
        } else {
            this.setState({
                show: true,
                Nome: '',
                Confezione: '',
                IDConfezioni: 1,
                IsMagazzino: true,
                IsFresco: false,
                IsIgiene: false,
                IsExtra: false
            });
        }
    }

    render() {
        return <>
            {this.state.show ?
                <Modal show={this.state.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.edit ? (this.state.create ? "Crea Prodotto" : "Modifica Prodotto") : "Mostra Prodotto"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className="lead">Dati del prodotto:</span>
                        <Form>
                            <Container fluid mx="auto">
                                <Row mx="auto" >
                                    <Col md>
                                        <Form.Group className="mb-3 mt-3" controlId="famdata">
                                            <Form.Text className="h6">Dati Prodotto:</Form.Text>
                                            <FloatingLabel controlId="floatingName" label="Nome" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" disabled={!this.state.edit} value={this.state.Nome} onChange={this.handleNameChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingConfezione" label="Confezione" className="mt-1">
                                                <Form.Select aria-label="Dimensione confezione" disabled={!this.state.edit} value={this.state.IDConfezioni} onChange={this.handleConfezioneChange}>
                                                    {this.state.query.map((row, index) => {
                                                        return <option key={index} value={row['ID']}>{row['Confezione']}</option>
                                                    })}
                                                </Form.Select>
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                    <Col md>
                                        {this.state.create ? <></> :
                                            <Form.Group className="mt-3" controlId="prodid">
                                                <Form.Text className="h6">ID Prodotto:</Form.Text>
                                                <FloatingLabel controlId="floatingID" label="ID" className="mt-1">
                                                    <Form.Control type="text" autoComplete="off" autoCorrect="off" disabled value={this.state.ID} />
                                                </FloatingLabel>
                                            </Form.Group>
                                        }
                                        <Form.Group className="mb-3 mt-3" controlId="faminfo">
                                            <Form.Text className="h6">Dati aggiuntivi:</Form.Text>
                                            <Form.Check id="ismag" label="A magazzino" autoComplete="off" autoCorrect="off" disabled={!this.state.edit} checked={this.state.IsMagazzino} onChange={this.handleIsMagazzinoChange} />
                                            <Form.Check id="isfresco" label="Fresco" autoComplete="off" autoCorrect="off" disabled={!this.state.edit} checked={this.state.IsFresco} onChange={this.handleIsFrescoChange} />
                                            <Form.Check id="isig" label="Igiene" autoComplete="off" autoCorrect="off" disabled={!this.state.edit} checked={this.state.IsIgiene} onChange={this.handleIsIgieneChange} />
                                            <Form.Check id="isextra" label="Extra" autoComplete="off" autoCorrect="off" disabled={!this.state.edit} checked={this.state.IsExtra} onChange={this.handleIsExtraChange} />
                                        </Form.Group>
                                    </Col>
                                </Row>
                            </Container>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Chiudi
                        </Button>
                        {this.state.edit ?
                            (this.state.create ?
                                <Button variant="primary" onClick={this.handleCreate}>
                                    Salva prodotto
                                </Button>
                                :
                                <Button variant="primary" onClick={this.handleEdit}>
                                    Salva modifiche
                                </Button>) : <></>}
                    </Modal.Footer>
                </Modal>
                ://Eseguito qua sotto se c'è un errore di ricezione dati dalla chiamata al codice php per i dati della famiglia
                <Container>
                    <span>Errore caricamento dati</span>
                </Container>
            }
        </>;
    }

}
