import React, { Component } from "react";
import  Button from "react-bootstrap/Button";
import  Col from "react-bootstrap/Col";
import  Container from "react-bootstrap/Container";
import  FloatingLabel from "react-bootstrap/FloatingLabel";
import  Form from "react-bootstrap/Button";
import  Row from "react-bootstrap/Row";
import { getConfezioniExtra, getDonatoriExtra, getMotiviExtra } from "../../../contents/api/capi-extra";
import { addEntrataMagazzino, addModificaMagazzino, addProdottoMagazzino, boxEntrataValues, boxModificaValues, boxProdottoValues, getAllProdottiMagazzino, getIDEntrateMagazzino, getIDModificheMagazzino, getIDProdottiMagazzino, updateEntrataMagazzino, updateProdottoMagazzino } from "../../../contents/api/capi-magazzino";
import DataExchange from "../../../contents/DataExchange";
import generateModal from "../../../contents/functions/ModalGenerators";
import { _AddIcon, _EditIcon, _ShowIcon } from "../../../contents/images";
import LoadApp from "../../loadApp";

export class MagEditorModal extends Component {

    state = {
        dtx: null,
        create: false,
        edit: false,
        Nome: '',
        IDConfezione: 0,
        IsMagazzino: true,
        IsExtra: false,
        IsFresco: false,
        IsIgiene: false,
        ID: -1,
        query: [],
        editable: false
    };

    constructor(props) {
        super(props);
        this.state.ID = props.ID || -1;
        this.state.create = props.ID == null;
        this.state.edit = props.edit;
        this.state.editable = props.edit || this.state.create;
        this.state.dtx = props.dtx;
        props.dtx.subscribeFunctions(() => {
            if (this.state.edit) {
                this.handleEdit();
            } else if (this.state.create) {
                this.handleCreate();
            }
        });
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
        if (e) {
            e.preventDefault();
        }
        const prod_values = boxProdottoValues(this.state.Nome, this.state.IDConfezioni, this.state.IsMagazzino,
            this.state.IsFresco, this.state.IsIgiene, this.state.IsExtra);
        updateProdottoMagazzino(this.state.ID, prod_values,
            (dt) => {
                if (!!this.props.success_handler) {
                    this.props.success_handler(dt);
                }
            },
            (dt) => {
                if (!!this.props.error_handler) {
                    this.props.error_handler(dt);
                }
            });
    }

    handleCreate = (e) => {
        if (e) {
            e.preventDefault();
        }
        const prod_values = boxProdottoValues(this.state.nome, this.state.IDConfezioni, this.state.IsMagazzino,
            this.state.IsFresco, this.state.IsIgiene, this.state.IsExtra);
        addProdottoMagazzino(prod_values,
            (dt) => { //Devo aggiungere un prodotto
                if (!!this.props.success_handler) {
                    this.props.success_handler(dt);
                }
            },
            (dt) => {
                if (!!this.props.error_handler) {
                    this.props.error_handler(dt);
                }
            });
    }

    componentDidMount() {
        getConfezioniExtra((dt) => {
            this.setState({ query: dt.query })
        }, () => { });
        if (!this.state.create) {//mostra o edita
            getIDProdottiMagazzino(this.state.ID,
                (dt) => {
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
                }, () => { });
        } else {//crea nuovo
            this.setState({
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
            <span className="lead">Dati del prodotto:</span>
            <Form>
                <Container fluid mx="auto">
                    <Row mx="auto" >
                        <Col md>
                            <Form.Group className="mb-3 mt-3" controlId="famdata">
                                <Form.Text className="h6">Dati Prodotto:</Form.Text>
                                <FloatingLabel controlId="floatingName" label="Nome" className="mt-1">
                                    <Form.Control type="text" autoComplete="off" autoCorrect="off" disabled={!this.state.editable} value={this.state.Nome} onChange={this.handleNameChange} />
                                </FloatingLabel>
                                <FloatingLabel controlId="floatingConfezione" label="Confezione" className="mt-1">
                                    <Form.Select aria-label="Dimensione confezione" disabled={!this.state.editable} value={this.state.IDConfezioni} onChange={this.handleConfezioneChange}>
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
                                <Form.Check id="ismag" label="A magazzino" autoComplete="off" autoCorrect="off" disabled={!this.state.editable} checked={this.state.IsMagazzino} onChange={this.handleIsMagazzinoChange} />
                                <Form.Check id="isfresco" label="Fresco" autoComplete="off" autoCorrect="off" disabled={!this.state.editable} checked={this.state.IsFresco} onChange={this.handleIsFrescoChange} />
                                <Form.Check id="isig" label="Igiene" autoComplete="off" autoCorrect="off" disabled={!this.state.editable} checked={this.state.IsIgiene} onChange={this.handleIsIgieneChange} />
                                <Form.Check id="isextra" label="Extra" autoComplete="off" autoCorrect="off" disabled={!this.state.editable} checked={this.state.IsExtra} onChange={this.handleIsExtraChange} />
                            </Form.Group>
                        </Col>
                    </Row>
                </Container>
            </Form>
        </>;
    }

}

export const fun_MagEditorModal = (close_action, edit = false, ID = null, success_handler, error_handler) => {

    const dt = new DataExchange();
    const create = ID == null;

    LoadApp.addModal(
        generateModal(300, edit ? (create ? "Crea Prodotto" : "Modifica Prodotto") : "Mostra Prodotto",
            edit ? (create ? _AddIcon : _EditIcon) : _ShowIcon, "Gestione Prodotto",
            //handleClose={(e) => { modal_close_action(); close_action(e); }}    
            (modal_close_action) => {
                return <MagEditorModal dtx={dt} edit={edit} ID={ID} success_handler={success_handler ? success_handler : undefined}
                    error_handler={error_handler ? error_handler : (dt) => { console.log(dt) }} />
            },
            (modal_close_action) => {
                return <>
                    <Button variant="secondary" onClick={(e) => {
                        modal_close_action();
                        close_action(e);
                    }}>
                        Chiudi
                    </Button>
                    {edit ?
                        <Button variant="primary" onClick={(e) => {
                            modal_close_action();
                            dt.setData({ close: true });
                            close_action(e);
                        }}>
                            {create ? 'Salva prodotto' : 'Salva modifiche'}
                        </Button>
                        : <></>}
                </>
            }, close_action)
    );
};

export class EntryEditorModal extends Component {

    state = {
        dtx: null,
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
        query_dons: [],
        editable: false,
    };

    constructor(props) {
        super(props);
        this.state.ID = props.ID || -1;
        this.state.create = props.ID == null;
        this.state.edit = props.edit;
        this.state.editable = props.edit || this.state.create;
        this.state.IDProdotti = props.IDProdotti || -1;
        this.state.IDDonatori = props.IDDonatori || 1;
        this.state.dtx = props.dtx;
        props.dtx.subscribeFunctions(() => {
            if (this.state.edit) {
                this.handleEdit();
            } else if (this.state.create) {
                this.handleCreate();
            }
        });
    }

    componentDidMount() {
        getDonatoriExtra((dt) => {
            this.setState({ query_dons: dt.query })
        }, () => { });
        getAllProdottiMagazzino((dt) => {
            this.setState({
                query_prods: dt.query
            });
            if (!this.state.edit && this.state.create) {//Non sono in modifica ma lo sto creando
                this.setState({
                    IDProdotti: dt.query[0].ID //quindi prendo il primo ID nella lista dei prodotti
                });
            }
        }, () => { });
        if (!this.state.create) {//Se non sto creando
            getIDEntrateMagazzino(this.state.ID,
                (dt) => {
                    this.setState({
                        ID: dt.query[0].ID || 0,
                        IDProdotti: dt.query[0].IDProdotti || -1,
                        IDDonatori: dt.query[0].IDDonatori || -1,
                        Prodotto: dt.query[0].Prodotto || '',
                        Donatore: dt.query[0].Donatre || '',
                        Totale: dt.query[0].Totale || 0,
                        Arrivo: new Date(dt.query[0].Arrivo).toDateInputValue()
                    });
                }, (dt) => { });
        } else { //Se sto creando
            this.setState({
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
        if (e) {
            e.preventDefault();
        }
        const entr_values = boxEntrataValues(null, null, this.state.Totale, new Date(this.state.Arrivo));
        updateEntrataMagazzino(this.state.ID, entr_values,
            (dt) => {
                if (!!this.props.success_handler) {
                    this.props.success_handler(dt);
                }
                //this.props.handleClose();
            },
            (dt) => {
                if (!!this.props.error_handler) {
                    this.props.error_handler(dt);
                }
            });
    }

    handleCreate = (e) => {
        if (e) {
            e.preventDefault();
        }
        const entr_values = boxEntrataValues(this.state.IDProdotti, this.state.IDDonatori, this.state.Totale, new Date(this.state.Arrivo));
        addEntrataMagazzino(entr_values,
            (dt) => { //Devo aggiungere un prodotto
                if (!!this.props.success_handler) {
                    this.props.success_handler(dt);
                }
                //this.props.handleClose();
            },
            (dt) => {
                if (!!this.props.error_handler) {
                    this.props.error_handler(dt);
                }
            });
    }

    render() {
        return <>
            <span className="lead">Dati dell'entrata registrata:</span>
            <Form>
                <Container fluid mx="auto">
                    <Row mx="auto" >
                        <Form.Group className="mb-3 mt-3" controlId="entrdata">
                            <Form.Text className="h6">Dati Entrata:</Form.Text>
                            <FloatingLabel controlId="floatingProdotto" label="Prodotto" className="mt-1">
                                <Form.Select aria-label="Prodotto" disabled={!this.state.editable} value={this.state.IDProdotti} onChange={this.handleProdottoChange}>
                                    {this.state.query_prods.map((row, index) => {
                                        return <option key={index} value={row['ID']}>{row['Nome']}</option>
                                    })}
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingDonatore" label="Donatore" className="mt-1">
                                <Form.Select aria-label="Donatore" disabled={!this.state.editable} value={this.state.IDDonatori} onChange={this.handleDonatoreChange}>
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
                                    <Form.Control type="date" autoComplete="off" autoCorrect="off" disabled={!this.state.editable} value={this.state.Arrivo} onChange={this.handleDateChange} />
                                </FloatingLabel> <FloatingLabel controlId="floatingTotale" label="Quantità" className="mt-1">
                                    <Form.Control as="input" type="number" autoComplete="off" autoCorrect="off" disabled={!this.state.editable} value={this.state.Totale} onChange={this.handleTotaleChange} />
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
        </>;
    }

}

export const fun_EntryEditorModal = (close_action, edit = false, ID = null, IDProdotto = null, IDDonatore = null, success_handler, error_handler) => {

    const dt = new DataExchange();
    const create = ID == null;

    LoadApp.addModal(
        generateModal(301, edit ? (create ? "Crea Entrata" : "Modifica Entrata") : "Mostra Entrata",
            edit ? (create ? _AddIcon : _EditIcon) : _ShowIcon, "Gestione Entrata",
            //handleClose={(e) => { modal_close_action(); close_action(e); }}    
            (modal_close_action) => {
                return <EntryEditorModal dtx={dt} edit={edit} ID={ID}
                    IDProdotti={IDProdotto} IDDonatori={IDDonatore}
                    success_handler={success_handler ? success_handler : undefined}
                    error_handler={error_handler ? error_handler : (dt) => { console.log(dt) }} />
            },
            (modal_close_action) => {
                return <>
                    <Button variant="secondary" onClick={(e) => {
                        modal_close_action();
                        close_action(e);
                    }}>
                        Chiudi
                    </Button>
                    {edit ?
                        <Button variant="primary" onClick={(e) => {
                            modal_close_action();
                            dt.setData({ close: true });
                            close_action(e);
                        }}>
                            {create ? 'Salva entrata' : 'Salva modifiche'}
                        </Button>
                        : <></>}
                </>
            }, close_action)
    );
};

export class ModificheEditorModal extends Component {

    state = {
        dtx: null,
        edit: false,
        create: false,
        //showing: false,//mostra solamente una modifica
        //empty_create: true,//Se non viene passato come parametro l'id del prodotto
        ID: -1,
        IDProdotti: -1,
        IDMotivi: 1,
        Totale: 1,
        Data: new Date().toDateInputValue(),
        query_prods: [],
        query_mots: [],
        editable: false
    };

    constructor(props) {
        super(props);
        this.state.ID = props.ID || -1;
        this.state.edit = props.edit;
        this.state.dtx = props.dtx;
        this.state.create = props.ID == null;
        this.state.editable = props.edit || this.state.create;
        this.state.IDProdotti = props.IDProdotti || -1;
        this.state.IDMotivi = props.IDMotivi || 1;
        props.dtx.subscribeFunctions(() => {
            if (this.state.edit) {

            } else if (this.state.create) {
                this.handleCreate();
            }
        });
    }


    componentDidUpdate(prevprops) {
        if (prevprops.ID !== this.props.ID || prevprops.IDProdotti !== this.props.IDProdotti) {
            this.setState({
                ID: this.props.ID || -1,
                edit: this.props.edit,
                create: this.props.ID == null,
                IDProdotti: this.props.IDProdotti || -1
            });
        }
    }

    componentDidMount() {
        getMotiviExtra((dt) => {
            this.setState({ query_mots: dt.query })
        }, (dt) => { console.log(dt) });
        getAllProdottiMagazzino((dt) => {
            this.setState({
                query_prods: dt.query
            });
            if (!this.state.edit && !this.state.IDProdotti && this.state.create) {
                this.setState({
                    IDProdotti: dt.query[0].ID
                })
            }
        }, (dt) => {
            console.log(dt.msg)
        });
        if (!this.state.create) {//Non devo crearlo
            getIDModificheMagazzino(this.state.ID,
                (dt) => {
                    this.setState({
                        ID: dt.query[0].ID || 0,
                        IDProdotti: dt.query[0].IDProdotti || -1,
                        IDMotivi: dt.query[0].IDMotivi || 1,
                        Totale: (dt.query[0].IsSottrai ? - dt.query[0].Totale : dt.query[0].Totale) || 0,
                        Data: new Date(dt.query[0].Data).toDateInputValue()
                    });
                }, (dt) => {
                    console.log(dt);
                });
        } else {//Devo crearlo
            this.setState({
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
        if (e) {
            e.preventDefault();
        }
        const mod_values = boxModificaValues(this.state.IDProdotti, this.state.IDMotivi, Math.abs(this.state.Totale), this.state.Totale < 0);
        addModificaMagazzino(mod_values,
            (dt) => { //Devo aggiungere un prodotto
                if (!!this.props.success_handler) {
                    this.props.success_handler(dt);
                }
                //this.props.handleClose();
            },
            (dt) => {
                if (!!this.props.error_handler) {
                    this.props.error_handler(dt);
                }
            });
    }

    render() {
        return <>
            <span className="lead">Dati della modifica:</span>
            <Form>
                <Container fluid mx="auto">
                    <Row mx="auto" >
                        <Form.Group className="mb-3 mt-3" controlId="entrdata">
                            <Form.Text className="h6">Dati modifica:</Form.Text>
                            <FloatingLabel controlId="floatingProdotto" label="Prodotto" className="mt-1">
                                <Form.Select aria-label="Prodotto" disabled={!this.state.editable} value={this.state.IDProdotti} onChange={this.handleProdottoChange}>
                                    {this.state.query_prods.map((row, index) => {
                                        return <option key={index} value={row['ID']}>{row['Nome']}</option>
                                    })}
                                </Form.Select>
                            </FloatingLabel>
                            <FloatingLabel controlId="floatingMotivo" label="Motivo" className="mt-1">
                                <Form.Select aria-label="Motivo" disabled={!this.state.editable} value={this.state.IDMotivi} onChange={this.handleMotivoChange}>
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
                                    <Form.Control as="input" type="number" autoComplete="off" autoCorrect="off" disabled={!this.state.editable} value={this.state.Totale} onChange={this.handleTotaleChange} />
                                </FloatingLabel>
                            </Form.Group>
                        </Col>
                        {!this.state.editable ?
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
        </>;
    }

}

export const fun_ModificheEditorModal = (close_action, edit = false, ID = null, IDProdotto = null, IDMotivo = null, success_handler, error_handler) => {

    const dt = new DataExchange();
    const create = ID == null;

    LoadApp.addModal(
        generateModal(301, edit ? (create ? "Modifica quantità magazzino" : "Aggiorna Modifica Magazzino") : "Mostra Modifica Magazzino",
            edit ? (create ? _AddIcon : _EditIcon) : _ShowIcon, "Gestione Modifiche Magazzino",
            //handleClose={(e) => { modal_close_action(); close_action(e); }}    
            (modal_close_action) => {
                return <ModificheEditorModal dtx={dt} edit={edit} ID={ID}
                    IDProdotti={IDProdotto} IDMotivi={IDMotivo}
                    success_handler={success_handler ? success_handler : undefined}
                    error_handler={error_handler ? error_handler : (dt) => { console.log(dt) }} />
            },
            (modal_close_action) => {
                return <>
                    <Button variant="secondary" onClick={(e) => {
                        modal_close_action();
                        close_action(e);
                    }}>
                        Chiudi
                    </Button>
                    {edit || create ?
                        <Button variant="primary" onClick={(e) => {
                            modal_close_action();
                            dt.setData({ close: true });
                            close_action(e);
                        }}>
                            {create ? 'Modifica magazzino' : 'Salva modifiche'}
                        </Button>
                        : <></>}
                </>
            }, close_action)
    );
};