import React, { Component } from "react";
import HomeCard from "./home/homecard";
import { families_data, bags_data } from "./home/homecontent";

import Row from "react-bootstrap/Row";
import Card from "react-bootstrap/Card";
import Container from "react-bootstrap/esm/Container";


class Home extends Component {
    render() {
        return <>
            <Container className="p-3" md="auto">
                <Container md="auto">
                    <Card className="mt-2 p-1" md="auto">
                        <Card.Title className="m-1" id="famiglie">Famiglie</Card.Title>
                        <Row >
                            {families_data.map(item => <HomeCard link={"fam/" + item.link} key={item.id} btntitle={item.btn} icon={item.icon} text={item.text} action={item.action} />)}
                        </Row>
                    </Card>
                </Container>
                <Container md="auto" mx="auto" my="auto">
                    <Card className="mt-2 p-1">
                        <Card.Title className="mt-1" id="borse">Borse</Card.Title>
                        <Row>
                            {bags_data.map(item => <HomeCard link={"borse/" + item.link} key={item.id} btntitle={item.btn} icon={item.icon} text={item.text} action={item.action} />)}
                        </Row>
                    </Card>
                </Container>
            </Container>
        </>;
    }
}
export default Home;