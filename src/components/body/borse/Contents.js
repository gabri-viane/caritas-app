import React, { Component } from "react";
import Container from "react-bootstrap/Container";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Collapse from "react-bootstrap/Collapse";
import ListGroup from "react-bootstrap/ListGroup";
import { getAvailablesMagazzino } from "../../../contents/api/capi-magazzino";
import { datax } from "../../../contents/data";

class ElementoProdotto extends Component {

    state = {
        IDProdotti: -1,
        Nome: 'Unknown',
        Totale: 1,
        selected: false
    };

    constructor(props) {
        super(props);
        this.state.Nome = props.Nome;
        this.state.IDProdotti = props.IDProdotti;
        this.state.Totale = props.Totale || 1;
        this.state.selected = props.Seleced || false;
    }

    setSelected = (value) => {
        if (this.props.onSelectionEvent) {
            this.props.onSelectionEvent(this.state.IDProdotti, this.state.Nome, value);
        }
        this.setState({ selected: value, Totale: 1 });
    }

    onSelectionChange = (e) => {
        this.setSelected(!this.state.selected);
    };

    onInputChange = (e) => {
        const new_val = e.target.value;
        if (new_val < 1 && new_val !== '') {
            this.setSelected(false);
        } else {
            if (this.props.onValueEvent) {
                this.props.onValueEvent(this.state.IDProdotti, new_val);
            }
            this.setState({ Totale: e.target.value });
        }
    }

    render() {
        return <>
            <Card style={{ maxWidth: "400px", boxShadow: "10px 10px 5px lightblue" }}>
                <Card.Header>
                    <Form.Group className="mb-2" controlId={"form_sel_prod_" + this.state.IDProdotti}>
                        <Form.Check checked={this.state.selected} onChange={this.onSelectionChange} label={this.state.Nome} />
                    </Form.Group>
                </Card.Header>
                {this.state.selected ?
                    <Card.Body>
                        <Form.Group controlId={"form_qnt_prod_" + this.state.IDProdotti}>
                            <FloatingLabel label="Quantità">
                                <Form.Control type="number" value={this.state.Totale} onChange={this.onInputChange} />
                            </FloatingLabel>
                        </Form.Group>
                    </Card.Body>
                    : <></>}
            </Card>
        </>
    }
}


export class ContenitoreElementi extends Component {

    state = {
        create: true,
        show_res: false,
        query_prods: [],
        selection: []
    };

    componentDidMount() {
        getAvailablesMagazzino((dt) => { this.setState({ query_prods: dt.query }); }, (dt) => { console.log("Error"); console.log(dt) });
    }

    transformToColumn(data) {
        const cols = datax.DataHandler.dataSettings.cols;
        const cls = [];
        for (let i = 0; i < cols; i++) {
            const rows = Math.ceil(data.length / cols);
            const r = data.slice(i * rows, i * rows + rows);
            cls[i] = <>
                {
                    r.map((item, index) => {
                        return <Container className="mt-2" key={index}>
                            <ElementoProdotto Nome={item.Nome} IDProdotti={item.IDProdotto} onSelectionEvent={this.onSelected} onValueEvent={this.onValueChange} />
                        </Container>
                    })
                }</>
        }
        return <Row>{cls.map((val, index) => {
            return <Col xs key={index}>{val}</Col>;
        })}</Row>
    }

    onSelected = (id, name, value) => {
        if (value) {
            const tmp = this.state.selection;
            tmp[id] = { IDProdotti: id, Nome: name, Totale: 1 };
            this.setState({ selection: tmp });
        } else {
            const tmp = this.state.selection;
            delete tmp[id];
            this.setState({ selection: tmp });
        }
    }

    onValueChange = (id, value) => {
        const tmp = this.state.selection;
        tmp[id].Totale = value;
        this.setState({ selection: tmp });
    }

    render() {
        return <>
            <Container fluid>
                <Row>
                    <Container md="auto">
                        <Row md="auto">
                            <Col md="auto">
                                <Button onClick={() => { this.setState({ show_res: !this.state.show_res }) }}>
                                    {this.state.show_res ? 'Nascondi risultato' : 'Mostra risultato'}
                                </Button>
                            </Col>
                            <Col md="auto">
                                {this.state.create ?
                                    <Container>
                                        <Button>Procedi</Button>
                                    </Container>
                                    :
                                    <Container>
                                    </Container>
                                }
                            </Col>
                        </Row>
                    </Container>
                </Row>
                <Collapse in={this.state.show_res}>
                    <Row className="mt-2">
                        <Col style={{ maxWidth: '30vw' }}>
                            <ListGroup>
                                {
                                    Object.keys(this.state.selection).map((val, index) => {
                                        return <ListGroup.Item key={index}>
                                            <span className="primary">{this.state.selection[val].Totale}
                                                {'   '}
                                            </span><span>{this.state.selection[val].Nome}</span>
                                        </ListGroup.Item>
                                    })
                                }
                            </ListGroup>
                        </Col>
                    </Row>
                </Collapse>
                <Row>
                    {this.transformToColumn(this.state.query_prods)}
                </Row>
            </Container >
        </>
    }

}