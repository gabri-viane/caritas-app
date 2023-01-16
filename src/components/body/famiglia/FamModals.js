import React, { Component } from 'react';
import  Button from "react-bootstrap/Button";
import  Col from "react-bootstrap/Col";
import  Container from "react-bootstrap/Container";
import  FloatingLabel from "react-bootstrap/FloatingLabel";
import  Form from "react-bootstrap/Button";
import  Row from "react-bootstrap/Row";
import { getParenteleExtra } from '../../../contents/api/capi-extra';
import { boxFamilyValues, addFamily, updateFamily, getIDFAMFamilies, getIDFAMFamiliesComplete, getIDFamiliesComplete, deleteComponentFamily, updateComponentFamily, addComponentFamily, getCompIDFAMFamily, boxComponentValues } from '../../../contents/api/capi-family';
import { datax } from '../../../contents/data';
import DataExchange from '../../../contents/DataExchange';
import { ConfirmDialog, OkDialog } from '../../../contents/functions/DialogGenerators';
import generateModal from '../../../contents/functions/ModalGenerators';
import { AutoFamFullTable } from '../../../contents/functions/TableGenerators';
import { _AddIcon, _EditIcon, _ErrorIcon, _SuccessIcon } from '../../../contents/images';
import LoadApp from '../../loadApp';

export class FamEditorModal extends Component {

    state = {
        dtx: null,
        show: true,
        edit: false,
        IDFAM: -1,
        NDic: '',
        CDic: '',
        CodiceF: '',
        Indirizzo: '',
        Telefono: '',
        NCon: '',
        CCon: ''
    };

    constructor(props) {
        super(props);
        this.state.dtx = props.dtx;
        if (props.IDFAM && props.IDFAM !== null) {
            this.state.IDFAM = props.IDFAM;
            this.state.edit = props.edit;
        }
        props.dtx.subscribeFunctions((dt) => {
            if (this.state.edit) {
                this.handleEdit();
            } else {
                this.handleCreate();
            }
        });
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

    handleIDFAMChange = (e) => {
        e.preventDefault();
        this.setState({ IDFAM: e.target.value });
    }

    handleCreate = (e) => {
        if (e) {
            e.preventDefault();
        }
        //A quanto pare quando ho scritto questo codice non ho aggiunto la parte per il coniuge oppure l'ho lasciata a metà
        const fam_values = boxFamilyValues(this.state.IDFAM, this.state.NDic, this.state.CDic,
            this.state.Indirizzo, this.state.Telefono, this.state.CodiceF, this.state.NCon, this.state.CCon);

        addFamily(fam_values,
            (dt) => {
                if (!!this.props.success_handler) {
                    this.props.success_handler(dt);
                }
                //Non conviene farlo qua
                //this.props.handleClose();
            },
            (dt) => {
                if (!!this.props.error_handler) {
                    this.props.error_handler(dt);
                }
            });
    }

    handleEdit = (e) => {
        if (e) {
            e.preventDefault();
        }
        const fam_values = boxFamilyValues(this.state.IDFAM, this.state.NDic, this.state.CDic,
            this.state.Indirizzo, this.state.Telefono, this.state.CodiceF);

        updateFamily(this.state.IDFAM, fam_values,
            (dt) => {
                if (!!this.props.success_handler) {
                    this.props.success_handler(dt);
                }
                //Non conviene qua: lo chiudo poi dal footer
                //this.props.handleClose();
            },
            (dt) => {
                if (!!this.props.error_handler) {
                    this.props.error_handler(dt);
                }
            });
    }

    /**
     * Aggiorna i valori SOLO SE nello stato è stato impostato un'IDFAM
     */
    retriveData = () => {
        getIDFAMFamilies(this.state.IDFAM, (dt) => {
            this.setState({
                IDFAM: !dt.query[0].IDFAM ? '' : dt.query[0].IDFAM,
                NDic: !dt.query[0].NDic ? '' : dt.query[0].NDic,
                CDic: !dt.query[0].CDic ? '' : dt.query[0].CDic,
                CodiceF: !dt.query[0].CodiceF ? '' : dt.query[0].CodiceF,
                Indirizzo: !dt.query[0].Indirizzo ? '' : dt.query[0].Indirizzo,
                Telefono: !dt.query[0].Telefono ? '' : dt.query[0].Telefono
            });
        });
    }

    componentDidMount() {
        if (this.state.edit) {
            this.retriveData();
        }
    }

    /**
     * Esegue il refresh del componente se viene passato un nuovo IDFAM.
     * 
     * @param {Object} prevprops 
     */
    componentDidUpdate(prevprops) {
        if (this.props.IDFAM !== null && prevprops.IDFAM !== this.props.IDFAM && this.props.edit) {
            this.setState({
                edit: this.props.edit,
                IDFAM: this.props.IDFAM
            })
            this.retriveData();
        }
    }

    render() {
        return <>
            <span className="lead">{this.state.edit ? 'Visualizza e modifica i dati della famiglia:' : 'Iscrivi nuova famiglia:'}</span>
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
                                    <Form.Control type="text" autoComplete="off" autoCorrect="off" value={this.state.IDFAM} disabled={this.state.edit} onChange={this.handleIDFAMChange} />
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
        </>;
    }

}
//TODO:Volendo posso aggiungere i success_handler e migliorare gli error_handler
export const fun_FamEditorModal = (close_action, IDFAM = null) => {

    const dt = new DataExchange();

    LoadApp.addModal(
        generateModal(200, IDFAM !== null ? "Modifica famiglia" : "Crea famiglia", IDFAM !== null ? _EditIcon : _AddIcon, IDFAM !== null ? "Modifica famiglia" : "Aggiungi famiglia",
            //handleClose={(e) => { modal_close_action(); close_action(e) }}
            (modal_close_action) => { return <FamEditorModal dtx={dt} edit={IDFAM !== null} IDFAM={IDFAM} error_handler={(dt) => { console.log(dt) }} /> },
            (modal_close_action) => {
                return <>
                    <Button variant="secondary" onClick={(e) => {
                        modal_close_action();
                        close_action(e);
                    }}>
                        Chiudi
                    </Button>
                    <Button variant="primary" onClick={(e) => {
                        modal_close_action();
                        dt.setData({ close: true });
                        close_action(e);
                    }}>
                        {IDFAM !== null ? 'Salva modifiche' : 'Salva'}
                    </Button>
                </>
            }, close_action)
    );
};

export class FamShowerModal extends Component {
    state = {
        dtx: null,
        IDFAM: -1,
        ID: -1,
        query: {}
    };

    constructor(props) {
        super(props);
        this.state.dtx = props.dtx;
        if (!!props.IDFAM) {
            this.state.IDFAM = props.IDFAM;
        } else {
            this.state.ID = props.ID;
        }
    }

    componentDidMount() {
        this.refersh();
    }

    refersh = () => {
        if (this.state.IDFAM > -1) {//Uso IDFAM per recuperare la famiglia
            getIDFAMFamiliesComplete(this.state.IDFAM,
                (dt) => {
                    this.setState({
                        query: dt.query,
                        IDFAM: !dt.query[0].IDFAM ? '' : dt.query[0].IDFAM,
                        NDic: !dt.query[0].NDic ? '' : dt.query[0].NDic,
                        CDic: !dt.query[0].CDic ? '' : dt.query[0].CDic,
                        CodiceF: !dt.query[0].CodiceF ? '' : dt.query[0].CodiceF,
                        Indirizzo: !dt.query[0].Indirizzo ? '' : dt.query[0].Indirizzo,
                        Telefono: !dt.query[0].Telefono ? '' : dt.query[0].Telefono,
                        components: !dt.query[0].components ? {} : dt.query[0].components
                    });
                }, this.errorFamLoad
            );
        } else {//Uso ID per recuperare la famiglia
            getIDFamiliesComplete(this.state.ID, (dt) => {
                this.setState({
                    query: dt.query,
                    IDFAM: !dt.query[0].IDFAM ? '' : dt.query[0].IDFAM,
                    NDic: !dt.query[0].NDic ? '' : dt.query[0].NDic,
                    CDic: !dt.query[0].CDic ? '' : dt.query[0].CDic,
                    CodiceF: !dt.query[0].CodiceF ? '' : dt.query[0].CodiceF,
                    Indirizzo: !dt.query[0].Indirizzo ? '' : dt.query[0].Indirizzo,
                    Telefono: !dt.query[0].Telefono ? '' : dt.query[0].Telefono,
                    components: !dt.query[0].components ? {} : dt.query[0].components
                });
            }, this.errorFamLoad)
        }
    }

    errorFamLoad = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            LoadApp.addModal(OkDialog("Errore caricamento.", "Non è stato possibile caricare i dati della famiglia.", () => { }, false));
        } else {
            LoadApp.addMessage(_ErrorIcon, "Famiglie", "Errore caricamento dati della famiglia.");
        }
    }

    handleAdd = (e) => {
        e.preventDefault();
        fun_CompEditorModal(() => { this.refersh() }, this.state.IDFAM, null, false);
    }

    handleEdit = (e, id) => {
        e.preventDefault();
        fun_CompEditorModal(() => { this.refersh() }, this.state.IDFAM, id, true);
    }

    handleDelete = (e, id) => {
        e.preventDefault();
        LoadApp.addModal(ConfirmDialog("Elimina componente", "Vuoi davvero eliminare questo componente?", () => {
            deleteComponentFamily(this.state.IDFAM, id, (dt) => {
                this.refersh();
            }, this.errorDeleteComp);
        }, () => { }, () => { }));
    }

    errorDeleteComp = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            LoadApp.addModal(OkDialog("Errore eliminazione componente", "Non è stato possibile eliminare il componente.",
                () => { }));
        } else {
            LoadApp.addMessage(_ErrorIcon, "Componenti", "Non è stato possibile eliminare il componente.");
        }
    }

    render() {
        return <>
            <Container fluid>
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
                            <Button size="sm" className="text-center" onClick={this.handleAdd}><img src={_AddIcon} style={{ width: 16, height: 16 }} alt="Aggiungi" /> Aggiungi</Button>
                        </Container>
                    </Col>
                </Row>
                <Row mx="auto" className="mt-1">
                    <Col >{this.state.query.components ? AutoFamFullTable(this.state.query.components, this.handleDelete, this.handleEdit) : <></>}</Col>
                </Row>
            </Container>
        </>;
    }
}

//TODO:Volendo posso aggiungere i success_handler e migliorare gli error_handler
export const fun_FamShowerModal = (close_action, IDFAM) => {

    const dt = new DataExchange();

    LoadApp.addModal(
        generateModal(201, 'Dati famiglia: ' + IDFAM, null, "Mostra famiglia",
            //handleClose={(e) => { modal_close_action(); close_action(e); }}
            (modal_close_action) => { return <FamShowerModal dtx={dt} IDFAM={IDFAM} error_handler={(dt) => { console.log(dt) }} /> },
            (modal_close_action) => { return <></> }, close_action, 'xl')
    );
};

/**
 * Necessita di un DataExchange(dtx), Number(IDFAM), Number(ID), Boolean(edit)
 */
export class CompEditorModal extends Component {

    state = {
        dtx: null,
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
        this.state.dtx = props.dtx;
        props.dtx.subscribeFunctions(() => {
            this.handleSubmit();
        })
    }

    componentDidMount() {
        getParenteleExtra((dt) => {
            this.setState({ query: dt.query })
        }, () => { });
        if (this.state.edit) {
            getCompIDFAMFamily(this.props.IDFAM, this.props.ID,
                (dt) => {
                    this.setState({
                        Nome: dt.query[0].Nome,
                        Cognome: dt.query[0].Cognome,
                        Nascita: new Date(dt.query[0].Nascita).toDateInputValue(),
                        Parentela: dt.query[0].IDParentela
                    })
                },
                this.errorLoadComp
            );
        }
    }

    componentDidUpdate(prevprops) {
        if (prevprops.ID !== this.props.ID) {
            this.setState({
                ID: this.props.ID,
                IDFAM: this.props.IDFAM,
                edit: this.props.edit
            }, () => {
                if (this.state.edit) {
                    getCompIDFAMFamily(this.props.IDFAM, this.props.ID,
                        (dt) => {
                            this.setState({
                                Nome: dt.query[0].Nome,
                                Cognome: dt.query[0].Cognome,
                                Nascita: new Date(dt.query[0].Nascita).toDateInputValue(),
                                Parentela: dt.query[0].IDParentela
                            })
                        },
                        this.errorLoadComp
                    );
                }
            });
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
        const comp_values = boxComponentValues(this.state.Nome, this.state.Cognome, new Date(this.state.Nascita), this.state.Parentela);
        if (this.state.edit) {
            updateComponentFamily(this.props.IDFAM, this.props.ID, comp_values,
                (dt) => {
                    if (!datax.DataHandler.dataSettings.light) {
                        LoadApp.addMessage(_SuccessIcon, "Componenti", "Componente aggiornato con successo");
                    }
                    //Non conviene chiudere dentro il modale ma dal footer
                    //this.props.handleClose();
                },
                this.errorModifyComp
            );
        } else {
            addComponentFamily(this.props.IDFAM, comp_values,
                (dt) => {
                    if (!datax.DataHandler.dataSettings.light) {
                        LoadApp.addMessage(_SuccessIcon, "Componenti", "Componente creato con successo");
                    }
                    //this.props.handleClose();
                },
                this.errorCreateComp,
            );
        }
    }

    errorLoadComp = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            LoadApp.addModal(
                OkDialog("Errore caricamento dati", "Non è stato possibile scaricare i dati.", () => { }, false)
            );
        } else {
            LoadApp.addMessage(_ErrorIcon, "Componenti", "Non è stato possibile scaricare i dati.");
        }
    }

    errorCreateComp = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            LoadApp.addModal(
                OkDialog("Errore creazione componente", "Non è stato possibile creare un nuovo componente.",
                    () => {
                        this.props.handleClose();
                    }, false)
            );
        } else {
            LoadApp.addMessage(_ErrorIcon, "Componenti", "Non è stato possibile creare un nuovo componente.");
        }
    }

    errorModifyComp = (dt) => {
        if (datax.DataHandler.dataSettings.light) {
            LoadApp.addModal(
                OkDialog("Errore modifica componente", "Non è stato possibile modificare il componente.",
                    () => {
                        this.props.handleClose();
                    })
            );
        } else {
            LoadApp.addMessage(_ErrorIcon, "Componenti", "Non è stato possibile modificare il componente.");
        }
    }

    render() {
        return <>
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
        </>;
    }
}

//TODO:Volendo posso aggiungere i success_handler e migliorare gli error_handler
export const fun_CompEditorModal = (close_action, IDFAM, IDCOMP, edit = false) => {

    const dt = new DataExchange();

    LoadApp.addModal(
        generateModal(202, edit ? "Modifica Componente" : "Crea Componente", edit ? _EditIcon : _AddIcon, "Gestisci Componente",
            //handleClose={(e) => { modal_close_action(); close_action(e); }}
            (modal_close_action) => { return <CompEditorModal edit={edit} dtx={dt} IDFAM={IDFAM} ID={IDCOMP} error_handler={(dt) => { console.log(dt) }} /> },
            (modal_close_action) => {
                return <><Button variant="secondary" onClick={(e) => {
                    //prima rimuovo il modale perchè se la funzione "close_action" aggiunge un nuovo modale chiuderei quello e non questo
                    modal_close_action();
                    close_action(e);
                }}>
                    Chiudi
                </Button>
                    <Button variant="primary" onClick={(e) => {
                        //prima rimuovo il modale perchè se la funzione "close_action" aggiunge un nuovo modale chiuderei quello e non questo
                        modal_close_action();
                        dt.setData({ close: true });
                        close_action(e);
                    }}>
                        {edit ? "Applica" : "Salva"}
                    </Button></>
            }, close_action)
    );
};