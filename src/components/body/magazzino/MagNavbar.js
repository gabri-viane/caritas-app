import React, { Component } from "react";
import { AutoEntrateTable, AutoMagazzinoTable, AutoProdottiTable, AutoModificheTable } from "../../../contents/functions/TableGenerators";
import { deleteEntrataMagazzino, deleteProdottoMagazzino, getAfterEntrateMagazzino, getAllEntrateMagazzino, getAllMagazzino, getAllModificheMagazzino, getAllProdottiMagazzino, getBeforeEntrateMagazzino, getFromEntrateMagazzino, getProdottoEntrateMagazzino } from '../../../contents/api/capi-magazzino';
import { datax } from "../../../contents/data";
import backicon from "../../../resources/images/left-arrow.png";
import refreshicon from "../../../resources/images/refresh.png";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button"
import { ConfirmDialog, InputIntegerDialog, OkDialog } from "../../../contents/functions/DialogGenerators";
import { fun_EntryEditorModal, fun_MagEditorModal, fun_ModificheEditorModal } from "./MagModals";
import LoadApp from "../../loadApp";

export class MagNavbar extends Component {

    state = {
        open: true,
        body: <></>,
        modal: <></>,
        key: ''
    };

    constructor(props) {
        super(props);
        this.state.key = datax.DataHandler.dataSettings.light ? '#mag/show/' : '#fam/show/prods';
    }

    resetModal = () => {
        this.setState({ modal: <></> });
    };

    handleEdit = (e, idprod, render) => {
        e.preventDefault();
        fun_MagEditorModal(this.resetModal, true, idprod, (resp) => getAllProdottiMagazzino(render, (dt) => { console.log(dt) }), this.errorReloadMag);
        /*this.setState({
            modal: <MagEditor
                ID={idprod}
                handleClose={this.resetModal}
                edit={true}
                success_handler={(resp) => getAllProdottiMagazzino(render, (dt) => { console.log(dt) })}
                error_handler={this.errorReloadMag} />
        });*/
    }

    handleShow = (e, idprod) => {
        e.preventDefault();
        fun_MagEditorModal(this.resetModal, false, idprod, (resp) => getAllProdottiMagazzino(this.renderProds, (dt) => { console.log(dt) }), this.errorReloadMag);
    }

    handleShowEntrate = (e, identr) => {
        e.preventDefault();
        fun_EntryEditorModal(this.resetModal, false, identr, null, null,
            (resp) => getAllProdottiMagazzino(this.renderEntrate, (dt) => { console.log(dt) }), this.errorReloadEntrate);
    }

    handleShowModifca = (e, idmod) => {
        e.preventDefault();
        fun_ModificheEditorModal(this.resetModal, false, idmod, null, null, (resp) => getAllModificheMagazzino(this.renderModficihe, (dt) => { console.log(dt) }), this.errorReloadModifiche);
    }

    handleCreate = (e) => {
        e.preventDefault();
        fun_MagEditorModal(this.resetModal, true, null, (resp) => getAllProdottiMagazzino(this.renderProds, (dt) => { console.log(dt) }), this.errorReloadMag);
    }

    handleRegisterEntrate = (e, prod) => {
        e.preventDefault();
        fun_EntryEditorModal(this.resetModal, true, null, prod ? prod.IDProdotto : null, null,
            (resp) => getAllProdottiMagazzino(this.renderEntrate, (dt) => { console.log(dt) }), this.errorReloadEntrate);
    };

    handleEditEntrata = (e, identr) => {
        e.preventDefault();
        fun_EntryEditorModal(this.resetModal, true, identr, null, null, (resp) => getAllEntrateMagazzino(this.renderEntrate, (dt) => { console.log(dt) }), this.errorReloadEntrate);
    }

    handleEditQuantity = (e, modifica) => {
        e.preventDefault();
        fun_ModificheEditorModal(this.resetModal, false, null, modifica.ID, null, (resp) => getAllMagazzino(this.renderMag, (dt) => { console.log(dt) }), this.errorReloadMag);
    };

    handleDelete = (e, idprod) => {
        e.preventDefault();
        LoadApp.addModal(
            ConfirmDialog("Eliminare Prodotto", "Vuoi davvero eliminare questo prodotto?", () => {
                deleteProdottoMagazzino(idprod, () => {
                    this.componentDidMount();
                }, () => {
                    LoadApp.addModal(OkDialog("Errore eliminazione", "Non è stato possibile eliminare il prodotto.", this.resetModal));
                });
            }, () => {

            }, this.resetModal)
        );
    }

    handleDeleteEntrata = (e, identr) => {
        e.preventDefault();
        LoadApp.addModal(
            ConfirmDialog("Eliminare Entrata", "Vuoi davvero eliminare questa entrata?\nI valori in magazzini saranno modificaiti di conseguenza.", () => {
                deleteEntrataMagazzino(identr, () => {
                    this.componentDidMount();
                }, () => {
                    LoadApp.addModal(OkDialog("Errore eliminazione", "Non è stato possibile eliminare l'entrata.", this.resetModal));
                });
            }, () => {

            }, this.resetModal)
        );
    }

    renderMag = (dt) => {
        this.current_render = () => {
            getAllMagazzino(this.renderMag, this.errorReloadMag);
        }
        this.setState({
            body: AutoMagazzinoTable(
                this.handleShow,
                (e, idprod) => this.handleEdit(e, idprod, this.renderMag),
                this.handleDelete,
                this.handleEditQuantity,
                this.handleRegisterEntrate,
                dt.query)
        });
    }

    renderProds = (dt) => {
        this.current_render = () => {
            getAllProdottiMagazzino(this.renderProds, this.errorReloadMag);
        }
        this.setState({
            body: AutoProdottiTable(
                this.handleShow,
                (e, idprod) => this.handleEdit(e, idprod, this.renderProds),
                this.handleDelete, dt.query
            )
        });
    }

    renderEntrate = (dt) => {
        this.current_render = () => {
            getAllEntrateMagazzino(this.renderEntrate, this.errorReloadEntrate);
        }
        this.setState({
            body: AutoEntrateTable(
                this.handleShowEntrate,
                this.handleEditEntrata,
                this.handleDeleteEntrata,
                dt.query
            )
        });
    }

    renderModficihe = (dt) => {
        this.current_render = () => {
            getAllModificheMagazzino(this.renderModficihe, this.errorReloadModifiche);
        }
        this.setState({
            body: AutoModificheTable(
                this.handleShowModifca,
                null,//this.handleEditEntrata,
                null,//this.handleDeleteEntrata,
                dt.query
            )
        });
    }

    errorReloadMag = (dt) => {
        this.setState({
            modal: OkDialog("Errore ricezione dati", "Non è stato possibile leggere il magazzino.", this.resetModal)
        });
    };

    errorReloadEntrate = (dt) => {
        this.setState({
            modal: OkDialog("Errore ricezione dati", "Non è stato possibile leggere il registro entrate.", this.resetModal)
        });
    };

    errorReloadModifiche = (dt) => {
        this.setState({
            modal: OkDialog("Errore ricezione dati", "Non è stato possibile leggere il registro delle modifiche al magazzino.", this.resetModal)
        });
    }
    //NON MI RICORDO A COSA SERVE
    /*handleIdChange = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            getAllMagazzino(this.renderMag, this.errorReloadMag);
            return;
        }
        showMag(this.renderMag, this.errorReloadMag, e.target.value);
    }*/

    current_render = () => {
        getAllMagazzino(this.renderMag, this.errorReloadMag);
    };

    componentDidMount() {
        this.current_render();
    }

    render() {
        return <>
            <Container fluid>
                <Nav bg="dark" className="mt-2"
                    activeKey={this.state.key} onSelect={(selectedKey) => this.setState({ key: selectedKey })}>
                    <Nav.Item>
                        <Nav.Link href="#/" onClick={this.props.handleHome} ><img src={backicon} style={{ width: 16, height: 16 }} alt="Indietro" /> Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Button onClick={() => this.setState({ open: !this.state.open })}
                            aria-controls="collapse-nav-content"
                            aria-expanded={this.state.open}>
                            {this.state.open ? 'Chiudi <' : 'Apri >'}</Button>
                    </Nav.Item>
                    <Collapse in={this.state.open}>
                        <Nav id="collapse-nav-content">
                            <Nav.Item>
                                <Nav.Link href="#/mag/add" onClick={this.handleCreate}>Registra Prodotto</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link href="#/mag/reg" onClick={this.handleRegisterEntrate}>Registra Entrata</Nav.Link>
                            </Nav.Item>
                            {datax.DataHandler.dataSettings.light ?  //Controllo se voglio mostrare i dati in modo light o no
                                <Nav.Item>
                                    <Nav.Link href="#mag/show/" onClick={() => getAllMagazzino(this.renderMag, this.errorReloadMag)}>Prodotti</Nav.Link>
                                </Nav.Item>
                                :
                                <>
                                    <NavDropdown title="Mostra Magazzino" id="nav-dropdown-x">
                                        <NavDropdown.Item
                                            href="#mag/show/all"
                                            onClick={() => getAllMagazzino(this.renderMag, this.errorReloadMag)}>Tutti</NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="#mag/prod/all"
                                            onClick={() => getAllProdottiMagazzino(this.renderProds, this.errorReloadMag)}>Prodotti</NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="#mag/edit/all"
                                            onClick={() => getAllModificheMagazzino(this.renderModficihe, this.errorReloadModifiche)}>Modifiche</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            }
                            {datax.DataHandler.dataSettings.light ?  //Controllo se voglio mostrare i dati in modo light o no
                                <Nav.Item>
                                    <Nav.Link href="#mag/entr/" onClick={() => getAllEntrateMagazzino(this.renderEntrate, this.errorReloadEntrate)}>Entrate</Nav.Link>
                                </Nav.Item>
                                :
                                <>
                                    <NavDropdown title="Mostra Entrate" id="nav-dropdown-x">
                                        <NavDropdown.Item
                                            href="#mag/entr/all"
                                            onClick={() => getAllEntrateMagazzino(this.renderEntrate, this.errorReloadEntrate)}>Tutte</NavDropdown.Item>
                                        {/*TODO: Devo modificare i -1 con le rispettive scelte: per i donatori, e per le date after e before , e per il prodotto */}
                                        <NavDropdown.Item
                                            href="#mag/entr/from"
                                            onClick={() => {
                                                LoadApp.addModal(InputIntegerDialog("Cerca per donatore", "Inserisci ID donatore", (value) => {
                                                    getFromEntrateMagazzino(value, this.renderEntrate, this.errorReloadEntrate)
                                                }, () => { }, () => { }));
                                            }}>Dal Dontatore</NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="#mag/entr/after"
                                            onClick={() => getAfterEntrateMagazzino(-1, this.renderEntrate, this.errorReloadEntrate)}>Dopo il</NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="#mag/entr/before"
                                            onClick={() => getBeforeEntrateMagazzino(-1, this.renderEntrate, this.errorReloadEntrate)}>Prima del</NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="#mag/entr/prod"
                                            onClick={() => getProdottoEntrateMagazzino(-1, this.renderEntrate, this.errorReloadEntrate)}>Solo Prodotto</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            }
                        </Nav>
                    </Collapse>
                    <Nav.Item className="ml-auto text-center">
                        <Nav.Link href="#/" onClick={() => this.componentDidMount()}><img src={refreshicon} alt="Ricarica" data-bs-toggle="tooltip" title="Ricarica dati" /></Nav.Link>
                    </Nav.Item>
                </Nav>
                <hr />
                <Container fluid>
                    {this.state.body}
                </Container>
            </Container>
        </>;
    }
}
