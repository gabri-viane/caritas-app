import React, { Component } from "react";
import LoadApp from "../../loadApp";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import ListGroup from "react-bootstrap/ListGroup";
import { addBorsa, addElementiBorsa, boxBorsaValues, boxElementoBorsaValues, getElementiBorsa, getInformazioniBorsa, updateBorsa } from "../../../contents/api/capi-borse";
import { getAvailablesMagazzino } from "../../../contents/api/capi-magazzino";
import { getDichiarantiFamilies } from "../../../contents/api/capi-family";
import { datax } from "../../../contents/data";
import generateModal from "../../../contents/functions/ModalGenerators";
import DataExchange from "../../../contents/DataExchange";
import { _AddIcon, _EditIcon, _ErrorIcon, _ShowIcon, _SuccessIcon, _WarningIcon } from "../../../contents/images";

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
        if (!(this.state.IDFAM != null || this.state.IDFAM > -1 || this.state.Consegna != null)) {
            return;
        }
        const bor_values = boxBorsaValues(this.state.IDFAM, new Date(this.state.Consegna), this.state.Note, this.state.Consegnata);
        if (this.state.edit && !this.state.create) {
            updateBorsa(this.state.ID, bor_values,
                (dt) => {
                    LoadApp.addMessage(_SuccessIcon, "Borse", "Borsa modificata con successo");
                },
                this.props.error_handler
            );
        } else if (this.state.create) {
            addBorsa(bor_values,
                (dt) => {
                    LoadApp.addMessage(_SuccessIcon, "Borse", "Borsa aggiunta con successo");
                },
                (dt) => {
                    console.log(dt);
                    this.props.error_handler();
                }
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
                                <Form.Check className="mt-1" autoComplete="off" autoCorrect="off"
                                    label="Consegnata"
                                    checked={this.state.Consegnata} onChange={this.handleConsegnataChange} disabled={!this.state.editable} />
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
    const create = ID === null;

    LoadApp.addModal(
        generateModal(300, edit ? (create ? "Crea Borsa" : "Modifica Borsa") : "Mostra Borsa",
            edit ? (create ? _AddIcon : _EditIcon) : _ShowIcon, "Gestione Borsa",
            //handleClose={(e) => { modal_close_action(); close_action(e); }}    
            (modal_close_action) => {
                return <BagEditorModal dtx={dt} edit={edit} ID={ID} success_handler={success_handler ? success_handler : undefined}
                    error_handler={error_handler ? error_handler : (dt_) => { console.log(dt_) }} />
            },
            (modal_close_action) => {
                return <>
                    {create ?
                        <></> :
                        <Button variant="light" onClick={(e) => {
                            fun_BorElementsEditorModal(() => { }, edit, ID, () => { }, () => { });
                        }}>
                            Elementi
                        </Button>}
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
                            {create ? 'Crea borsa' : 'Salva modifiche'}
                        </Button>
                        : <></>}
                </>
            }, close_action)
    );
};

class ElementoProdotto extends Component {

    state = {
        IDProdotti: -1,
        Nome: 'Unknown',
        Totale: 1,
        selected: false,
        editable: true
    };

    constructor(props) {
        super(props);
        this.state.Nome = props.Nome;
        this.state.IDProdotti = props.IDProdotti;
        this.state.Totale = props.Totale || 1;
        this.state.selected = props.Selected || false;
        this.state.editable = props.editable || false;
    }

    setSelected = (value) => {
        if (this.props.onSelectionEvent) {
            this.props.onSelectionEvent(this.state.IDProdotti, this.state.Nome, value);
        }
        this.setState({ selected: value, Totale: 1 });
    }

    onSelectionChange = (e) => {
        this.setSelected(!this.state.selected);
    };

    onInputChange = (e) => {
        const new_val = e.target.value;
        if (new_val < 1 && new_val !== '') {
            this.setSelected(false);
        } else {
            if (this.props.onValueEvent) {
                this.props.onValueEvent(this.state.IDProdotti, new_val);
            }
            this.setState({ Totale: e.target.value });
        }
    }

    render() {
        return <>
            <Card style={{ maxWidth: "400px", boxShadow: "10px 10px 5px lightblue" }}>
                <Card.Header>
                    <Form.Group className="mb-2" controlId={"form_sel_prod_" + this.state.IDProdotti}>
                        <Form.Check checked={this.state.selected} disabled={!this.state.editable} onChange={this.onSelectionChange} label={this.state.Nome} />
                    </Form.Group>
                </Card.Header>
                {this.state.selected ?
                    <Card.Body>
                        <Form.Group controlId={"form_qnt_prod_" + this.state.IDProdotti}>
                            <FloatingLabel label="Quantità">
                                <Form.Control type="number" value={this.state.Totale} disabled={!this.state.editable} onChange={this.onInputChange} />
                            </FloatingLabel>
                        </Form.Group>
                    </Card.Body>
                    : <></>}
            </Card>
        </>
    }
};

export class ContenitoreElementi extends Component {

    state = {
        ID: -1,
        dtx: null,
        create: true,

        editable: false,

        show_res: false,

        query_prods: [],
        filtered: [],
        old_filter: [],//Tiene memoria del filtraggio

        IDs_selection: [],//Lista di IDs di prodotti selezionati
        prodotti: [],//Lista di tutti i prodotti
        show_selection: false
    };

    constructor(props) {
        super(props);
        this.state.editable = props.edit;
        this.state.dtx = props.dtx;
        if (props.ID) {
            this.state.ID = props.ID;
        }
        this.state.dtx.subscribeFunctions(() => {
            this.handleSubmit();
        })
    }

    handleSubmit = () => {
        //TODO: conferma le selezioni
        const vals = [];
        this.state.IDs_selection.forEach((id) => {
            const val = this.state.prodotti[id];
            vals[vals.length] = boxElementoBorsaValues(val.IDProdotti, val.Totale, val.edit, true);
        });
        const remove = this.state.prodotti.filter((prod)=>{
            return prod.edit && prod.Totale === 0;
        });
        remove.forEach((prd)=>{
            vals[vals.length] = boxElementoBorsaValues(prd.IDProdotti, 0, true, true);
        });
        if (vals.length > 0) {
            addElementiBorsa(this.state.ID, vals, (dt) => {
                LoadApp.addMessage(_SuccessIcon, "Elementi Borse", "Gli elementi sono stati aggiornati");
            }, (dt) => {
                LoadApp.addMessage(_WarningIcon, "Elementi Borse", "Uno o più elementi non sono stati aggiunti");
             });
        }
    }

    componentDidMount() {
        getAvailablesMagazzino((dt) => {
            const prodotti = [];
            dt.query.forEach((prod) => {
                prodotti[prod.IDProdotti] = { IDProdotti: prod.IDProdotti, Nome: prod.Nome, Totale: prod.Totale, edit: false };
            });

            if (this.state.ID > -1) {
                //TODO: Devo capire come mi arrivano i dati dal database
                //di una borsa già create. Devo prendere gli elementi e ricaricarli
                //nell'array this.state.selected con le relative quantità, nome e IDProdotti

                //this.loaded_selection;
                getElementiBorsa(this.state.ID, (dt2) => {
                    const id_pre_caricati = [];
                    dt2.query.forEach(element => {
                        prodotti[element.IDProdotti].edit = true;
                        prodotti[element.IDProdotti].Totale = element.Totale;
                        id_pre_caricati.push(element.IDProdotti);
                    });
                    this.setState({
                        prodotti: prodotti,
                        IDs_selection: id_pre_caricati,

                        query_prods: dt.query,
                        filtered: prodotti
                    });
                }, (dt2) => {
                    LoadApp.addMessage(_ErrorIcon, "Borse", "Impossibile caricare elementi borse");
                });
            } else {
                this.setState({
                    prodotti: prodotti,
                    query_prods: dt.query,
                    filtered: dt.query
                });
            }
        }, (dt) => { console.log("Error"); console.log(dt) });
    }

    /**
     * Genera N colonne definite dalle impostazioni
     * @param {*} data 
     * @returns 
     */
    /*transformToColumn(data) {
        const cols = datax.DataHandler.dataSettings.cols || 4;
        const cls = [];
        for (let i = 0; i < cols; i++) {
            const rows = Math.ceil(data.length / cols);
            const r = data.slice(i * rows, i * rows + rows);
            cls[i] = <>
                {
                    r.map((item, index) => {
                        const selected = this.state.IDs_selection.includes(item.IDProdotti);
                        return <Container className="mt-2" key={item.IDProdotti}>
                            <ElementoProdotto Nome={item.Nome} IDProdotti={item.IDProdotti} Selected={selected}
                                Totale={selected ? item.Totale : 1}
                                onSelectionEvent={this.onSelected} onValueEvent={this.onValueChange} editable={this.state.editable} />
                        </Container>
                    })
                }</>
        }
        return <Row>{cls.map((val, index) => {
            return <Col xs key={index}>{val}</Col>;
        })}</Row>
    };*/

    transformToColumnSecond(data) {
        const cols = datax.DataHandler.dataSettings.cols || 4;
        return <Row>{data.map((item) => {
            const selected = this.state.IDs_selection.includes(item.IDProdotti);
            return <Col sm={Math.ceil(12 / cols)} className="mt-2" key={item.IDProdotti}>
                <ElementoProdotto Nome={item.Nome} IDProdotti={item.IDProdotti} Selected={selected}
                    Totale={selected ? item.Totale : 1}
                    onSelectionEvent={this.onSelected} onValueEvent={this.onValueChange} editable={this.state.editable} />
            </Col>
        })}</Row>
    };

    /**
     * Non divide per colonne, ma genera una colonna per ogni elemento
     * @param {*} data 
     * @returns 
     */
    showSelection = () => {
        return <Row> {
            this.state.IDs_selection.map((id_prod) => {
                const item = this.state.prodotti[id_prod];
                return <Col sm className="mt-2" key={item.IDProdotti}>
                    <ElementoProdotto Nome={item.Nome} IDProdotti={item.IDProdotti} Selected={true}
                        Totale={item.Totale}
                        onSelectionEvent={this.onSelected} onValueEvent={this.onValueChange} editable={this.state.editable} />
                </Col>;
            })
        } </Row>
    };

    onSelected = (id, name, value) => {
        const tmp_prod = this.state.prodotti;
        const tmp_sel = this.state.IDs_selection;
        if (value) {//Selezionato
            tmp_prod[id].Totale = 1;//Imposta la quantità del prodotto a 1
            tmp_sel.push(id);//Aggiungi l'ID del prodotto all'elenco dei selezionati
        } else {//Deselezionato
            const index = this.state.IDs_selection.findIndex((val) => { return val === id });
            if (index > -1) {
                tmp_sel.splice(index, 1);
                tmp_prod[id].Totale = 0;
            }
        }
        this.setState({ prodotti: tmp_prod, IDs_selection: tmp_sel });
    }

    onValueChange = (id, value) => {
        const tmp_prod = this.state.prodotti;
        tmp_prod[id].Totale = value;
        this.setState({ prodotti: tmp_prod });
    }

    filter = (e) => {
        const search = "".concat(e.target.value).trim().toLowerCase();
        if (search.length > 0) {
            const filtered = this.state.prodotti.filter((val) => {
                return ("" + val.Nome).toLowerCase().includes(search);
            });
            this.setState({ filtered: filtered });
        } else {
            this.setState({ filtered: this.state.prodotti });
        }
    };

    filter_selection = () => {
        if (!this.state.show_selection) {
            const prods = this.state.filtered.filter((val) => {
                return this.state.IDs_selection.includes(val.IDProdotti);
            });
            this.setState({
                show_selection: !this.state.show_selection,
                old_filter: this.state.filtered,
                filtered: prods
            });
        }else{
            this.setState({
                show_selection: !this.state.show_selection,
                filtered: this.state.old_filter,
                old_filter: []
            });
        }
    }

    render() {
        return <>
            <Container fluid>
                <Row>
                    <Container md="auto" className="mt-1" fluid>
                        <Row md="auto">
                            <Col md="auto">
                                <Button onClick={() => { this.setState({ show_res: !this.state.show_res }) }}>
                                    {this.state.show_res ? 'Nascondi risultato' : 'Mostra risultato'}
                                </Button>
                            </Col>
                            <Col md="auto">
                                <Form.Control type="search" placeholder="Filtra" onChange={this.filter} />
                            </Col>
                            <Col md="auto">
                                <Form.Check type="switch" label="Solo sekezionati" checked={this.state.show_selection} onChange={this.filter_selection} />
                            </Col>
                        </Row>
                    </Container>
                </Row>
                <Collapse in={this.state.show_res}>
                    <Row className="mt-2">
                        <Col style={{ maxWidth: '30vw' }}>
                            <ListGroup>
                                {
                                    this.state.IDs_selection.map((id_prod, index) => {
                                        return <ListGroup.Item key={index}>
                                            <span className="primary">{this.state.prodotti[id_prod].Totale}
                                                {'   '}
                                            </span><span>{this.state.prodotti[id_prod].Nome}</span>
                                        </ListGroup.Item>
                                    })
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </Collapse>
                {!this.state.show_res ?
                    <Row className="overflow-auto">
                        <Container fluid >
                            {this.state.editable ? this.transformToColumnSecond(this.state.filtered) : this.showSelection()}
                        </Container>
                    </Row>
                    : <></>
                }
            </Container>
        </>
    }

};

class BagElementsEditorModal extends Component {

    state = {
        dtx0: null,
        dtx: null,
        elems_query: [],

        create: false,
        edit: false,
        ID: -1//IDBorsa
    }

    constructor(props) {
        super(props);
        this.state.dtx0 = new DataExchange();
        this.state.dtx = props.dtx;
        this.state.ID = props.ID;
        this.state.edit = props.edit;
        this.state.create = props.create;
        props.dtx.subscribeFunctions((data) => {
            this.state.dtx0.setData({ closed: true });
        });
    }

    render() {
        return <>
            <div className="overflow-auto" style={{ maxHeight: '65vh' }}>
                <ContenitoreElementi ID={this.state.ID} edit={this.state.edit} dtx={this.state.dtx0} success_handler={this.success_handler} />
            </div>
        </>;
    }

};

export const fun_BorElementsEditorModal = (close_action, edit = false, ID = null, success_handler, error_handler) => {
    const dt = new DataExchange();
    const create = ID == null;

    LoadApp.addModal(
        generateModal(301, edit ? (create ? "Assegna Elementi Borsa" : "Modifica Elementi Borsa") : "Mostra Elementi Borsa",
            edit ? (create ? _AddIcon : _EditIcon) : _ShowIcon, "Gestione Elementi Borsa",
            //handleClose={(e) => { modal_close_action(); close_action(e); }}    
            (modal_close_action) => {
                return <BagElementsEditorModal dtx={dt} edit={edit} ID={ID} success_handler={success_handler ? success_handler : undefined}
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
                            {create ? 'Salva elementi borsa' : 'Salva modifiche'}
                        </Button>
                        : <></>}
                </>
            }, close_action, 'xl')
    );
}