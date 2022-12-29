import React, { Component } from "react";
import Container from "react-bootstrap/esm/Container";
import Row from "react-bootstrap/esm/Row";
import Col from "react-bootstrap/esm/Col";
import Form from "react-bootstrap/esm/Form";
import FloatingLabel from "react-bootstrap/esm/FloatingLabel";
import Modal from "react-bootstrap/esm/Modal";
import Button from "react-bootstrap/esm/Button";
import addicon from "../../../resources/images/add.png";
import erroricon from "../../../resources/images/error.png";
import successicon from "../../../resources/images/success.png";
import { showFams, updateFam, createFam, deleteFam, deleteComp, requestParentele, requestComponent, createComp, updateComp } from "./FamFunctions";
import { AutoFamFullTable } from "../../../contents/functions/tableGen";
import { ConfirmDialog, OkDialog } from "../../../contents/functions/Dialogs";
import LoadApp from "../../loadApp";
import { datax } from "../../../contents/data";

export class FamEditor extends Component {

    state = {
        show: false,
        edit: false,
        IDFAM: -1
    };

    constructor(props) {
        super(props);
        this.state.IDFAM = props.IDFAM;
        this.state.edit = props.edit;
    }

    handleNameChange = (e) => {
        e.preventDefault();
        this.setState({ NDic: e.target.value.toUpperCase() });
    }

    handleSurnameChange = (e) => {
        e.preventDefault();
        this.setState({ CDic: e.target.value.toUpperCase() });
    }

    handleCodFChange = (e) => {
        e.preventDefault();
        this.setState({ CodiceF: e.target.value.toUpperCase() });
    }

    handleAddressChange = (e) => {
        e.preventDefault();
        this.setState({ Indirizzo: e.target.value.toUpperCase() });
    }

    handlePhoneChange = (e) => {
        e.preventDefault();
        this.setState({ Telefono: e.target.value.toUpperCase() });
    }

    handleEdit = (e) => {
        e.preventDefault();
        updateFam((dt) => {
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
            this.state.IDFAM,
            {
                IDFAM: this.state.IDFAM,
                NDic: this.state.NDic,
                CDic: this.state.CDic,
                CodiceF: this.state.CodiceF,
                Indirizzo: this.state.Indirizzo,
                Telefono: this.state.Telefono
            });
    }

    componentDidMount() {
        showFams((dt) => {
            this.setState({
                show: true,
                IDFAM: !dt.query[0].IDFAM ? '' : dt.query[0].IDFAM,
                NDic: !dt.query[0].NDic ? '' : dt.query[0].NDic,
                CDic: !dt.query[0].CDic ? '' : dt.query[0].CDic,
                CodiceF: !dt.query[0].CodiceF ? '' : dt.query[0].CodiceF,
                Indirizzo: !dt.query[0].Indirizzo ? '' : dt.query[0].Indirizzo,
                Telefono: !dt.query[0].Telefono ? '' : dt.query[0].Telefono
            });
        }, (dt) => {
            this.setState({
                show: false
            });
        }, 'idfam/'+ this.state.IDFAM);
    }

    render() {
        return <>
            {this.state.show ?
                <Modal show={this.state.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Modifica famiglia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className="lead">Visualizza e modifica i dati della famiglia:</span>
                        <Form>
                            <Container fluid mx="auto">
                                <Row mx="auto" >
                                    <Col md>
                                        <Form.Group className="mb-3 mt-3" controlId="famdata">
                                            <Form.Text className="h6">Dati Dichiarante:</Form.Text>
                                            <FloatingLabel controlId="floatingName" label="Nome" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" disabled={!this.state.edit} value={this.state.NDic} onChange={this.handleNameChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingSurname" label="Cognome" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" disabled={!this.state.edit} value={this.state.CDic} onChange={this.handleSurnameChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingCodice" label="Codice Fiscale" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" disabled={!this.state.edit} value={this.state.CodiceF} onChange={this.handleCodFChange} />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                    <Col md>
                                        <Form.Group className="mt-3" controlId="famid">
                                            <Form.Text className="h6">ID Famiglia:</Form.Text>
                                            <FloatingLabel controlId="floatingID" label="ID" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" disabled value={this.state.IDFAM} />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group className="mb-3 mt-3" controlId="faminfo">
                                            <Form.Text className="h6">Informazioni:</Form.Text>
                                            <FloatingLabel controlId="floatingAddress" label="Indirizzo" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" disabled={!this.state.edit} value={this.state.Indirizzo} onChange={this.handleAddressChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingPhone" label="Telefono" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" disabled={!this.state.edit} value={this.state.Telefono} onChange={this.handlePhoneChange} />
                                            </FloatingLabel>
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
                        <Button variant="primary" onClick={this.handleEdit}>
                            Salva modifiche
                        </Button>
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

export class FamShower extends Component {
    state = {
        show: false,
        modal: <></>,
        IDFAM: -1,
        ID: -1,
        query: {}
    };

    constructor(props) {
        super(props);
        if (!!props.IDFAM) {
            this.state.IDFAM = props.IDFAM;
        } else {
            this.state.ID = props.ID;
        }
    }

    componentDidMount() {
        this.refersh();
    }

    refersh() {
        showFams((dt) => {
            this.setState({
                query: dt.query,
                show: true,
                IDFAM: !dt.query[0].IDFAM ? '' : dt.query[0].IDFAM,
                NDic: !dt.query[0].NDic ? '' : dt.query[0].NDic,
                CDic: !dt.query[0].CDic ? '' : dt.query[0].CDic,
                CodiceF: !dt.query[0].CodiceF ? '' : dt.query[0].CodiceF,
                Indirizzo: !dt.query[0].Indirizzo ? '' : dt.query[0].Indirizzo,
                Telefono: !dt.query[0].Telefono ? '' : dt.query[0].Telefono,
                components: !dt.query[0].components ? {} : dt.query[0].components,
                modal: <></>
            });
        }, this.errorFamLoad, (this.state.IDFAM > -1) ? "idfam/data/" + this.state.IDFAM : "idfam/" + this.state.ID);
    }

    errorFamLoad = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            this.setState({
                show: false,
                modal: OkDialog("Errore caricamento.", "Non è stato possibile caricare i dati della famiglia.", () => {
                    this.setState({ modal: <></> })
                }, false)
            });
        } else {
            LoadApp.addMessage(erroricon, "Famiglie", "Errore caricamento dati della famiglia.");
        }
    }

    handleAdd = (e) => {
        e.preventDefault();
        this.setState({
            show: false,
            modal: <CompEditor
                handleClose={() => {
                    this.refersh();
                }}
                IDFAM={this.state.IDFAM}
            />
        });
    }

    handleEdit = (e, id) => {
        e.preventDefault();
        this.setState({
            show: false,
            modal: <CompEditor
                handleClose={() => {
                    this.refersh();
                }}
                ID={id}
                IDFAM={this.state.IDFAM}
                edit={true}
            />
        });
    }

    handleDelete = (e, id) => {
        e.preventDefault();
        this.setState({
            show: false,
            modal: ConfirmDialog("Elimina componente", "Vuoi davvero eliminare questo componente?", () => {
                CompDelete(this.state.IDFAM, id, (dt) => {
                    this.refersh();
                }, this.errorDeleteComp);
            }, () => { }, () => {
                this.setState({ show: true, modal: <></> })
            })
        })
    }

    errorDeleteComp = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            this.setState({
                show: false,
                modal:
                    OkDialog("Errore eliminazione componente", "Non è stato possibile eliminare il componente.",
                        () => {
                            this.setState({
                                show: true,
                                modal: <></>
                            });
                        })
            });
        } else {
            LoadApp.addMessage(erroricon, "Componenti", "Non è stato possibile eliminare il componente.");
        }
    }

    render() {
        return <>
            {this.state.show ?
                <Modal show={this.state.show} onHide={this.props.handleClose} size="xl" >
                    <Modal.Header closeButton>
                        <Modal.Title>Dati famiglia: {this.state.IDFAM}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Container>
                            <Row className="justify-content-start">
                                <Col md="auto">
                                    <span className="fw-bold">Dichiarante: </span>
                                </Col>
                                <Col md="auto" ms="2">
                                    <span className="text-center">{this.state.NDic + " " + this.state.CDic}</span>
                                </Col>
                            </Row>
                            <Row className="justify-content-start">
                            </Row>
                            <Row className="justify-content-start align-item-center">
                                <Col md="auto">
                                    <span className="fw-bold text-center">Informazioni: </span>
                                </Col>
                                <Col md="auto" className="">
                                    <span className="text-center">{this.state.Indirizzo}</span>
                                </Col>
                                <Col md="auto" className="text-center">
                                    <span className="text-center">{this.state.Telefono}</span>
                                </Col>
                                <Col md="auto" className="text-center">
                                    <span className="text-center">{this.state.CodiceF}</span>
                                </Col>
                            </Row>
                            <Row className="mt-2" >
                                <Col>
                                    <span className="lead text-center">Componenti: </span>
                                    <Container fluid className="justify-content-end">
                                        <Button size="sm" className="text-center" onClick={this.handleAdd}><img src={addicon} style={{ width: 16, height: 16 }} alt="Aggiungi" /> Aggiungi</Button>
                                    </Container>
                                </Col>
                            </Row>
                            <Row mx="auto" className="mt-1">
                                <Col >{AutoFamFullTable(this.state.query.components,
                                    this.handleDelete,
                                    this.handleEdit
                                )
                                }</Col>
                            </Row>
                        </Container>
                    </Modal.Body>
                </Modal>
                :
                <>{this.state.modal}</>
            }
        </>;
    }
}

export class FamCreate extends Component {

    state = {
        show: true,
        IDFAM: -1,
        NDic: '',
        CDic: '',
        CodiceF: '',
        Indirizzo: '',
        Telefono: '',
        NCon: '',
        CCon: ''
    };

    handleNameChange = (e) => {
        e.preventDefault();
        this.setState({ NDic: e.target.value.toUpperCase() });
    }

    handleSurnameChange = (e) => {
        e.preventDefault();
        this.setState({ CDic: e.target.value.toUpperCase() });
    }

    handleCodFChange = (e) => {
        e.preventDefault();
        this.setState({ CodiceF: e.target.value.toUpperCase() });
    }

    handleAddressChange = (e) => {
        e.preventDefault();
        this.setState({ Indirizzo: e.target.value.toUpperCase() });
    }

    handlePhoneChange = (e) => {
        e.preventDefault();
        this.setState({ Telefono: e.target.value.toUpperCase() });
    }

    handleIDFAMChange = (e) => {
        e.preventDefault();
        this.setState({ IDFAM: e.target.value });
    }

    handleCreate = (e) => {
        e.preventDefault();
        createFam(
            (dt) => {
                if (!!this.props.success_handler) {
                    this.props.success_handler(dt);
                } else {
                    this.props.handleClose();
                }
            },
            (dt) => {
                if (!!this.props.error_handler) {
                    this.props.error_handler(dt);
                }
            },
            {
                IDFAM: this.state.IDFAM,
                NDic: this.state.NDic,
                CDic: this.state.CDic,
                CodiceF: this.state.CodiceF,
                Indirizzo: this.state.Indirizzo,
                Telefono: this.state.Telefono,
                NCon: this.state.NCon,
                CCon: this.state.CCon
            });
    }

    render() {
        return <>
            {this.state.show ?
                <Modal show={this.state.show} onHide={this.props.handleClose}>
                    <Modal.Header closeButton>
                        <Modal.Title>Crea famiglia</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className="lead">Iscrivi nuova famiglia:</span>
                        <Form>
                            <Container fluid mx="auto">
                                <Row mx="auto" >
                                    <Col md>
                                        <Form.Group className="mb-3 mt-3" controlId="famdata">
                                            <Form.Text className="h6">Dati Dichiarante:</Form.Text>
                                            <FloatingLabel controlId="floatingName" label="Nome" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" value={this.state.NDic} onChange={this.handleNameChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingSurname" label="Cognome" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" value={this.state.CDic} onChange={this.handleSurnameChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingCodice" label="Codice Fiscale" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" value={this.state.CodiceF} onChange={this.handleCodFChange} />
                                            </FloatingLabel>
                                        </Form.Group>
                                    </Col>
                                    <Col md>
                                        <Form.Group className="mt-3" controlId="famid">
                                            <Form.Text className="h6">ID Famiglia:</Form.Text>
                                            <FloatingLabel controlId="floatingID" label="ID" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" value={this.state.IDFAM} onChange={this.handleIDFAMChange} />
                                            </FloatingLabel>
                                        </Form.Group>
                                        <Form.Group className="mb-3 mt-3" controlId="faminfo">
                                            <Form.Text className="h6">Informazioni:</Form.Text>
                                            <FloatingLabel controlId="floatingAddress" label="Indirizzo" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" value={this.state.Indirizzo} onChange={this.handleAddressChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingPhone" label="Telefono" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" value={this.state.Telefono} onChange={this.handlePhoneChange} />
                                            </FloatingLabel>
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
                        <Button variant="primary" onClick={this.handleCreate}>
                            Salva
                        </Button>
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

export class CompEditor extends Component {

    state = {
        show: true,
        edit: false,
        modal: <></>,
        Nome: '',
        Cognome: '',
        Nascita: new Date().toISOString().substring(0, 10),
        Parentela: 0,
        query: []
    }


    constructor(props) {
        super(props);
        if (!!props.edit) {
            this.state.edit = props.edit;
        }
    }

    componentDidMount() {
        requestParentele((dt) => {
            this.setState({ query: dt.query })
        });
        if (this.state.edit) {
            requestComponent(
                (dt) => {
                    this.setState({
                        Nome: dt.query[0].Nome,
                        Cognome: dt.query[0].Cognome,
                        Nascita: new Date(dt.query[0].Nascita).toDateInputValue(),
                        Parentela: dt.query[0].IDParentela
                    })
                },
                this.errorLoadComp,
                { idfam: this.props.IDFAM, idcomp: this.props.ID }
            );
        }
    }


    handleNameChange = (e) => {
        e.preventDefault();
        this.setState({ Nome: e.target.value.toUpperCase() });
    }

    handleSurnameChange = (e) => {
        e.preventDefault();
        this.setState({ Cognome: e.target.value.toUpperCase() });
    }

    handleDateChange = (e) => {
        e.preventDefault();
        this.setState({ Nascita: e.target.value });
    }

    handleParentelaChange = (e) => {
        e.preventDefault();
        this.setState({ Parentela: e.target.value });
    }

    handleSubmit = (e) => {
        e.preventDefault();
        if (this.state.edit) {
            updateComp(
                (dt) => {
                    if (!datax.DataHandler.dataSettings.light) {
                        LoadApp.addMessage(successicon, "Componenti", "Componente aggiornato con successo");
                    }
                    this.props.handleClose();
                },
                this.errorModifyComp,
                { idfam: this.props.IDFAM, idcomp: this.props.ID },
                {
                    Nome: this.state.Nome,
                    Cognome: this.state.Cognome,
                    Nascita: new Date(this.state.Nascita).getTime() / 1000,
                    Parentela: this.state.Parentela
                }
            );
        } else {
            createComp(
                (dt) => {
                    if (!datax.DataHandler.dataSettings.light) {
                        LoadApp.addMessage(successicon, "Componenti", "Componente creato con successo");
                    }
                    this.props.handleClose();
                },
                this.errorCreateComp,
                this.props.IDFAM,
                {
                    Nome: this.state.Nome,
                    Cognome: this.state.Cognome,
                    Nascita: new Date(this.state.Nascita).getTime() / 1000,
                    Parentela: this.state.Parentela,
                }
            )
        }
    }

    errorLoadComp = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            this.setState({
                modal: OkDialog("Errore caricamento dati", "Non è stato possibile scaricare i dati.", () => this.setState({ modal: <></> }), false)
            });
        } else {
            LoadApp.addMessage(erroricon, "Componenti", "Non è stato possibile scaricare i dati.");
        }
    }

    errorCreateComp = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            this.setState({
                show: false,
                modal:
                    OkDialog("Errore creazione componente", "Non è stato possibile creare un nuovo componente.",
                        () => {
                            this.setState({
                                show: true,
                                modal: <></>
                            });
                            this.props.handleClose();
                        })
            });
        } else {
            LoadApp.addMessage(erroricon, "Componenti", "Non è stato possibile creare un nuovo componente.");
        }
    }

    errorModifyComp = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            this.setState({
                show: false,
                modal: OkDialog("Errore modifica componente", "Non è stato possibile modificare il componente.",
                    () => {
                        this.setState({
                            show: true,
                            modal: <></>
                        });
                        this.props.handleClose();
                    })
            });
        } else {
            LoadApp.addMessage(erroricon, "Componenti", "Non è stato possibile modificare il componente.");
        }
    }

    render() {
        return <>
            {this.state.show ?
                <Modal show={this.state.show} onHide={this.props.handleClose} centered>
                    <Modal.Header closeButton>
                        <Modal.Title>{this.state.edit ? "Modifica Componente" : "Crea Componente"}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <span className="lead">{this.state.edit ? "Cambia i dati del componente della famiglia:" : "Iscrivi un nuovo componente alla famiglia:"}</span>
                        <Form>
                            <Container fluid mx="auto">
                                <Row mx="auto" >
                                    <Col md>
                                        <Form.Group className="mb-3 mt-3" controlId="famdata">
                                            <Form.Text className="h6">Dati Componente:</Form.Text>
                                            <FloatingLabel controlId="floatingName" label="Nome" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" value={this.state.Nome} onChange={this.handleNameChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingSurname" label="Cognome" className="mt-1">
                                                <Form.Control type="text" autoComplete="off" autoCorrect="off" value={this.state.Cognome} onChange={this.handleSurnameChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingNascita" label="Data di nascita" className="mt-1">
                                                <Form.Control type="date" autoComplete="off" autoCorrect="off" value={this.state.Nascita} onChange={this.handleDateChange} />
                                            </FloatingLabel>
                                            <FloatingLabel controlId="floatingParentela" label="Parentela" className="mt-1">
                                                <Form.Select aria-label="Grado di parentela" value={this.state.Parentela} onChange={this.handleParentelaChange}>
                                                    {this.state.query.map((row, index) => {
                                                        return <option key={index} value={row['ID']}>{row['Tipo']}</option>
                                                    })}
                                                </Form.Select>
                                            </FloatingLabel>
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
                        <Button variant="primary" onClick={this.handleSubmit}>
                            {this.state.edit ? "Applica" : "Salva"}
                        </Button>
                    </Modal.Footer>
                </Modal>
                ://Eseguito qua sotto se c'è un errore di ricezione dati dalla chiamata al codice php per i dati della famiglia
                <Container>
                    <span>Errore caricamento dati</span>
                </Container>
            }
            <>{this.state.modal}</>
        </>;
    }

}

export function FamDelete(idfam, success_handler, error_handler) {
    deleteFam(success_handler, error_handler, { idfam: idfam });
}

export function CompDelete(idfam, idcomp, success_handler, error_handler) {
    deleteComp(success_handler, error_handler, { idfam: idfam, idcomp: idcomp });
}