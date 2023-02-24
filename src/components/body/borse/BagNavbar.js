import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { datax } from "../../../contents/data";
import { fun_BorEditorModal, fun_BorElementsEditorModal } from "./BagModals";
import { _AddIcon, _BackIcon, _ErrorIcon, _RefreshIcon, _SuccessIcon, _WarningIcon } from "../../../contents/images";
import LoadApp from "../../loadApp";
import { deleteBorsa, getAllBorse } from "../../../contents/api/capi-borse";
import { AutoBorseTable } from "../../../contents/functions/TableGenerators";
import { ConfirmDialog } from "../../../contents/functions/DialogGenerators";

export class BorseNavbar extends Component {

    state = {
        body: <></>,
        key: ''
    };

    handleShow = (e, id) => {
        e.preventDefault();
        fun_BorEditorModal(() => { }, false, id, () => { }, () => { });
    }

    handleEdit = (e, id) => {
        e.preventDefault();
        fun_BorEditorModal(() => {
            this.refresh();
        }, true, id, () => {
            if (!datax.DataHandler.dataSettings.light) {
                LoadApp.addMessage(_SuccessIcon, "Borse", "Borsa modificata con successo");
            }
        }, (dt) => {
            console.log(dt);
            if (!datax.DataHandler.dataSettings.light) {
                LoadApp.addMessage(_ErrorIcon, "Borse", "Impossibile modificare la borsa");
            }
        });
    }

    handleElements = (e, borsa) => {
        e.preventDefault();
        fun_BorElementsEditorModal(this.refresh,true,borsa.ID,this.refresh,()=>{
            LoadApp.addMessage(_ErrorIcon,"Elementi Borse","Impossibile visualizzare/modificare gli elementi");
        });
    }

    handleDelete = (e,id)=>{
        e.preventDefault();
        LoadApp.addModal(ConfirmDialog("Eliminazione Borsa","Eliminare la borsa definitivamente?",
            ()=>{
                deleteBorsa(id,(dt)=>{
                    console.log(dt);
                    LoadApp.addMessage(_SuccessIcon,"Borse","Borsa eliminata correttamente");
                },(dt)=>{
                    console.log(dt);
                    LoadApp.addMessage(_WarningIcon,"Borse","Non è stato possibile eliminare la borsa")
                })
            },()=>{}
        ))
    }

    refresh = () => getAllBorse((dt) => {
        this.setState({
            body: AutoBorseTable(
                this.handleShow, this.handleEdit, this.handleDelete, this.handleElements, dt.query)
        });
    }, () => {
        if (!datax.DataHandler.dataSettings.light) {
            LoadApp.addMessage(_ErrorIcon, "Borse", "Impossibile caricare le borse");
        }
    });

    componentDidMount() {
        this.refresh();
    }

    addBorsa = () => {
        fun_BorEditorModal(() => { }, true, null, () => { }, () => { });
    }

    render() {
        return <>
            <Container fluid>
                <Nav bg="dark" className="mt-2"
                    activeKey={this.state.key} onSelect={(selectedKey) => this.setState({ key: selectedKey })}>
                    <Nav.Item>
                        <Nav.Link href="#/" onClick={this.props.handleHome} ><img src={_BackIcon} style={{ width: 16, height: 16 }} alt="Indietro" /> Home</Nav.Link>
                    </Nav.Item>
                    <Nav>
                        <Nav.Item>
                            <Nav.Link href="#/bor/add" onClick={this.addBorsa}><span><img src={_AddIcon} alt="Aggiungi borsa" /> Crea Borsa</span></Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav.Item className="ml-auto text-center">
                        <Nav.Link href="#/" onClick={this.refresh}><span><img src={_RefreshIcon} alt="Aggiorna" /> Aggiorna</span></Nav.Link>
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