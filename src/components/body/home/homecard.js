import React, { Component } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";

class HomeCard extends Component {

    render() {
        return <>
            <Col sm="auto" p="1">
                <Card style={{ width: '18rem' }}>
                    <Card.Body>
                        <a href={"#" + this.props.link} className="btn btn-primary"><img alt="Icona" src={this.props.icon} /> {this.props.btntitle}</a>
                        <Card.Text className="mt-1">{this.props.text}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>
        </>;
    }
}

export default HomeCard;