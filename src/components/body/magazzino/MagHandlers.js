import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import { requestConfezioni, showProds, updateProd, createProd, requestDonatori, showEntrate, updateEntrata, createEntrata, requestMotivi, showEditMagazzino, editMagazzino } from "./MagFunctions";
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


export class EntryEditor extends Component {

    state = {
        show: false,
        create: false,
        edit: false,
        ID: -1,
        IDProdotti: -1,
        IDDonatori: 1,
        Prodotto: '',
        Donatore: '',
        Totale: 1,
        Arrivo: new Date().toDateInputValue(),
        query_prods: [],
        query_dons: []
    };

    constructor(props) {
        super(props);
        this.state.ID = props.ID;
        if (props.edit) {
            this.state.IDProdotti = props.IDProdotti || -1;
            this.state.IDDonatori = props.IDDonatori || 1;
        }
        this.state.edit = props.edit || props.create;
        this.state.create = props.create;
    }

    componentDidMount() {
        requestDonatori((dt) => {
            this.setState({ query_dons: dt.query })
        });
        showProds((dt) => {
            this.setState({
                query_prods: dt.query
            });
            if (!this.state.edit && this.state.create) {
                this.setState({
                    IDProdotti: dt.query[0].ID
                });
            }
        }, (dt) => {
            
        }, 'all');
        if (!this.state.create) {
            showEntrate((dt) => {
                this.setState({
                    show: true,
                    ID: dt.query[0].ID || 0,
                    IDProdotti: dt.query[0].IDProdotti || -1,
                    IDDonatori: dt.query[0].IDDonatori || -1,
                    Prodotto: dt.query[0].Prodotto || '',
                    Donatore: dt.query[0].Donatre || '',
                    Totale: dt.query[0].Totale || 0,
                    Arrivo: new Date(dt.query[0].Arrivo).toDateInputValue()
                });
            }, (dt) => {
                this.setState({
                    show: false
                });
            }, this.state.ID);
        } else {
            this.setState({
                show: true,
                IDDonatori: 1,
                Totale: 1,
                Arrivo: new Date().toDateInputValue()
            });
        }
    }

    handleProdottoChange = (e) => {
        e.preventDefault();
        this.setState({ IDProdotti: e.target.value });
    }

    handleDonatoreChange = (e) => {
        e.preventDefault();
        this.setState({ IDDonatori: e.target.value });
    }

    handleDateChange = (e) => {
        e.preventDefault();
        this.setState({ Arrivo: e.target.value });
    }

    handleTotaleChange = (e) => {
        e.preventDefault();
        this.setState({ Totale: e.target.value });
    }

    handleEdit = (e) => {
        e.preventDefault();
        updateEntrata((dt) => {
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
                Totale: this.state.Totale,
                Arrivo: new Date(this.state.Arrivo).getTime() / 1000
            });
    }

    handleCreate = (e) => {
        e.preventDefault();
        createEntrata(
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
                IDProdotti: this.state.IDProdotti,
                IDDonatori: this.state.IDDonatori,
                Totale: this.state.Totale,
                Arrivo: new Date(this.state.Arrivo).getTime() / 1000
            });
    }

    render() {
        return <>
            {this.state.show ?
                <Modal show={this.state.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.edit ? (this.state.create ? "Crea Entrata" : "Modifica Entrata") : "Mostra Entrata"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className="lead">Dati dell'entrata registrata:</span>
                        <Form>
                            <Container fluid mx="auto">
                                <Row mx="auto" >
                                    <Form.Group className="mb-3 mt-3" controlId="entrdata">
                                        <Form.Text className="h6">Dati Entrata:</Form.Text>
                                        <FloatingLabel controlId="floatingProdotto" label="Prodotto" className="mt-1">
                                            <Form.Select aria-label="Prodotto" disabled={!this.state.edit} value={this.state.IDProdotti} onChange={this.handleProdottoChange}>
                                                {this.state.query_prods.map((row, index) => {
                                                    return <option key={index} value={row['ID']}>{row['Nome']}</option>
                                                })}
                                            </Form.Select>
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingDonatore" label="Donatore" className="mt-1">
                                            <Form.Select aria-label="Donatore" disabled={!this.state.edit} value={this.state.IDDonatori} onChange={this.handleDonatoreChange}>
                                                {this.state.query_dons.map((row, index) => {
                                                    return <option key={index} value={row['ID']}>{row['Nome']}</option>
                                                })}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Row>
                                <Row mx="auto">
                                    <Col md>
                                        <Form.Group className="mt-3" controlId="blockreg">
                                            <FloatingLabel controlId="floatingData" label="Data registrazione" className="mt-1">
                                                <Form.Control type="date" autoComplete="off" autoCorrect="off" disabled={!this.state.edit} value={this.state.Arrivo} onChange={this.handleDateChange} />
                                            </FloatingLabel> <FloatingLabel controlId="floatingTotale" label="Quantità" className="mt-1">
                                                <Form.Control as="input" type="number" autoComplete="off" autoCorrect="off" disabled={!this.state.edit} value={this.state.Totale} onChange={this.handleTotaleChange} />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                    {this.state.create ? <></> :
                                        <Col md>
                                            <Form.Group className="mt-3" controlId="entrid">
                                                <Form.Text className="h6">ID Entrata:</Form.Text>
                                                <FloatingLabel controlId="floatingID" label="ID" className="mt-1">
                                                    <Form.Control type="text" autoComplete="off" autoCorrect="off" disabled value={this.state.ID} />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                    }
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
                                    Salva entrata
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

export class ModifcheEditor extends Component {

    state = {
        show: false,
        showing: false,//mostra solamente una modifica
        empty_create: true,//Se non viene passato come parametro l'id del prodotto
        ID: -1,
        IDProdotti: -1,
        IDMotivi: 1,
        Totale: 1,
        Data: new Date().toDateInputValue(),
        query_prods: [],
        query_mots: []
    };

    constructor(props) {
        super(props);
        this.state.ID = props.ID;
        this.state.showing = props.showing;
        if (props.showing) {
            this.state.empty_create = false;
        }
        if (props.IDProdotti) {
            this.state.empty_create = false;
            this.state.IDProdotti = props.IDProdotti;
            console.log("SET PROD:" + JSON.stringify(this.state.IDProdotti))
        }
    }

    componentDidMount() {
        requestMotivi((dt) => {
            this.setState({ query_mots: dt.query })
        });
        showProds((dt) => {
            this.setState({
                query_prods: dt.query
            });
            if (!this.state.showing && this.state.empty_create) {
                this.setState({
                    IDProdotti: dt.query[0].ID
                })
            }
        }, (dt) => {
            console.log(dt.msg)
        }, 'all');
        if (this.state.showing) {
            showEditMagazzino((dt) => {
                this.setState({
                    show: true,
                    ID: dt.query[0].ID || 0,
                    IDProdotti: dt.query[0].IDProdotti || -1,
                    IDMotivi: dt.query[0].IDMotivi || 1,
                    Totale: (dt.query[0].IsSottrai ? - dt.query[0].Totale : dt.query[0].Totale) || 0,
                    Data: new Date(dt.query[0].Data).toDateInputValue()
                });
            }, (dt) => {
                this.setState({
                    show: false
                });
            }, this.state.ID);
        } else {
            this.setState({
                show: true,
                IDProdotti: this.state.IDProdotti,
                IDMotivi: 1,
                Totale: 1,
                Data: new Date().toDateInputValue()
            });
        }
    }

    handleProdottoChange = (e) => {
        e.preventDefault();
        this.setState({ IDProdotti: e.target.value });
    }

    handleMotivoChange = (e) => {
        e.preventDefault();
        this.setState({ IDMotivi: e.target.value });
    }

    handleTotaleChange = (e) => {
        e.preventDefault();
        this.setState({ Totale: e.target.value });
    }

    handleCreate = (e) => {
        e.preventDefault();
        editMagazzino(
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
                IDProdotti: this.state.IDProdotti,
                IDMotivi: this.state.IDMotivi,
                Totale: Math.abs(this.state.Totale),
                Sottrai: this.state.Totale < 0
            });
    }

    render() {
        return <>
            {this.state.show ?
                <Modal show={this.state.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.showing ? "Mostra Modifica Magazzino" : "Modifica Quantità Magazzino"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className="lead">Dati della modifica:</span>
                        <Form>
                            <Container fluid mx="auto">
                                <Row mx="auto" >
                                    <Form.Group className="mb-3 mt-3" controlId="entrdata">
                                        <Form.Text className="h6">Dati modifica:</Form.Text>
                                        <FloatingLabel controlId="floatingProdotto" label="Prodotto" className="mt-1">
                                            <Form.Select aria-label="Prodotto" disabled={this.state.showing} value={this.state.IDProdotti} onChange={this.handleProdottoChange}>
                                                {this.state.query_prods.map((row, index) => {
                                                    return <option key={index} value={row['ID']}>{row['Nome']}</option>
                                                })}
                                            </Form.Select>
                                        </FloatingLabel>
                                        <FloatingLabel controlId="floatingMotivo" label="Motivo" className="mt-1">
                                            <Form.Select aria-label="Motivo" disabled={this.state.showing} value={this.state.IDMotivi} onChange={this.handleMotivoChange}>
                                                {this.state.query_mots.map((row, index) => {
                                                    return <option key={index} value={row['ID']}>{row['Nome']}</option>
                                                })}
                                            </Form.Select>
                                        </FloatingLabel>
                                    </Form.Group>
                                </Row>
                                <Row mx="auto">
                                    <Col md>
                                        <Form.Group className="mt-3" controlId="blockmod">
                                            <FloatingLabel controlId="floatingData" label="Data modifica" className="mt-1">
                                                <Form.Control type="date" autoComplete="off" autoCorrect="off" disabled value={this.state.Data} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingTotale" label="Quantità" className="mt-1">
                                                <Form.Control as="input" type="number" autoComplete="off" autoCorrect="off" disabled={this.state.showing} value={this.state.Totale} onChange={this.handleTotaleChange} />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                    {this.state.showing ?
                                        <Col md>
                                            <Form.Group className="mt-3" controlId="modifid">
                                                <Form.Text className="h6">ID Modifica:</Form.Text>
                                                <FloatingLabel controlId="floatingID" label="ID" className="mt-1">
                                                    <Form.Control type="text" autoComplete="off" autoCorrect="off" disabled value={this.state.ID} />
                                                </FloatingLabel>
                                            </Form.Group>
                                        </Col>
                                        :
                                        <></>
                                    }
                                </Row>
                            </Container>
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.handleClose}>
                            Chiudi
                        </Button>
                        {this.state.showing ?
                            <></>
                            :
                            <Button variant="primary" onClick={this.handleCreate}>
                                Modifica Magazzino
                            </Button>
                        }
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