import React, { Component } from "react";
import { Modal } from "react-bootstrap";

export class ModalTemplate extends Component {

    state = {
        modal_data: {
            ID: -1,
            title: <></>,
            body: (params) => <></>,
            body_params: {},
            footer: (params) => <></>,
            footer_params: {},
            icon: {
                enabled: false,
                icon_src: '',
                alt: ''
            }
        },
        size: 'md',
        show: false,
        on_exit_action: () => { },//Chiamata sempre
        on_close_action: () => { }//Definita dai parametri
        //on_show_action: (showing) => { }
    }

    componentDidMount() {
        this.setState({
            modal_data: {
                ID: this.props.ID ? this.props.ID : -1,
                title: this.props.title ? this.props.title : <></>,
                body: this.props.body ? this.props.body : () => <></>,
                body_params: this.props.body_params ? this.props.body_params : {},
                footer: this.props.footer ? this.props.footer : () => <></>,
                footer_params: this.props.footer_params ? this.props.footer_params : {},
                icon: {
                    enabled: this.props.icon_src != null,
                    icon_src: this.props.icon_src,
                    alt: this.props.alt
                }
            },
            size: this.props.size ? this.props.size : 'md',
            show: this.props.show ? this.props.show : false,
            on_close_action: this.props.on_close_action ? this.props.on_close_action : () => { },
            on_exit_action: this.props.on_exit ?
                () => {
                    this.props.on_exit();
                    this.state.on_close_action();
                } :
                () => { this.state.on_close_action() }
        });
    }

    componentDidUpdate(prevprops) {
        if (prevprops.ID !== this.props.ID) {
            this.setState({
                show: this.props.show,
                size: this.props.size,
                modal_data: this.props.body ? {
                    ID: this.props.ID,
                    title: this.props.title,
                    body: this.props.body,
                    body_params: this.props.body_params,
                    footer: this.props.footer,
                    footer_params: this.props.footer_params,
                    icon: {
                        enabled: this.props.icon_src != null,
                        icon_src: this.props.icon_src,
                        alt: this.props.alt
                    },
                    on_close_action: this.props.on_close_action ? this.props.on_close_action : () => { }
                } : this.emptyModal()
            });
        }
    }

    emptyModal = () => {
        return {
            title: <></>,
            body: (params) => <></>,
            body_params: {},
            footer: (params) => <></>,
            footer_params: {},
            icon: {
                enabled: false,
                icon_src: '',
                alt: ''
            }
        };
    }

    /**
     * Imposta un'icona per il modale. Per togliere l'icona impostarla a null.
     * 
     * @param {String} icon Icona
     * @param {String} alt Testo alternativo
     */
    setIcon(icon, alt) {
        /*this.state.icon.src = icon;
        this.state.icon.alt = alt;
        this.state.icon.enabled = icon != null;*/
        this.setState({ icon: { enabled: icon != null, icon_src: icon, alt: alt } });
    }

    setContent(title, body, footer) {
        /*this.state.title = title;
        this.state.body = body;
        this.state.footer = footer;*/
        this.setState({ title: title, body: body, footer: footer });
    }


    /**
     * Mostra a nascondi il modale. Chiamando questo metodo viene chiamata
     * la funzione on_show_action che permette al padre del modale di rimanere
     * in ascolto.
     * 
     * @param {Boolean} _show 
     */
    /*show(_show) {
        this.setState({ show: _show }, () => { this.state.on_show_action(_show) });
    }*/

    /**
     * Imposta l'azione di chiusura, in questo modo viene chiamata anche la close_action
     * che avverte il padre (se sottoiscritto) di questo modale.
     * @param {Function} on_exit 
     */
    setHideAction(on_exit) {
        if (on_exit) {
            /*this.state.exit_action = () => {
                on_exit();
                this.state.close_action();
            };*/
            this.setState({
                exit_action: () => {
                    on_exit();
                    this.state.on_close_action();
                }
            });
        } else {
            //this.state.exit_action = () => { this.state.close_action() };
            this.setState({ exit_action: () => { this.state.on_close_action() } });
        }
    }

    /**
     * Imposta l'azione di chiusura che viene chiamata quando il modale viene
     * chiuso.
     * 
     * @param {Function} on_close_action 
     */
    setCloseAction(on_close_action) {
        if (on_close_action) {
            //this.state.close_action = close_action;
            this.setState({
                on_close_action: on_close_action
            });
        }
    }

    /**
     * Imposta l'azione da eseguire quando viene mostrato/nascosto il modale,
     * viene passato come parametro alla funzione il valore vero/falso quando si
     * mostra/nasconde, il modale.
     * 
     * @param {Function} on_show_action 
     */
    setOnShowAction(on_show_action) {
        if (on_show_action) {
            this.setState({
                on_show_action: on_show_action
            });
        }
    }

    render() {
        return <>
            <Modal show={this.state.show} onHide={this.state.on_exit_action} centered size={this.state.size}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.state.modal_data.icon.enabled ? <><img src={this.state.modal_data.icon.icon_src} alt={this.state.modal_data.icon.alt} style={{
                        width: 20,
                        height: 20,
                        justifyItems: "center"
                    }} />{'  '}</> : <></>}{this.state.modal_data.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {this.state.modal_data.body(this.state.on_exit_action, this.state.modal_data.body_params)}
                </Modal.Body>
                {this.state.modal_data.footer ?
                    <Modal.Footer>
                        {this.state.modal_data.footer(this.state.on_exit_action, this.state.modal_data.footer_params)}
                    </Modal.Footer>
                    : <></>
                }
            </Modal>
        </>;
    }

}

/**
 * Genera un modale controllabile dal padre.
 * 
 * @param {Number} ID Numero del modale
 * @param {String} title Titolo del modale
 * @param {String|null} icon_src Percorso dell'icona
 * @param {String} alt Testo alternativo dell'icona
 * @param {Function} body_function Funzione che prende parametri e genera l'elemento del corpo
 * @param {Function|null} footer_function Funzione che prende parametri e genera l'elemento del piede
 * @param {Function} on_close_action Funzione eseguita all'uscita dal modale.
 * @returns Oggetto che contiene gli elementi da passare al ModalTemplate
 */
export default function generateModal(ID, title, icon_src, alt, body_function, footer_function, on_close_action, size = 'md') {
    return {
        ID: ID,
        title: title ? title : <></>,
        body: body_function ? body_function : (params) => { },
        body_params: {},
        footer: footer_function ? footer_function : (params) => { },
        footer_params: {},
        on_close_action: on_close_action ? on_close_action : () => { },
        icon: {
            enabled: icon_src != null,
            icon_src: icon_src,
            alt: alt
        },
        size: size
    }
}