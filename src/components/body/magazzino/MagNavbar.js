import React, { Component } from "react";
import { AutoMagazzinoTable, AutoProdottiTable } from "../../../contents/functions/tableGen";
//import { FamCreate, FamDelete, FamEditor, FamShower } from "./FamHandlers";
import { MagEditor } from "./MagHandlers";
import { showMag, showProds, deleteProd } from "./MagFunctions";
import { datax } from "../../../contents/data";
import backicon from "../../../resources/images/left-arrow.png";
import refreshicon from "../../../resources/images/refresh.png";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ConfirmDialog, OkDialog } from "../../../contents/functions/Dialogs";

export class MagNavbar extends Component {

    state = {
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

    renderMag = (dt) => {
        this.setState({
            body: AutoMagazzinoTable(
                this.handleShow,
                (e, idprod) => this.handleEdit(e, idprod, this.renderMag, 'all'),
                this.handleDelete,
                (e, idprod) => this.handleEdit(e, idprod, this.renderMag, 'all'),
                dt.query)
        });
    }

    renderProds = (dt) => {
        this.setState({
            body: AutoProdottiTable(
                this.handleShow,
                (e, idprod) => this.handleEdit(e, idprod, this.renderProds, 'all'),
                this.handleDelete, dt.query
            )
        });
    }

    errorReloadMag = (dt) => {
        this.setState({
            modal: OkDialog("Errore ricezione dati", "Non è stato possibile leggere il magazzino.", this.resetModal)
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

    componentDidMount() {
        /*if (datax.DataHandler.dataSettings.light) {
            showFams(this.renderDichs, this.errorReloadFams, 'dichs');
        } else {
            showFams(this.renderfams, this.errorReloadFams, 'all');
        }*/
        showMag(this.renderMag, this.errorReloadMag, 'all');
    }

    render() {
        return <>
            <Container>
                <Nav variant="pills" bg="dark" className="mt-2"
                    activeKey={this.state.key} onSelect={(selectedKey) => this.setState({ key: selectedKey })}>
                    <Nav.Item>
                        <Nav.Link href="#/" onClick={this.props.handleHome} ><img src={backicon} style={{ width: 16, height: 16 }} alt="Indietro" /> Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#/mag/add" onClick={this.handleCreate}>Registra prodotto</Nav.Link>
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
                    <Nav.Item className="ml-auto text-center">
                        <Nav.Link href="#/" onClick={() => this.componentDidMount()}><img src={refreshicon} alt="Ricarica" /> Ricarica</Nav.Link>
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
