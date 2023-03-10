import React, { Component } from "react";
import { AutoDichTable, AutoFamilyTable } from "../../../contents/functions/TableGenerators";
import { deleteFamily, getAddressAndCodiceFamilies, getAddressFamilies, getAllFamilies, getCodiceFiscaleFamilies, getDichiarantiFamilies } from '../../../contents/api/capi-family';
import { datax } from "../../../contents/data";
import { _AddIcon, _BackIcon, _ErrorIcon, _RefreshIcon } from "../../../contents/images";
import { Container, Nav, NavDropdown } from "react-bootstrap";
import { ConfirmDialog, OkDialog } from "../../../contents/functions/DialogGenerators";
import LoadApp from "../../loadApp";
import { fun_FamEditorModal, fun_FamShowerModal } from './FamModals';

export class FamNavbar extends Component {

    state = {
        body: <></>,
        key: ''
    };

    constructor(props) {
        super(props);
        this.state.key = datax.DataHandler.dataSettings.light ? '#fam/show/dichs' : '#fam/show/all';
    }

    resetModal = () => {
        this.setState({ modal: <></> });
    };

    handleEdit = (e, idfam, render, api_function) => {
        e.preventDefault();
        fun_FamEditorModal(() => {
            this.resetModal();
            this.componentDidMount();
            api_function(render, () => { });
        }, idfam);
    }

    handleShow = (e, idfam) => {
        e.preventDefault();
        fun_FamShowerModal(() => {
            this.resetModal();
        }, idfam);
    }

    handleCreate = (e) => {
        e.preventDefault();
        fun_FamEditorModal(() => {
            this.resetModal();
            this.componentDidMount();
        });
    }

    handleDelete = (e, idfam) => {
        e.preventDefault();
        LoadApp.addModal(ConfirmDialog("Eliminare Famiglia", "Vuoi davvero eliminare questa famiglia?", () => {
            deleteFamily(idfam, () => {
                this.componentDidMount();
            }, () => {
                this.setState({
                    modal: OkDialog("Errore eliminazione", "Non è stato possibile eliminare la famiglia.", this.resetModal)
                });
            });
        }, () => {
        }, () => { }));
    }

    renderfams = (dt) => {
        this.setState({
            body: AutoFamilyTable(
                this.handleShow,
                (e, idfam) => this.handleEdit(e, idfam, this.renderfams, getAllFamilies),
                this.handleDelete,
                dt.query)
        });
    }

    renderDichs = (dt) => {
        this.setState({
            body: AutoDichTable(
                this.handleShow,
                (e, idfam) => this.handleEdit(e, idfam, this.renderDichs, getDichiarantiFamilies),
                this.handleDelete, dt.query
            )
        })
            ;
    }

    errorReloadFams = (dt) => {
        LoadApp.addMessage(_ErrorIcon, "Aggiornamento dati", "Non è stato possibile leggere la lista famiglie.")
    };
    //NON RICORDO A COSA SERVE
    /*handleIdChange = (e) => {
        e.preventDefault();
        if (e.target.value === "") {
            getAllFamilies(this.renderfams, this.errorReloadFams);
            return;
        }
        showFams(this.renderfams, this.errorReloadFams, e.target.value);
    }*/

    componentDidMount() {
        if (datax.DataHandler.dataSettings.light) {
            getDichiarantiFamilies(this.renderDichs, this.errorReloadFams);
        } else {
            getAllFamilies(this.renderfams, this.errorReloadFams);
        }
    }

    render() {
        return <>
            <Container fluid>
                <Nav bg="dark" className="mt-2"
                    activeKey={this.state.key} onSelect={(selectedKey) => this.setState({ key: selectedKey })}>
                    <Nav.Item>
                        <Nav.Link href="#/" onClick={this.props.handleHome}><img src={_BackIcon} style={{ width: 16, height: 16 }} alt="Indietro" /> Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#/fam/add" onClick={this.handleCreate}><img src={_AddIcon} alt="Aggiungi famiglia" /> Aggiungi Famiglia</Nav.Link>
                    </Nav.Item>
                    {datax.DataHandler.dataSettings.light ?  //Controllo se voglio mostrare i dati in modo light o no
                        <Nav.Item>
                            <Nav.Link href="#fam/show/dichs" onClick={() => getDichiarantiFamilies(this.renderDichs, this.errorReloadFams)}>Dichiaranti</Nav.Link>
                        </Nav.Item>
                        :
                        <>
                            <NavDropdown title="Mostra famiglie" id="nav-dropdown-x">
                                <NavDropdown.Item
                                    href="#fam/show/all"
                                    onClick={() => getAllFamilies(this.renderfams, this.errorReloadFams)}>Tutte</NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#fam/show/address"
                                    onClick={() => getAddressFamilies(this.renderfams, this.errorReloadFams)}>Con Indirizzo</NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#fam/show/codice"
                                    onClick={() => getCodiceFiscaleFamilies(this.renderfams, this.errorReloadFams)}>Con Codice Fiscale</NavDropdown.Item>
                                <NavDropdown.Item
                                    href="#fam/show/both"
                                    onClick={() => getAddressAndCodiceFamilies(this.renderfams, this.errorReloadFams)}>Con Entrambi</NavDropdown.Item>
                            </NavDropdown>
                        </>
                    }
                    <Nav.Item className="ml-auto text-center">
                        <Nav.Link href="#/" onClick={() => this.componentDidMount()}><img src={_RefreshIcon} alt="Ricarica" data-bs-toggle="tooltip" title="Ricarica dati" /> Aggiorna</Nav.Link>
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
