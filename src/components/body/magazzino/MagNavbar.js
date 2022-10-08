import React, { Component } from "react";
import { AutoEntrateTable, AutoMagazzinoTable, AutoProdottiTable } from "../../../contents/functions/tableGen";
import { EntryEditor, MagEditor } from "./MagHandlers";
import { showMag, showProds, deleteProd, showEntrate, deleteEntrata } from "./MagFunctions";
import { datax } from "../../../contents/data";
import backicon from "../../../resources/images/left-arrow.png";
import refreshicon from "../../../resources/images/refresh.png";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import Collapse from "react-bootstrap/Collapse";
import Button from "react-bootstrap/Button"
import { ConfirmDialog, InputIntegerDialog, OkDialog } from "../../../contents/functions/Dialogs";

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

    handleEdit = (e, idprod, render, kurl) => {
        e.preventDefault();
        this.setState({
            modal: <MagEditor
                ID={idprod}
                handleClose={this.resetModal}
                edit={true}
                success_handler={(resp) => showProds(render, (dt) => { console.log(dt) }, kurl)}
                error_handler={this.errorReloadMag} />
        });
    }

    handleEditQuantity = (e, data) => {
        this.setState({
            modal: InputIntegerDialog("Modifica quantità", <span>Modifica la quantità presente in magazzino per il prodotto:<b> {data['Nome']}</b></span>, (value) => {
                //this.renderMag();
                alert("aggiornato a " + value);
            }, () => {

            }, this.resetModal, data['Totale'])
        });
    };

    handleShow = (e, idprod) => {
        e.preventDefault();
        this.setState({
            modal: <MagEditor
                ID={idprod}
                handleClose={this.resetModal}
                edit={false}
                success_handler={(resp) => showProds(this.renderProds, (dt) => { console.log(dt) }, 'all')}
                error_handler={this.errorReloadMag} />
        });
    }

    handleShowEntrate = (e, identr) => {
        e.preventDefault();
        this.setState({
            modal: <EntryEditor
                ID={identr}
                handleClose={this.resetModal}
                edit={false}
                success_handler={(resp) => showEntrate(this.renderEntrate, (dt) => { console.log(dt) }, 'all')}
                error_handler={this.errorReloadEntrate} />
        });
    }

    handleCreate = (e) => {
        e.preventDefault();
        this.setState({
            modal: <MagEditor
                handleClose={this.resetModal}
                edit={true}
                create={true}
                success_handler={(resp) => showProds(this.renderProds, (dt) => { console.log(dt) }, 'all')}
                error_handler={this.errorReloadMag} />
        });
    }

    handleRegisterEntrate = (e, idprod) => {
        e.preventDefault();
        this.setState({
            modal: <EntryEditor
                handleClose={this.resetModal}
                IDProdotti={idprod}
                edit={true}
                create={true}
                success_handler={(resp) => showEntrate(this.renderEntrate, (dt) => { console.log(dt) }, 'all')}
                error_handler={this.errorReloadEntrate} />
        });
    }

    handleEditEntrata = (e, identr) => {
        e.preventDefault();
        this.setState({
            modal: <EntryEditor
                ID={identr}
                handleClose={this.resetModal}
                edit={true}
                success_handler={(resp) => showEntrate(this.renderEntrate, (dt) => { console.log(dt) }, 'all')}
                error_handler={this.errorReloadMag} />
        });
    }

    handleDelete = (e, idprod) => {
        e.preventDefault();
        this.setState({
            modal: ConfirmDialog("Eliminare Prodotto", "Vuoi davvero eliminare questo prodotto?", () => {
                deleteProd(() => {
                    this.componentDidMount();
                }, () => {
                    this.setState({
                        modal: OkDialog("Errore eliminazione", "Non è stato possibile eliminare il prodotto.", this.resetModal)
                    });
                }, { id_prod: idprod });
            }, () => {

            }, this.resetModal)
        });
    }

    handleDeleteEntrata = (e, identr) => {
        e.preventDefault();
        this.setState({
            modal: ConfirmDialog("Eliminare Entrata", "Vuoi davvero eliminare questa entrata?\nI valori in magazzini saranno modificaiti di conseguenza.", () => {
                deleteEntrata(() => {
                    this.componentDidMount();
                }, () => {
                    this.setState({
                        modal: OkDialog("Errore eliminazione", "Non è stato possibile eliminare l'entrata.", this.resetModal)
                    });
                }, { identr: identr });
            }, () => {

            }, this.resetModal)
        });
    }

    renderMag = (dt) => {
        this.current_render = () => {
            showMag(this.renderMag, this.errorReloadMag, 'all');
        }
        this.setState({
            body: AutoMagazzinoTable(
                this.handleShow,
                (e, idprod) => this.handleEdit(e, idprod, this.renderMag, 'all'),
                this.handleDelete,
                (e, prod) => this.handleEditQuantity(e, prod, this.renderMag),
                this.handleRegisterEntrate,
                dt.query)
        });
    }

    renderProds = (dt) => {
        this.current_render = () => {
            showProds(this.renderProds, this.errorReloadMag, 'all');
        }
        this.setState({
            body: AutoProdottiTable(
                this.handleShow,
                (e, idprod) => this.handleEdit(e, idprod, this.renderProds, 'all'),
                this.handleDelete, dt.query
            )
        });
    }

    renderEntrate = (dt) => {
        this.current_render = () => {
            showEntrate(this.renderEntrate, this.errorReloadEntrate, 'all');
        }
        this.setState({
            body: AutoEntrateTable(
                this.handleShowEntrate,
                this.handleEditEntrata,
                this.handleDeleteEntrata,
                dt.query
                /*(e, idprod) => this.handleEdit(e, idprod, this.renderProds, 'all'),
                this.handleDelete, dt.query*/
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

    handleIdChange = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            showMag(this.renderMag, this.errorReloadMag, 'all');
            return;
        }
        showMag(this.renderMag, this.errorReloadMag, e.target.value);
    }

    current_render = () => {
        showMag(this.renderMag, this.errorReloadMag, 'all');
    }

    componentDidMount() {
        /*if (datax.DataHandler.dataSettings.light) {
            showFams(this.renderDichs, this.errorReloadFams, 'dichs');
        } else {
            showFams(this.renderfams, this.errorReloadFams, 'all');
        }*/
        this.current_render();
    }

    render() {
        return <>
            <Container>
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
                                    <Nav.Link href="#mag/show/" onClick={() => showMag(this.renderMag, this.errorReloadMag, 'all')}>Prodotti</Nav.Link>
                                </Nav.Item>
                                :
                                <>
                                    <NavDropdown title="Mostra Magazzino" id="nav-dropdown-x">
                                        <NavDropdown.Item
                                            href="#mag/show/all"
                                            onClick={() => showMag(this.renderMag, this.errorReloadMag, 'all')}>Tutti</NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="#mag/prod/all"
                                            onClick={() => showProds(this.renderProds, this.errorReloadMag, 'all')}>Prodotti</NavDropdown.Item>
                                    </NavDropdown>
                                </>
                            }
                            {datax.DataHandler.dataSettings.light ?  //Controllo se voglio mostrare i dati in modo light o no
                                <Nav.Item>
                                    <Nav.Link href="#mag/entr/" onClick={() => showEntrate(this.renderEntrate, this.errorReloadEntrate, 'all')}>Entrate</Nav.Link>
                                </Nav.Item>
                                :
                                <>
                                    <NavDropdown title="Mostra Entrate" id="nav-dropdown-x">
                                        <NavDropdown.Item
                                            href="#mag/entr/all"
                                            onClick={() => showEntrate(this.renderEntrate, this.errorReloadEntrate, 'all')}>Tutte</NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="#mag/entr/from"
                                            onClick={() => showProds(this.renderEntrate, this.errorReloadEntrate, 'from/')}>Dal Dontatore</NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="#mag/entr/after"
                                            onClick={() => showProds(this.renderEntrate, this.errorReloadEntrate, 'after/')}>Dopo il</NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="#mag/entr/before"
                                            onClick={() => showProds(this.renderEntrate, this.errorReloadEntrate, 'before/')}>Prima del</NavDropdown.Item>
                                        <NavDropdown.Item
                                            href="#mag/entr/prod"
                                            onClick={() => showProds(this.renderEntrate, this.errorReloadEntrate, 'prod/')}>Solo Prodotto</NavDropdown.Item>
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
                <Container>
                    {this.state.body}
                    {this.state.modal}
                </Container>
            </Container>
        </>;
    }
}
