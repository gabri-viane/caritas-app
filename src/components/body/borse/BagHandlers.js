import React, { Component } from "react";
import { Button, Col, Collapse, Container, Row} from "react-bootstrap";
import add from '../../../resources/images/plus.png';
import remove from '../../../resources/images/trash.png';

export class BagEditor extends Component {

    state = {
        create: true,
        edit: false,
        show_bar: true
    };

    render() {
        return <>
            <Container fluid className="mt-2">
                <Container>
                    <Button onClick={() => this.setState({ show_bar: !this.state.show_bar })} className="secondary">
                        Strumenti
                    </Button>
                    <hr />
                </Container>
                <Row>
                    <Collapse in={this.state.show_bar}>
                        <Col sm style={{ maxWidth: '20%', borderRightColor: 'black' }}>
                            <Container fluid>
                                <Row>
                                    <Col className="p-2">
                                        <p> Prodotto
                                            <img width='12px' height='12px' src={add} alt="Aggiungi" />
                                            <img width='12px' height='12px' src={remove} alt="Rimuovi" />
                                        </p>
                                    </Col>
                                </Row>
                            </Container>
                        </Col>
                    </Collapse>
                    <Col>
                        Contenuto pagina
                    </Col>
                </Row>
            </Container>
        </>;
    }

}