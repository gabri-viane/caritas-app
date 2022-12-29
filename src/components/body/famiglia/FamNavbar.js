import React, { Component } from "react";
import { AutoDichTable, AutoFamilyTable } from "../../../contents/functions/tableGen";
import { FamCreate, FamEditor, FamShower } from "./FamHandlers";
import { deleteFamily, getAddressAndCodiceFamilies, getAddressFamilies, getAllFamilies, getCodiceFiscaleFamilies, getDichiarantiFamilies } from '../../../contents/api/capi-family';
import { datax } from "../../../contents/data";
import backicon from "../../../resources/images/left-arrow.png";
import refreshicon from "../../../resources/images/refresh.png";
import erroricon from "../../../resources/images/error.png";
import Container from "react-bootstrap/esm/Container";
import Nav from "react-bootstrap/esm/Nav";
import NavDropdown from "react-bootstrap/NavDropdown";
import { ConfirmDialog, OkDialog } from "../../../contents/functions/Dialogs";
import LoadApp from "../../loadApp";

export class FamNavbar extends Component {

    state = {
        body: <></>,
        modal: <></>,
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
        this.setState({
            modal: <FamEditor
                IDFAM={idfam}
                handleClose={this.resetModal}
                edit={true}
                success_handler={(resp) => api_function(render, (dt) => {
                    this.setState({
                        modal: OkDialog("Errore caricamento dati", "Non è stato possibile scaricare i dati.", this.resetModal, false)
                    })
                })}
                error_handler={this.errorReloadFams} />
        });
    }

    handleShow = (e, idfam) => {
        e.preventDefault();
        this.setState({
            modal: <FamShower
                handleClose={this.resetModal}
                IDFAM={idfam} />
        });
    }

    handleCreate = (e) => {
        e.preventDefault();
        this.setState({
            modal: <FamCreate
                handleClose={this.resetModal}
                success_handler={(dt) => {
                    this.setState({
                        modal: <FamShower
                            handleClose={() => {
                                this.resetModal();
                                this.componentDidMount();
                            }}
                            ID={dt.res.query.ID} />
                    });
                }}
                error_handler={(dt) => {
                    LoadApp.addMessage(erroricon, "Famiglie", "Non è stato possibile aggiungere la famiglia:\n" + dt.res.msg);
                }} />
        });
    }

    handleDelete = (e, idfam) => {
        e.preventDefault();
        this.setState({
            modal: ConfirmDialog("Eliminare Famiglia", "Vuoi davvero eliminare questa famiglia?", () => {
                deleteFamily(idfam, () => {
                    this.componentDidMount();
                }, () => {
                    this.setState({
                        modal: OkDialog("Errore eliminazione", "Non è stato possibile eliminare la famiglia.", this.resetModal)
                    });
                });
            }, () => {

            }, this.resetModal)
        });
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
        if (datax.DataHandler.dataSettings.light) {
            this.setState({
                modal: OkDialog("Errore ricezione dati", "Non è stato possibile leggere la lista famiglie.", this.resetModal)
            });
        } else {
            LoadApp.addMessage(erroricon, "Aggiornamento dati", "Non è stato possibile leggere la lista famiglie.")
        }
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
            <Container>
                <Nav bg="dark" className="mt-2"
                    activeKey={this.state.key} onSelect={(selectedKey) => this.setState({ key: selectedKey })}>
                    <Nav.Item>
                        <Nav.Link href="#/" onClick={this.props.handleHome}><img src={backicon} style={{ width: 16, height: 16 }} alt="Indietro" /> Home</Nav.Link>
                    </Nav.Item>
                    <Nav.Item>
                        <Nav.Link href="#/fam/add" onClick={this.handleCreate}>Aggiungi Famiglia</Nav.Link>
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
