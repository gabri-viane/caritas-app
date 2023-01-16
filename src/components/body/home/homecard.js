import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/esm/Button";

class HomeCard extends Component {

    render() {
        return <>
            <Col sm="auto" className="m-1">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <Button href={"#" + this.props.link} className="btn btn-primary" onClick={this.props.action}><img alt="Icona" src={this.props.icon} /> {this.props.btntitle}</Button>
                        <Card.Text className="mt-1">{this.props.text}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>;
    }
}

export default HomeCard;