import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import { _AddIcon, _BackIcon, _ErrorIcon, _RefreshIcon } from "../../../contents/images";
import LoadApp from "../../loadApp";
import { AutoUtentiTable } from "../../../contents/functions/TableGenerators";
import { getUtentiExtra } from "../../../contents/api/capi-extra";
import { fun_UserEditorModal } from "./AdminModals";

export class AdminNavbar extends Component {

    state = {
        body: <></>,
        key: ''
    };

    refresh = () => getUtentiExtra((dt) => {
        this.setState({
            body: AutoUtentiTable(dt.query)
        });
    }, (dt) => {
        LoadApp.addMessage(_ErrorIcon, "Amministrazione", "Impossibile caricare gli utenti");
    });

    componentDidMount() {
        this.refresh();
    }

    addUtente = () => {
        fun_UserEditorModal(() => { }, this.refresh, () => { });
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
                            <Nav.Link href="#/bor/add" onClick={this.addUtente}><span><img src={_AddIcon} alt="Aggiungi utente" /> Invita Utente</span></Nav.Link>
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