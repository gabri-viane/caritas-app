import React, { Component } from "react";
import LoadApp from "../../loadApp";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { addBorsa, boxBorsaValues, getInformazioniBorsa, updateBorsa } from "../../../contents/api/capi-borse";
import { getDichiarantiFamilies } from "../../../contents/api/capi-family";
import { datax } from "../../../contents/data";
import generateModal from "../../../contents/functions/ModalGenerators";
import DataExchange from "../../../contents/DataExchange";
import { _AddIcon, _EditIcon, _ErrorIcon, _ShowIcon, _SuccessIcon } from "../../../contents/images";

class BagEditorModal extends Component {

    state = {
        dtx: null,
        fam_query: [],

        create: false,
        editable: false,
        edit: false,
        ID: -1,//IDBorsa

        IDFAM: -1,
        Consegna: new Date().toISOString().substring(0, 10),
        Note: '',
        Consegnata: false
    }

    constructor(props) {
        super(props);
        this.state.dtx = props.dtx;
        this.state.IDFAM = props.IDFAM ? props.IDFAM : -1;
        this.state.ID = props.ID;
        this.state.create = props.ID == null;
        this.state.edit = props.edit;
        this.state.editable = props.edit || this.state.create;
        props.dtx.subscribeFunctions(() => {
            this.handleSubmit();
        })
    }

    componentDidMount() {
        getDichiarantiFamilies((dt) => {
            if (this.state.create) {
                this.setState({ fam_query: dt.query, IDFAM: dt.query[0]['IDFAM'] });
            } else {
                this.setState({ fam_query: dt.query });
            }
        }, (err) => {
            console.log(err);
        });
        if (!this.state.create) {
            getInformazioniBorsa(this.state.ID, (dt) => {
                this.setState({
                    IDFAM: dt.query[0].IDFAM,
                    Consegna: new Date(dt.query[0].DataConsegna).toDateInputValue(),
                    Note: dt.query[0].Note,
                    Consegnata: dt.query[0].Consegnata
                })
            }, (dt) => {
                if (!datax.DataHandler.dataSettings.light) {
                    LoadApp.addMessage(_ErrorIcon, "Visualizzatore Borse", "Impossibile caricare i dati");
                }
            });
        }
    }

    handleDateChange = (e) => {
        e.preventDefault();
        this.setState({ Consegna: e.target.value });
    }

    handleFamigliaChange = (e) => {
        e.preventDefault();
        this.setState({ IDFAM: e.target.value });
    }

    handleConsegnataChange = (e) => {
        this.setState({ Consegnata: !this.state.Consegnata });
    }

    handleSubmit = (e) => {
        if (e) {
            e.preventDefault();
        }
        const bor_values = boxBorsaValues(this.state.IDFAM, new Date(this.state.Consegna), this.state.Note, this.state.Consegnata);
        if (this.state.edit) {
            updateBorsa(this.state.ID, bor_values,
                (dt) => {
                    if (!datax.DataHandler.dataSettings.light) {
                        LoadApp.addMessage(_SuccessIcon, "Borse", "Borsa modificata con successo");
                    }
                    //Non conviene chiudere dentro il modale ma dal footer
                    //this.props.handleClose();
                },
                this.props.error_handler
            );
        } else if (this.state.create) {
            addBorsa(bor_values,
                (dt) => {
                    if (!datax.DataHandler.dataSettings.light) {
                        LoadApp.addMessage(_SuccessIcon, "Borse", "Borsa aggiunta con successo");
                    }
                    //this.props.handleClose();
                },
                this.props.error_handler
            );
        }
        //Altrimenti la sto solamente visualizzando
    }

    render() {
        return <>
            <Container>
                <Form>
                    <Form.Group className="mb-3 mt-3" controlId="bagdata">
                        <FloatingLabel controlId="floatingFamiglia" label="Famiglia" className="mt-1">
                            <Form.Select aria-label="Famiglia" value={this.state.IDFAM} onChange={this.handleFamigliaChange} disabled={!this.state.editable}>
                                {this.state.fam_query.map((row, index) => {
                                    return <option key={index} value={row['IDFAM']}>{row['IDFAM'] + ' - ' + row['Dichiarante']}</option>
                                })}
                            </Form.Select>
                        </FloatingLabel>
                        <FloatingLabel controlId="floatingConsegna" label="Data di consegna" className="mt-1">
                            <Form.Control type="date" autoComplete="off" autoCorrect="off" value={this.state.Consegna} onChange={this.handleDateChange} disabled={!this.state.editable} />
                        </FloatingLabel>
                        {
                            !this.state.create ?
                                <Form.Check className="mt-1" autoComplete="off" autoCorrect="off" checked={this.state.Consegnata} onChange={this.handleConsegnataChange} disabled={!this.state.editable} />
                                : <></>
                        }
                    </Form.Group>
                </Form>
            </Container>
        </>;
    }

}

export const fun_BorEditorModal = (close_action, edit = false, ID = null, success_handler, error_handler) => {

    const dt = new DataExchange();
    const create = ID == null;

    LoadApp.addModal(
        generateModal(300, edit ? (create ? "Crea Borsa" : "Modifica Borsa") : "Mostra Borsa",
            edit ? (create ? _AddIcon : _EditIcon) : _ShowIcon, "Gestione Borsa",
            //handleClose={(e) => { modal_close_action(); close_action(e); }}    
            (modal_close_action) => {
                return <BagEditorModal dtx={dt} edit={edit} ID={ID} success_handler={success_handler ? success_handler : undefined}
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
                            {create ? 'Salva borsa' : 'Salva modifiche'}
                        </Button>
                        : <></>}
                </>
            }, close_action)
    );
};