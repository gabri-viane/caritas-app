import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Container from "react-bootstrap/Container";
import Form from "react-bootstrap/Form";
import DataExchange from "../DataExchange";
import { _ErrorIcon, _DisconnectIcon, _EditIcon, _SuccessIcon, _WarningIcon, _ShowIcon } from "../images";
import generateModal from './ModalGenerators';

/**
 * Generea un dialogo modale con opzioni Sì e No.
 * 
 * @param {String} title Titolo del dialogo di conferma
 * @param {String} text Testo del dialogo
 * @param {Function} yes_handler Azione alla pressione dell'opzione Sì
 * @param {Function} no_handler Azione alla pressione dell'opzione No
 * @param {Function} on_exit Funzione chiamata sempre all'uscita: sia per l'opzione Sì, che per No, che quando si esce senza premere 
 * @returns {Object} Ritorna un oggetto per creare un ModalTemplate.
 */
export function ConfirmDialog(title, text, yes_handler, no_handler = () => { }, on_exit = () => { }) {

    const noEvent = (e) => {
        e.preventDefault();
        no_handler();
        on_exit();
    };

    const yesEvent = (e) => {
        e.preventDefault();
        yes_handler();
        on_exit();
    }

    return generateModal(101, title, _WarningIcon, "Attenzione",
        () => {
            return <>
                <span className="lead warp">{text}</span>
            </>
        },
        (modal_close_action) => {
            return <>
                <Button variant="secondary" onClick={(e) => { noEvent(e); modal_close_action(); }}>
                    No
                </Button>
                <Button variant="primary" onClick={(e) => { yesEvent(e); modal_close_action(); }}>
                    Sì
                </Button>
            </>
        },
        noEvent);
}

/**
 * Genera un dialogo di successo o errore con un solo pulsante OK disponibile.
 * 
 * @param {*} title Testo del titolo.
 * @param {*} text Testo del messaggio.
 * @param {*} on_exit Funzione chiamata alla pressione del tasto OK o all'uscita del modale.
 * @param {*} success Se true indica operazione completata con successo, altrimenti errore.
 * @returns {Object} Ritorna un oggetto per costruire un ModalTemplate.
 */
export function OkDialog(title, text, on_exit, success = false, warning = false) {
    return generateModal(102, title,
        success ? _SuccessIcon : warning ? _WarningIcon : _ErrorIcon,
        success ? "Successo" : warning ? "Attenzione" : "Errore",
        () => {
            return <><span className="lead warp">{text}</span></>
        },
        (modal_close_action) => {
            return <>
                <Button variant="secondary" onClick={(e) => { on_exit(e); modal_close_action(); }}>
                    Ok
                </Button>
            </>
        }, on_exit);
}

/**
 * Crea un container che ha una descrizione e un input per valori interi numerici.
 */
class InputInteger extends Component {

    state = {
        value: 0,
        text: '',
        dtx: null
    };

    /**
     * Costruisce il componente per input di numeri interi.
     * 
     * @param {Object} props deve contenere una chiave "defaultValue"  e una "text".
     */
    constructor(props) {
        super(props);
        this.state.value = props.defaultValue;
        this.state.text = props.text;
        this.state.dtx = props.dtx;
    }

    setValue(val) {
        this.setState({ value: val });
        this.state.dtx.setData({ value: val });
    }

    getValue() {
        return this.setState.value;
    }

    render() {
        return <>
            <Container fluid>
                <span className="lead warp">{this.state.text}</span>
                <Form.Control as="input" type="number" defaultValue={this.state.value || 0} className="mt-2" onChange={(e) => this.setValue(e.target.value)} />
            </Container>
        </>
    }

}

/**
 * Genera un dialogo che permette l'inserimento di un valore intero in input. Il valore viene passato
 * al callback del tasto sì, altrimenti viene scartato.
 * 
 * @param {String} title Titolo del modale
 * @param {String} text Testo del modale (descrizione dell'input)
 * @param {Function} yes_handler Callback dell'azione Sì (passa come parametro il valore intero dell'input)
 * @param {Function} no_handler Callback dell'azione No
 * @param {Function} on_exit Callback all'uscita che viene chiamato indipendentemente dall'opzione scelta.
 * @param {Number} default_value Valore di default dell'input
 * @returns {ModalTemplate} Ritorna una Lambda ModalTemplate. Per essere visualizzato bisogna chiamare il
 * metodo show passando true come valore.
 */
export function InputIntegerDialog(title, text, yes_handler, no_handler, on_exit, default_value) {

    const dtx = new DataExchange({ value: default_value });

    /*const [value, setValue] = useState(default_value);*/

    const noEvent = (e) => {
        if (e) {
            e.preventDefault();
        }
        no_handler();
        on_exit();
    };

    const yesEvent = (e) => {
        e.preventDefault();
        yes_handler(dtx.getData().value);
        on_exit();
    }

    return generateModal(103, title, _EditIcon, "Editing",
        () => {
            return <>
                <InputInteger text={text} defaultValue={default_value} dtx={dtx} />
            </>
        },
        (modal_close_action) => {
            return <>
                <Button variant="secondary" onClick={(e) => { modal_close_action(); noEvent(e); }}>
                    No
                </Button>
                <Button variant="primary" onClick={(e) => { modal_close_action(); yesEvent(e); }}>
                    Sì
                </Button>
            </>;
        }, noEvent);


    /*
        return <>
            <Modal show={true} onHide={noEvent} centered>
                <Modal.Header closeButton>
                    <Modal.Title><img src={_EditIcon} alt="Editing" /> {title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
    
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={noEvent}>
                        No
                    </Button>
                    <Button variant="primary" onClick={yesEvent}>
                        Sì
                    </Button>
                </Modal.Footer>
            </Modal>
        </>*/
}

/**
 * Genera un dialogo che permette di scegliere da una lista. Il valore dell'ID viene passato
 * al callback del tasto sì, altrimenti viene scartato.
 * 
 * @param {String} title Titolo del modale
 * @param {String} text Testo del modale (descrizione dell'input)
 * @param {Function} yes_handler Callback dell'azione Sì (passa come parametro il valore intero dell'input)
 * @param {Function} no_handler Callback dell'azione No
 * @param {Function} on_exit Callback all'uscita che viene chiamato indipendentemente dall'opzione scelta.
 * @param {Array} choices Array di chiave e valore
 * @param {String} LABEL_TEXT Nome della colonna nelle scelte per il testo da visualizzare
 * @param {String} ID_TEXT Nome della colonna nelle scelte per l'ID corrispondente al testo visualizzato
 * @returns {ModalTemplate} Ritorna una Lambda ModalTemplate. Per essere visualizzato bisogna chiamare il
 * metodo show passando true come valore.
 */
export function InputChoiceDialog(title, text, yes_handler, no_handler, on_exit, choices, LABEL_TEXT, ID_TEXT = 'ID') {

    if (choices.length < 1) {
        return OkDialog(title, "Non ci sono dati da mostrare", on_exit, false);
    } else {

        const dtx = new DataExchange({ value: choices[0][ID_TEXT] });
        const rows = LABEL_TEXT.split('#');

        const noEvent = (e) => {
            if (e) {
                e.preventDefault();
            }
            no_handler();
            on_exit();
        };

        const onChange = (e) => {
            dtx.setData(
                { value: e.target.value }
            );
        };

        const yesEvent = (e) => {
            e.preventDefault();
            yes_handler(dtx.getData().value);
            on_exit();
        };

        const transformRow = (row) => {
            if (rows.length > 1) {
                const arr = rows.map((row_label) => {
                    return row[row_label];
                });
                return arr.join(' - ');
            } else {
                return row[LABEL_TEXT];
            }
        }

        return generateModal(104, title, _ShowIcon, "Seleziona",
            () => {
                return <>
                    <FloatingLabel controlId={"floating" + title} label={title} className="mt-1">
                        <Form.Select aria-label={text} onChange={onChange}>
                            {choices.map((row, index) => {
                                return <option key={index} value={row[ID_TEXT]}>{transformRow(row)}</option>
                            })}
                        </Form.Select>
                    </FloatingLabel>
                </>
            },
            (modal_close_action) => {
                return <>
                    <Button variant="secondary" onClick={(e) => { modal_close_action(); noEvent(e); }}>
                        No
                    </Button>
                    <Button variant="primary" onClick={(e) => { modal_close_action(); yesEvent(e); }}>
                        Sì
                    </Button>
                </>;
            }, noEvent);
    }
}

/**
 * Genera un dialogo per la conferma della disconnessione.
 * 
 * @param {Function} yes_handler Callback dell'opzione Sì
 * @param {Function} no_handler Callback dell'opzione No
 * @returns {ModalTemplate} Ritorna una Lambda ModalTemplate. Per essere visualizzato bisogna chiamare il
 * metodo show passando true come valore.
 */
export function DisconnectDialog(yes_handler, no_handler) {

    const noEvent = (e) => {
        if (e) {
            e.preventDefault();
        }
        no_handler();
    };

    const yesEvent = (e) => {
        e.preventDefault();
        yes_handler();
    }

    return generateModal(105, "Disconnettersi?", _DisconnectIcon, "Disconnettiti",
        <>
            <span className="lead warp">Vuoi disconnetterti dal database? Dovrai eseguire nuovamente l'accesso.</span>
        </>,
        <>
            <Button variant="primary" onClick={yesEvent}>
                Sì
            </Button>
            <Button variant="secondary" onClick={noEvent}>
                No
            </Button>
        </>,
        noEvent)
}